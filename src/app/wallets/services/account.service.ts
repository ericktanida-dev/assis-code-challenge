import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from '../dtos/create-account';
import { AccountRepository } from '../repositories/account.repository';
import { Account } from '../models/account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  create(request: CreateAccountDto): Account {
    const accountExists = this.accountRepository.findByAccountNumber(
      request.account_number,
    );

    if (accountExists) {
      throw new ConflictException('Account already exists');
    }

    const account = new Account(request.account_number);

    return this.accountRepository.save(account);
  }

  findAll(): Account[] {
    return this.accountRepository.findAll();
  }

  getBalance(accountNumber: string): { balance: number } {
    const account = this.accountRepository.findByAccountNumber(accountNumber);

    return { balance: account?.balance ?? null };
  }
}
