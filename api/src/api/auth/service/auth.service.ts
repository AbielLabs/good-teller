import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { EmailVerification } from '../model/email-verication.model';
import {
  generateTOTPToken,
  createHash,
  validateTOTP,
  verifyHash,
} from 'src/utils';
import { Mail } from 'src/mail/service/mail.service';
import { LoginUserDto } from '../dto/login.dto';
import { CreateFirmDto } from 'src/api/firm/dto/create-firm.dto';
import { Firm } from 'src/api/firm/model/firm.model';
import { FirmService } from 'src/api/firm/service/firm.service';
import { UserService } from 'src/api/user/services/user.service';
import { TUserWithId } from 'src/api/user/types';
import { TFirmWithId } from 'src/api/firm/types';
import { User } from 'src/api/user/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmailVerification.name)
    private readonly emailVerificaitonModel: Model<EmailVerification>,
    @InjectModel(Firm.name) private readonly firmModel: Model<Firm>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly firmService: FirmService,
    private readonly userService: UserService,
    private readonly mail: Mail,
    private readonly jwtService: JwtService,
  ) {}

  async registerFirm({
    password,
    ...createUserDto
  }: CreateFirmDto): Promise<void> {
    //validate user
    const doesFirmExists: TUserWithId | TFirmWithId =
      await this.getAccountByEmail(createUserDto.email);
    if (doesFirmExists)
      throw new HttpException('email already in use!', HttpStatus.UNAUTHORIZED);

    //generate password hash
    const hashedPassword: string = createHash(password);

    //generate email token
    const { secret, token: otp } = generateTOTPToken();
    if (!secret && !otp) throw new NotFoundException();

    //create an unverified user
    const newFirm: Firm = await this.firmService.createFirm({
      password: hashedPassword,

      ...createUserDto,
    });
    if (!newFirm)
      throw new HttpException(
        'could not create firm!',
        HttpStatus.UNAUTHORIZED,
      );

    //store firm email, token and secret for verification
    const stored = await this.emailVerificaitonModel.create({
      email: newFirm.email,
      secret,
      token: otp,
    });
    if (!stored) throw new UnauthorizedException();

    // send registration code and registration link via email
    // await this.mail.sendVerificationMail(stored.email, otp, 'email-OTP');
  }

  async verifyEmailToken(token: number): Promise<void> {
    const { email, secret }: EmailVerification =
      await this.emailVerificaitonModel.findOne({
        token,
      });
    if (!email || !secret) throw new UnauthorizedException();

    //Verify token
    const validToken: boolean = validateTOTP({
      secret,
      token,
    });
    if (!validToken) {
      throw new UnauthorizedException('invalid otp!');
    }

    //validate Firm
    const { password, ...payload }: Firm =
      await this.firmModel.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true },
      );
    if (!password || !payload) throw new UnauthorizedException('invalid otp!');

    //delete email token
    const isDeleted = await this.emailVerificaitonModel.deleteOne({
      email,
    });
    if (!isDeleted) throw new UnauthorizedException();
  }

  async validateUser({ email, password }: LoginUserDto): Promise<string> {
    //validate user
    const account = await this.getAccountByEmail(email);
    if (!account) throw new NotFoundException('invalid email or password!');

    // match password and hash
    const isValid: boolean = verifyHash(password, account.password);
    if (!isValid) throw new NotFoundException('invalid email or password!');

    // generate and return jwt token
    return this.jwtService.signAsync({
      id: account._id,
    });
  }

  async recoverPassword(email: string): Promise<void> {
    const account = await this.getAccountByEmail(email);
    if (!account) throw new NotFoundException('user not found!');

    //create password recovery  otp token
    const { secret, token } = generateTOTPToken();

    //store otp in db
    const stored = await this.emailVerificaitonModel.create({
      email: account.email,
      token,
      secret,
    });
    if (!stored) throw new NotFoundException();

    //send email token via mail
    await this.mail.sendVerificationMail(email, stored.token, 'password-OTP');
  }

  async confirmPasswordRecovery(
    otp: number,
    newPassword: string,
  ): Promise<void> {
    const { secret, email }: EmailVerification =
      await this.emailVerificaitonModel.findOne({
        token: otp,
      });
    if (!secret || !email) throw new UnauthorizedException('invalid token!');

    //validate token
    const tokenIsValid: boolean = validateTOTP({
      secret,
      token: otp,
    });
    if (!tokenIsValid) throw new UnauthorizedException('invalid token!');

    // hash new passowrd
    const newPasswordHash: string = createHash(newPassword);

    //update password
    const user: User = await this.userModel.findOneAndUpdate(
      { email },
      { password: newPasswordHash },
      { new: true },
    );
    if (!user)
      throw new HttpException(
        'failed to update user password!',
        HttpStatus.BAD_REQUEST,
      );

    await this.emailVerificaitonModel.deleteOne({ email });
  }

  async isAccountSubscribed(id): Promise<boolean> {
    const account = await this.getAccountById(id);

    if (account.accountType === 'user') {
      const firm: Firm = await this.firmService.getFirmById(account._id);
      return firm.isSubscribed;
    }
    return account.isSubscribed;
  }

  private async getAccountByEmail(
    email: string,
  ): Promise<TUserWithId | TFirmWithId> {
    const user = (await this.userService.getUserByEmail(
      email,
    )) as unknown as TUserWithId;
    if (user) {
      return user;
    } else {
      const firm = (await this.firmService.getFirmByEmail(
        email,
      )) as unknown as TFirmWithId;
      return firm;
    }
  }

  public async getAccountById(id: string): Promise<TUserWithId | TFirmWithId> {
    console.log(id);
    const user = (await this.userService.getUserById(
      id,
    )) as unknown as TUserWithId;
    if (user) {
      return user;
    } else {
      const firm = (await this.firmService.getFirmById(
        id,
      )) as unknown as TFirmWithId;
      return firm;
    }
  }
}
