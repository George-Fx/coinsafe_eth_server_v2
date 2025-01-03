import {Controller, All, HttpCode, HttpStatus, Req, Body} from '@nestjs/common';
import {WalletService} from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @All('create')
  @HttpCode(HttpStatus.CREATED)
  createWallet(@Req() request: Request, @Body('entropy') entropy: number) {
    return this.walletService.createWallet();
  }
}
