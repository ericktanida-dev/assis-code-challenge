import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { WalletModule } from './app/wallets/wallets.module';

@Module({
  imports: [WalletModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
