import {
  Controller,
  All,
  HttpCode,
  HttpStatus,
  Req,
  Body,
  BadRequestException,
} from '@nestjs/common';
import {WalletService} from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @All('create')
  @HttpCode(HttpStatus.CREATED)
  createWallet(@Req() request: Request, @Body('entropy') entropy: number) {
    if (request.method !== 'POST') {
      throw new BadRequestException('Allowed only POST request');
    }

    if (!entropy) {
      throw new BadRequestException('Entropy must be provided');
    }

    return this.walletService.createWallet(entropy);
  }

  @All('recover')
  @HttpCode(HttpStatus.OK)
  recoverWallet(@Req() request: Request, @Body('mnemonic') mnemonic: string) {
    if (request.method !== 'POST') {
      throw new BadRequestException('Allowed only POST request');
    }

    if (!mnemonic) {
      throw new BadRequestException('Mnemonic must be provided');
    }

    return this.walletService.recoverWallet(mnemonic);
  }
}
