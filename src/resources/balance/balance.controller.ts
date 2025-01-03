import {BalanceService} from './balance.service';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Req,
  All,
  BadRequestException,
} from '@nestjs/common';
import {TokenDto} from '../../dto/token.dto';
import {Request} from 'express';
import {ethers} from 'ethers';

@Controller('tokens')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @All('balance')
  @HttpCode(HttpStatus.OK)
  async getBalance(
    @Req() request: Request,
    @Body('tokens') tokens: TokenDto[],
    @Body('walletAddress') walletAddress: string,
  ) {
    if (request.method !== 'POST') {
      throw new BadRequestException('Allowed only POST request');
    }

    if (!tokens || tokens.length === 0) {
      throw new BadRequestException('Tokens must be provided');
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      throw new BadRequestException('Invalid wallet address');
    }

    return this.balanceService.getBalance(tokens, walletAddress);
  }
}
