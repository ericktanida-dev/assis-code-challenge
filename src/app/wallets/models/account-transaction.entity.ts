import { EAccountCategory, ECurrency } from '../enums/wallets.enum';
import { v4 as uuidv4 } from 'uuid';
import { Account } from './account.entity';

// @Entity()
export class AccountTransaction {
  id: string;
  currency: ECurrency;

  account: Account;

  amount: number;
  isCredit: boolean;

  momentBalance: number;
  createdDate: Date;

  constructor(account: Account) {
    this.id = uuidv4();

    this.account = account;
    this.currency = account.currency;
    this.momentBalance = account.balance;
    this.createdDate = new Date();
  }
}
