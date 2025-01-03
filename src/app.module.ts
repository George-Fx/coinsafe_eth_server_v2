import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {WalletModule} from './resources/wallet/wallet.module';
import {BalanceModule} from './resources/balance/balance.module';
import { EthereumModule } from './resources/ethereum/ethereum.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    WalletModule,
    BalanceModule,
    EthereumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
