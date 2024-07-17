import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { CreatePeerToPeerTransferDto } from '../dtos/create-peer-to-peer-transfer';
import { Account } from '../models/account.entity';
import { CreateTransactionDto } from '../dtos/create-transaction';
import { ETransactionType } from '../enums/wallets.enum';
import { AccountTransaction } from '../models/account-transaction.entity';
import { AccountTransactionRepository } from '../repositories/account-transaction.repository';
import { AccountPeerToPeerRepository } from '../repositories/account-peer-to-peer.repository';
import { AccountPeerToPeer } from '../models/account-peer-to-peer.entity';
import { AccountCashIn } from '../models/account-cash-in.entity';
import { AccountCashInRepository } from '../repositories/account-cash-in.repository';

@Injectable()
export class AccountTransactionService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTransactionRepository: AccountTransactionRepository,
    private readonly accountPeerToPeerRepository: AccountPeerToPeerRepository,
    private readonly accountCashInRepository: AccountCashInRepository,
  ) {}

  private getAccountsToTransfer(from: string, to: string): [Account, Account] {
    const accountFrom = this.accountRepository.findByAccountNumber(from);

    if (!accountFrom) {
      throw new BadRequestException('Account from not found.');
    }

    const accountTo = this.accountRepository.findByAccountNumber(to);

    if (!accountTo) {
      throw new BadRequestException('Account to not found.');
    }

    return [accountFrom, accountTo];
  }

  async cashIn(accountNumber: string, amount: number): Promise<AccountCashIn> {
    const account = this.accountRepository.findByAccountNumber(accountNumber);

    if (!account) {
      throw new BadRequestException('Account not found.');
    }

    const transaction = this.generateTransaction({
      amount,
      account: account,
      transactionType: ETransactionType.CREDIT,
    });

    const cashIn = new AccountCashIn(amount);
    cashIn.accountTransaction = transaction;

    return this.accountCashInRepository.save(cashIn);
  }

  async peerToPeerTransfer(
    transferDto: CreatePeerToPeerTransferDto,
  ): Promise<AccountPeerToPeer> {
    const amount = Number(transferDto.amount);

    const [accountFrom, accountTo] = this.getAccountsToTransfer(
      transferDto.from,
      transferDto.to,
    );

    const transactionFrom = this.generateTransaction({
      amount,
      account: accountFrom,
      transactionType: ETransactionType.DEBIT,
    });

    const transactionTo = this.generateTransaction({
      amount,
      account: accountTo,
      transactionType: ETransactionType.CREDIT,
    });

    const peerToPeer = new AccountPeerToPeer(amount);
    peerToPeer.description = `Transfer to ${accountTo.accountNumber}.`;
    peerToPeer.transactionFrom = transactionFrom;
    peerToPeer.transactionTo = transactionTo;

    return this.accountPeerToPeerRepository.save(peerToPeer);
  }

  private generateTransaction(
    transactionDto: CreateTransactionDto,
  ): AccountTransaction {
    const { account, transactionType } = transactionDto;

    let amount = Number(transactionDto.amount);

    if (amount <= 0) {
      throw new BadRequestException('Amount should be more than zero.');
    }

    const transaction = new AccountTransaction(account);
    if (transactionType === ETransactionType.DEBIT) {
      if (account.balance < amount) {
        throw new ConflictException(`Insufficient balance: ${account.balance}`);
      }

      transaction.amount = amount * -1;
      transaction.isCredit = false;
    } else {
      transaction.amount = amount;
      transaction.isCredit = true;
    }

    account.balance += transaction.amount;
    return this.accountTransactionRepository.save(transaction);
  }
}
