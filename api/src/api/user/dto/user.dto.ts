import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}

export class UserWithoutPassowrd {
  name: string;

  email: string;

  @Exclude()
  password: string;

  firm_id: string;

  role: 'firm' | 'user';

  accountType: 'user';

  isVerified: boolean;
}
