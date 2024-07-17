import { EAccountCategory, ECurrency } from '../enums/wallets.enum';

// @Entity()
export class Account {
  currency: ECurrency;
  category: EAccountCategory;

  accountNumber: string;
  balance: number;
  blocked: boolean;
  createdDate: Date;

  constructor(accountNumber: string) {
    this.accountNumber = accountNumber;

    this.balance = 0;
    this.currency = ECurrency.BRL;
    this.category = EAccountCategory.MAIN;
    this.createdDate = new Date();
    this.blocked = false;
  }
}
