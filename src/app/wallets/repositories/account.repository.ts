import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.entity';

@Injectable()
export class AccountRepository {
  private mapperAccount: Map<string, Account>;

  constructor() {
    this.mapperAccount = new Map<string, Account>();
  }

  findAll(): Account[] {
    return Array.from(this.mapperAccount.values());
  }

  findByAccountNumber(accountNumber: string): Account {
    return this.mapperAccount.get(accountNumber);
  }

  save(account: Account): Account {
    this.mapperAccount.set(account.accountNumber, account);

    return account;
  }
}
