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

import { CreateUserDto } from 'src/api/user/dto/user.dto';
import { UserService } from 'src/api/user/services/user.service';
import { TUser } from '../types';
import { EmailVerification } from '../model/email-verication.model';
import {
  generateTOTPToken,
  createHash,
  validateTOTP,
  verifyHash,
} from 'src/utils';
import { Mail } from 'src/mail/mail.service';
import { User } from 'src/api/user/model/user.model';
import { LoginUserDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmailVerification.name)
    private readonly emailVerifiaciton: Model<EmailVerification>,
    @InjectModel(User.name) private readonly user: Model<User>,
    private readonly userService: UserService,
    private readonly mail: Mail,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser({
    email,
    password,
    ...rest
  }: CreateUserDto): Promise<any> {
    //validate user
    const doesUserExists: CreateUserDto =
      await this.userService.getUserByEmail(email);
    if (doesUserExists)
      throw new HttpException('email already in user!', HttpStatus.BAD_REQUEST);

    //generate password hash
    const hashedPassword: string = createHash(password);

    //generate email token
    const { secret, token } = generateTOTPToken();

    //create an unverified user
    const { email: userEmail }: TUser = await this.userService.createUser({
      email,
      password: hashedPassword,
      ...rest,
      isVerified: false,
    });
    if (!userEmail)
      throw new HttpException('could not create user!', HttpStatus.BAD_REQUEST);

    //store email, token and token secret for verification in db
    if (!secret && !token) throw new NotFoundException();
    const isEmailToVerifySaved = await this.emailVerifiaciton.create({
      email: userEmail,
      secret,
      token,
    });
    if (!isEmailToVerifySaved) throw new UnauthorizedException();

    // send registration code and registration link via email
    return await this.mail.sendVerificationMail(email, token, 'email-OTP');
  }

  async verifyEmailToken(token: number): Promise<string> {
    const { email, secret } = await this.emailVerifiaciton.findOne({
      token,
    });
    if (!email || !secret) {
      throw new UnauthorizedException();
    }

    //Verify token
    const validToken: boolean = validateTOTP({
      secret,
      token,
    });
    if (!validToken) {
      throw new UnauthorizedException('invalid otp!');
    }

    //validate user
    const { password, ...payload }: TUser = await this.user.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true },
    );
    if (!password || !payload) throw new UnauthorizedException('invalid otp!');

    //delete email token
    const isDeleted = await this.emailVerifiaciton.deleteOne({
      email,
    });
    if (!isDeleted) throw new UnauthorizedException();

    //generate jet token
    return this.jwtService.signAsync(payload);
  }

  async validateUser({
    email,
    password: providedPassword,
  }: LoginUserDto): Promise<string> {
    const { password, ...payload }: TUser =
      await this.userService.getUserByEmail(email);
    if (!password || !payload) throw new NotFoundException('access denied!');

    // match password and hash
    const passwordMatch: boolean = verifyHash(providedPassword, password);
    if (!passwordMatch) throw new NotFoundException('access denied!');

    // generate and return jwt token
    return this.jwtService.signAsync(payload);
  }

  async recoverPassword(email: string) {
    const { email: userEmail }: TUser =
      await this.userService.getUserByEmail(email);
    if (!userEmail) throw new NotFoundException('user not found!');

    //create password recovery  otp token
    const { secret, token } = generateTOTPToken();

    //store otp in db
    const { token: savedToken } = await this.emailVerifiaciton.create({
      email: userEmail,
      token,
      secret,
    });
    if (!savedToken) throw new NotFoundException();

    //send email token via mail
    return this.mail.sendVerificationMail(email, savedToken, 'password-OTP');
  }

  async confirmPasswordRecovery(otp: number, newPassword: string) {
    const { secret, email }: EmailVerification =
      await this.emailVerifiaciton.findOne({
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
    const user: TUser = await this.user.findOneAndUpdate(
      { email },
      { password: newPasswordHash },
      { new: true },
    );
    if (!user)
      throw new HttpException(
        'failed to update user password!',
        HttpStatus.BAD_REQUEST,
      );

    await this.emailVerifiaciton.deleteOne({ email });
  }
}
