import {PricesService} from './prices.service';

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

@Controller('tokens')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @All('prices')
  @HttpCode(HttpStatus.OK)
  async getPrices(@Req() request: Request, @Body('tokens') tokens: TokenDto[]) {
    if (request.method !== 'POST') {
      throw new BadRequestException(
        'Only POST requests are allowed for this endpoint',
      );
    }

    if (!tokens || tokens.length === 0) {
      throw new BadRequestException('Tokens must be provided');
    }

    return this.pricesService.getPrices(tokens);
  }
}
