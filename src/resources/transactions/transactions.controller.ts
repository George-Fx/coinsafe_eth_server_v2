import {
  Controller,
  All,
  Req,
  HttpCode,
  HttpStatus,
  Body,
  BadRequestException,
} from '@nestjs/common';
import {TransactionsService} from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @All('history')
  @HttpCode(HttpStatus.OK)
  async getHistory(
    @Req() request: Request,
    @Body('walletAddress') walletAddress: string,
  ) {
    if (request.method !== 'POST') {
      throw new BadRequestException(
        'Only POST requests are allowed for this endpoint',
      );
    }
    return this.transactionsService.getHistory(walletAddress);
  }
}
