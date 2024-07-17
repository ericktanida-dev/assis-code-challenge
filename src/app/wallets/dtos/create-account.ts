import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { ECurrency } from '../enums/wallets.enum';

export class CreateAccountDto {
  @IsNotEmpty({ message: 'Número da conta não informada.' })
  account_number: string;

  @IsEnum(ECurrency, { message: 'Moeda não disponível' })
  currency?: ECurrency = ECurrency.BRL;
}
