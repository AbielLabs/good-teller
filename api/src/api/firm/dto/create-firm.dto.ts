import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transaction } from 'src/api/transactions/model/transaction.model';
import { User } from 'src/api/user/model/user.model';

export class CreateFirmDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateFirmDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  isSubscribed?: boolean;
}

export class FirmWithoutPassowrd {
  accounType: 'admin';

  @Exclude()
  password: string;

  email: string;

  name: string;

  isVerifiend: true;

  isSubscribed: true;

  users?: User[];

  transactions?: Transaction[];
}
