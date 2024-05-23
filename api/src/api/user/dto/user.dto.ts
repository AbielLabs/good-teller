import {
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(8)
  password: string;

  @IsNumberString()
  @IsNotEmpty()
  @MinLength(11)
  phone: number;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsNumberString()
  @IsOptional()
  @MinLength(11)
  phone?: number;

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;
}
