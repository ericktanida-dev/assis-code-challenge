import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { ECurrency } from '../enums/wallets.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: '1235-2' })
  @IsNotEmpty({ message: 'Número da conta não informada.' })
  account_number: string;
}
