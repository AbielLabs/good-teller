import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { createHash, validate_Id, verifyHash } from 'src/utils';
import { User } from '../model/user.model';
import { configs } from 'src/configs';
import { TUser, TUserRole, TUserWithId } from '../types';
import { FirmService } from 'src/api/firm/service/firm.service';
import { TFirmWithId } from 'src/api/firm/types';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly firmService: FirmService,
  ) {}

  public async createUser(
    createUserDto: CreateUserDto,
    firm_id: string,
  ): Promise<TUser> {
    // validate user
    const doesUserExists = await this.getAccount(createUserDto.email);
    if (doesUserExists)
      throw new HttpException('email already in user!', HttpStatus.BAD_REQUEST);

    //generate a default password for user
    const password: string = createHash(configs.DEFAULT_USER_PASSWORD);

    //create and verify user
    const newUser = await this.userRepository.create<TUserWithId, TUser>({
      ...createUserDto,
      password,
      firm_id,
      role: 'user',
      accountType: 'user',
      isVerified: true,
    });
    if (!newUser)
      throw new HttpException('could not create user!', HttpStatus.BAD_REQUEST);
    console.log(newUser);

    //relate user to firm
    await this.firmService.AddUser(firm_id, newUser._id);

    return newUser;
  }

  public async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.queryAll<User>();

    if (!users)
      throw new HttpException('could not query users!', HttpStatus.BAD_REQUEST);

    return users;
  }

  public async getAllUsersByFirm(firm_id: string): Promise<User[]> {
    const firmUsers: User[] =
      await this.userRepository.queryManyByFirm<User>(firm_id);

    if (!firmUsers)
      throw new HttpException('could not query user!', HttpStatus.BAD_REQUEST);

    return firmUsers;
  }

  public async getUserById(id: string): Promise<User> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);

    return await this.userRepository.queryById<User>(id);
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.queryByEmail<User>(email);
  }

  public async updateUser(id: string, payload: UpdateUserDto): Promise<User> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);

    const updatedUser: User = await this.userRepository.update<
      User,
      UpdateUserDto
    >(id, payload);
    if (!updatedUser)
      throw new HttpException('could not update user!', HttpStatus.BAD_REQUEST);

    return updatedUser;
  }

  public async changeUserRole(id: string, role: TUserRole): Promise<void> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);

    const updatedUser: User = await this.userRepository.updateUserRole(
      id,
      role,
    );
    if (!updatedUser)
      throw new HttpException(
        'could not upgrade user !',
        HttpStatus.BAD_REQUEST,
      );
  }

  public async updateUserPassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);

    const user: User = await this.userRepository.queryById(id);
    if (!user) throw new HttpException('user not found!', HttpStatus.NOT_FOUND);

    const isValid: boolean = verifyHash(oldPassword, user.password);
    if (!isValid)
      throw new HttpException(
        'password does not match!',
        HttpStatus.UNAUTHORIZED,
      );

    const updatedUser: User = await this.userRepository.update<User, string>(
      id,
      newPassword,
    );
    if (!updatedUser)
      throw new HttpException('could not update user!', HttpStatus.BAD_REQUEST);
  }

  public async deleteUser(id: string): Promise<User> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);

    const deletedUser: User = await this.userRepository.deleteOne<User>(id);
    if (!deletedUser)
      throw new HttpException('could not delete user!', HttpStatus.BAD_REQUEST);

    return deletedUser;
  }

  private async getAccount(email: string): Promise<TUserWithId | TFirmWithId> {
    const user = (await this.getUserByEmail(email)) as unknown as TUserWithId;
    if (user) {
      return user;
    } else {
      const firm = (await this.firmService.getFirmByEmail(
        email,
      )) as unknown as TFirmWithId;
      return firm;
    }
  }
}
