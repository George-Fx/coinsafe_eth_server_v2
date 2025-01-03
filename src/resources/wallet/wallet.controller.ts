import {Request} from 'express';
import {WalletService} from './wallet.service';
import {
  Controller,
  All,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

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
}
