import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDebtDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firm_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: Date;
}
export class UpdateDebtDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  user_id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firm_id?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  amount?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date?: Date;
}
