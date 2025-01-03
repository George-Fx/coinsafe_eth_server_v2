import {Controller, All} from '@nestjs/common';
import {WalletService} from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @All('create')
  createWallet() {
    return this.walletService.createWallet();
  }
}
