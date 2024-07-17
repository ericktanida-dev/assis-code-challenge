import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { ECurrency, ETransactionType } from '../enums/wallets.enum';
import { Account } from '../models/account.entity';

export class CreateTransactionDto {
  amount: number;
  account: Account;
  transactionType: ETransactionType;
}
