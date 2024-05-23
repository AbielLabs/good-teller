import { CreateUserDto } from 'src/api/user/dto/user.dto';

export type TUser = CreateUserDto & {
  isVerified: boolean;
};

export type TUserWithoutPassword = Omit<TUser, 'password'>;
