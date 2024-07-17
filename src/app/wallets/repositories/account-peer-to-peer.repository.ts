import { Injectable } from '@nestjs/common';
import { Account } from '../models/account.entity';
import { AccountPeerToPeer } from '../models/account-peer-to-peer.entity';
import { AccountTransaction } from '../models/account-transaction.entity';

@Injectable()
export class AccountPeerToPeerRepository {
  private mapperPeerToPeer: Map<string, AccountPeerToPeer>;

  constructor() {
    this.mapperPeerToPeer = new Map<string, AccountPeerToPeer>();
  }

  findAll(): AccountPeerToPeer[] {
    return Array.from(this.mapperPeerToPeer.values());
  }

  save(peerToPeer: AccountPeerToPeer): AccountPeerToPeer {
    const p2p = { ...peerToPeer };

    p2p.transactionFrom = { id: p2p.transactionFrom.id } as AccountTransaction;
    p2p.transactionTo = { id: p2p.transactionTo.id } as AccountTransaction;
    this.mapperPeerToPeer.set(peerToPeer.id, p2p);

    return peerToPeer;
  }
}
