import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountTransactionService } from '../services/account-transaction.service';
import { CreateAccountDto } from '../dtos/create-account';
import { CreatePeerToPeerTransferDto } from '../dtos/create-peer-to-peer-transfer';
import { CreateDepositDto } from '../dtos/create-deposit';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller({ path: 'accounts', version: '1' })
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountTransactionService: AccountTransactionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova conta' })
  @ApiBody({
    description: 'Dados para criar uma nova conta',
    type: CreateAccountDto,
  })
  @ApiResponse({ status: 201, description: 'Conta criada com sucesso.' })
  async account(@Body() createDto: CreateAccountDto) {
    return this.accountService.create(createDto);
  }

  @Get(':accountNumber/balance')
  @ApiOperation({ summary: 'Buscar saldo de uma conta' })
  async accountBalance(@Param('accountNumber') accountNumber: string) {
    return this.accountService.getBalance(accountNumber);
  }

  @Post('/transfer')
  @ApiOperation({ summary: 'Realizar uma transferencia peer to peer' })
  @ApiBody({
    description: 'Dados para criar transferencia',
    type: CreatePeerToPeerTransferDto,
  })
  async accountTransfer(@Body() createDto: CreatePeerToPeerTransferDto) {
    return this.accountTransactionService.peerToPeerTransfer(createDto);
  }

  @Post(':accountNumber/deposit')
  @ApiOperation({ summary: 'Realizar um deposito' })
  @ApiBody({
    description: 'Dados para criar um deposito',
    type: CreateDepositDto,
  })
  async accountCashIn(
    @Param('accountNumber') accountNumber: string,
    @Body() deposit: CreateDepositDto,
  ) {
    return this.accountTransactionService.cashIn(accountNumber, deposit.amount);
  }
}
