import { Module } from '@nestjs/common';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { AccountRepository } from './repositories/account.repository';
import { AccountTransactionService } from './services/account-transaction.service';
import { AccountTransactionRepository } from './repositories/account-transaction.repository';
import { AccountPeerToPeerRepository } from './repositories/account-peer-to-peer.repository';
import { AccountCashInRepository } from './repositories/account-cash-in.repository';

@Module({
  imports: [],
  providers: [
    AccountService,
    AccountRepository,
    AccountTransactionService,
    AccountTransactionRepository,
    AccountPeerToPeerRepository,
    AccountCashInRepository,
  ],
  exports: [
    AccountService,
    AccountRepository,
    AccountTransactionService,
    AccountTransactionRepository,
    AccountPeerToPeerRepository,
    AccountCashInRepository,
  ],
  controllers: [AccountController],
})
export class WalletModule {}
