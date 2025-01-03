import {Controller, All, Req, HttpCode, HttpStatus} from '@nestjs/common';
import {MarketService} from './market.service';
import {Request} from 'express';

@Controller('tokens')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @All('market')
  @HttpCode(HttpStatus.OK)
  async getMarketData(@Req() request: Request) {
    if (request.method !== 'GET') {
      return 'Only GET requests are allowed';
    }
    return this.marketService.getMarketData();
  }
}
