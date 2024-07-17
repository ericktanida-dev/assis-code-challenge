import { Injectable } from '@nestjs/common';

import { AccountTransaction } from '../models/account-transaction.entity';
import { Account } from '../models/account.entity';

@Injectable()
export class AccountTransactionRepository {
  private mapperTransaction: Map<string, AccountTransaction>;

  constructor() {
    this.mapperTransaction = new Map<string, AccountTransaction>();
  }

  findAll(): AccountTransaction[] {
    return Array.from(this.mapperTransaction.values());
  }

  save(transaction: AccountTransaction): AccountTransaction {
    const transactionSave = { ...transaction };

    transactionSave.account = {
      accountNumber: transactionSave.account.accountNumber,
    } as Account;
    this.mapperTransaction.set(transaction.id, transactionSave);

    return transaction;
  }
}
