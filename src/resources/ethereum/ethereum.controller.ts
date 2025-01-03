import {EthereumService} from './ethereum.service';
import {
  Controller,
  Body,
  All,
  Req,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import {Request} from 'express';
import {ethers} from 'ethers';

@Controller('ethereum')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @All('balance')
  @HttpCode(HttpStatus.OK)
  async getBalance(
    @Req() request: Request,
    @Body('walletAddress') walletAddress: string,
  ) {
    if (request.method !== 'POST') {
      throw new BadRequestException(
        'Only POST requests are allowed for this endpoint',
      );
    }

    if (!walletAddress || !ethers.isAddress(walletAddress)) {
      throw new BadRequestException('Invalid wallet address');
    }

    return this.ethereumService.getBalance(walletAddress);
  }
}
