import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.entity';
import { AccountPeerToPeer } from '../models/account-peer-to-peer.entity';
import { AccountCashIn } from '../models/account-cash-in.entity';
import { AccountTransaction } from '../models/account-transaction.entity';

@Injectable()
export class AccountCashInRepository {
  private mapperCashIn: Map<string, AccountCashIn>;

  constructor() {
    this.mapperCashIn = new Map<string, AccountCashIn>();
  }

  findAll(): AccountCashIn[] {
    return Array.from(this.mapperCashIn.values());
  }

  save(cashIn: AccountCashIn): AccountCashIn {
    const cash = { ...cashIn };

    cash.accountTransaction = {
      id: cash.accountTransaction.id,
    } as AccountTransaction;

    this.mapperCashIn.set(cashIn.id, cash);

    return cashIn;
  }
}
