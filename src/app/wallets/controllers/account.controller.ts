import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountTransactionService } from '../services/account-transaction.service';
import { CreateAccountDto } from '../dtos/create-account';
import { CreatePeerToPeerTransferDto } from '../dtos/create-peer-to-peer-transfer';
import { CreateDepositDto } from '../dtos/create-deposit';

@Controller({ path: 'accounts', version: '1' })
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountTransactionService: AccountTransactionService,
  ) {}

  @Post()
  async account(@Body() createDto: CreateAccountDto) {
    return this.accountService.create(createDto);
  }

  @Get(':accountNumber/balance')
  async accountBalance(@Param('accountNumber') accountNumber: string) {
    return this.accountService.getBalance(accountNumber);
  }

  @Post('/transfer')
  async accountTransfer(@Body() createDto: CreatePeerToPeerTransferDto) {
    return this.accountTransactionService.peerToPeerTransfer(createDto);
  }

  @Post(':accountNumber/deposit')
  async accountCashIn(
    @Param('accountNumber') accountNumber: string,
    @Body() deposit: CreateDepositDto,
  ) {
    return this.accountTransactionService.cashIn(accountNumber, deposit.amount);
  }
}
