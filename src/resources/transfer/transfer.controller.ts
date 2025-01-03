import {TransferService} from './transfer.service';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Body,
  Req,
  All,
  BadRequestException,
} from '@nestjs/common';
import {Request} from 'express';
import {ethers} from 'ethers';

@Controller('tokens')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @All('transfer')
  @HttpCode(HttpStatus.OK)
  async send(
    @Req() request: Request,
    @Body('from') from: string,
    @Body('to') to: string,
    @Body('amount') amount: number,
  ) {
    if (request.method !== 'POST') {
      throw new BadRequestException(
        'Only POST requests are allowed for this endpoint',
      );
    }

    if (!from || !ethers.isAddress(from)) {
      throw new BadRequestException('Invalid or missing "from" address');
    }

    if (!to || !ethers.isAddress(to)) {
      throw new BadRequestException('Invalid or missing "to" address');
    }

    if (amount === undefined || amount <= 0) {
      throw new BadRequestException('Invalid or missing "amount"');
    }

    return this.transferService.transfer(from, to, amount);
  }
}