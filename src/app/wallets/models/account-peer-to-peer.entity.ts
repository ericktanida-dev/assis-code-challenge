import { EAccountCategory, ECurrency } from '../enums/wallets.enum';
import { v4 as uuidv4 } from 'uuid';
import { AccountTransaction } from './account-transaction.entity';

// @Entity()
export class AccountPeerToPeer {
  id: string;

  amount: number;
  description: string;

  transactionFrom: AccountTransaction;
  transactionTo: AccountTransaction;
  createdDate: Date;

  constructor(amount: number) {
    this.id = uuidv4();
    this.amount = amount;
  }
}
