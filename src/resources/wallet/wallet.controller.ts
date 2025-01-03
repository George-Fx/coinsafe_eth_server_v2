import {Request} from 'express';
import {WalletService} from './wallet.service';
import {
  Controller,
  All,
  Req,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @All('create')
  @HttpCode(HttpStatus.CREATED)
  createWallet(@Req() request: Request) {
    if (request.method !== 'GET') {
      throw new BadRequestException('Allowed only POST request');
    }

    return this.walletService.createWallet();
  }
}
