import { Controller, Get } from '@nestjs/common';

import { AccountService } from './app/wallets/services/account.service';
import { AccountTransactionService } from './app/wallets/services/account-transaction.service';
import { AccountTransactionRepository } from './app/wallets/repositories/account-transaction.repository';
import { AccountCashInRepository } from './app/wallets/repositories/account-cash-in.repository';
import { AccountPeerToPeerRepository } from './app/wallets/repositories/account-peer-to-peer.repository';
import * as json2table from 'json-to-table';

@Controller()
export class AppController {
  constructor(
    private readonly accountService: AccountService,
    private readonly accountTransactionRepository: AccountTransactionRepository,
    private readonly accountCashInRepository: AccountCashInRepository,
    private readonly accountPeerToPeerRepository: AccountPeerToPeerRepository,
  ) {}

  @Get()
  getHello() {
    let appendHtml = ``;
    const accounts = this.accountService.findAll();
    const transactions = this.accountTransactionRepository.findAll();
    const cashIn = this.accountCashInRepository.findAll();
    const p2p = this.accountPeerToPeerRepository.findAll();

    appendHtml = this.append(appendHtml, `<h1>Fake table database</h1><br/>`);
    appendHtml = this.append(appendHtml, `<h2>accounts</h2>`);
    appendHtml = this.append(
      appendHtml,
      this.arrayToHtmlTable(json2table(accounts, ' - ')),
    );

    appendHtml = this.append(appendHtml, `<h2>account_peer_to_peer</h2>`);
    appendHtml = this.append(
      appendHtml,
      this.arrayToHtmlTable(json2table(p2p, ' - ')),
    );

    appendHtml = this.append(appendHtml, `<h2>account_transactions</h2>`);
    appendHtml = this.append(
      appendHtml,
      this.arrayToHtmlTable(json2table(transactions, ' - ')),
    );

    appendHtml = this.append(appendHtml, `<h2>account_cash_in</h2>`);
    appendHtml = this.append(
      appendHtml,
      this.arrayToHtmlTable(json2table(cashIn, ' - ')),
    );
    return appendHtml;
  }

  append(html: string, append: string): string {
    html = `${html} ${append}`;

    return html;
  }

  arrayToHtmlTable(data: any) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Input must be a non-empty array.');
    }

    // Início da tabela HTML
    let html = '<table border="1">';

    // Adicionar cabeçalho da tabela
    html += '<thead><tr>';
    for (let header of data[0]) {
      html += `<th>${header}</th>`;
    }
    html += '</tr></thead>';

    // Adicionar linhas de dados da tabela
    html += '<tbody>';
    for (let i = 1; i < data.length; i++) {
      html += '<tr>';
      for (let cell of data[i]) {
        html += `<td>${cell}</td>`;
      }
      html += '</tr>';
    }
    html += '</tbody>';

    // Fechar a tabela HTML
    html += '</table>';

    return html;
  }
}
