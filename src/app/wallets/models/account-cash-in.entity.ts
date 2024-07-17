import {
  EAccountCategory,
  ECurrency,
  EMethodCashIn,
  EProviderCashService,
} from '../enums/wallets.enum';
import { v4 as uuidv4 } from 'uuid';
import { AccountTransaction } from './account-transaction.entity';

// @Entity()
export class AccountCashIn {
  id: string;

  amount: number;
  codeTransaction: string;
  method: EMethodCashIn;
  provider: EProviderCashService;

  accountTransaction: AccountTransaction;
  createdDate: Date;

  constructor(amount: number) {
    this.id = uuidv4();
    this.codeTransaction = uuidv4(); // Provider code
    this.amount = amount;

    this.method = EMethodCashIn.PIX;
    this.provider = EProviderCashService.IUGU;
  }
}
