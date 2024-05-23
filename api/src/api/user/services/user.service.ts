import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { TUser } from 'src/api/auth/types';
import { validate_Id } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async createUser(createUserDto: TUser): Promise<TUser> {
    return await this.repository.create<TUser>(createUserDto);
  }

  public async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.repository.queryAll<CreateUserDto>();
  }

  public async getUserById(id: string): Promise<CreateUserDto> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);
    return await this.repository.queryById<CreateUserDto>(id);
  }
  public async getUserByEmail(email: string): Promise<TUser> {
    return await this.repository.queryByEmail<TUser>(email);
  }

  public async updateUser(
    id: string,
    payload: UpdateUserDto,
  ): Promise<CreateUserDto> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);
    return await this.repository.update<CreateUserDto, UpdateUserDto>(
      id,
      payload,
    );
  }

  public async deleteUser(id: string): Promise<CreateUserDto> {
    if (!validate_Id(id))
      throw new HttpException('invalid id!', HttpStatus.BAD_REQUEST);
    return this.repository.deleteOne<CreateUserDto>(id);
  }
}
