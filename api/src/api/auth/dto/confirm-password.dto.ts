import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ConfirmPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @MinLength(6)
  @MaxLength(6)
  otp: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
