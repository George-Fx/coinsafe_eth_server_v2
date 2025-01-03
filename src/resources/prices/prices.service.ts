import axios from 'axios';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {URLS} from '../../config';
import {TokenDto} from '../../dto/token.dto';

@Injectable()
export class PricesService {
  private readonly COIN_GECKO_API_KEY: string;

  constructor(private configService: ConfigService) {
    this.COIN_GECKO_API_KEY =
      this.configService.get<string>('COIN_GECKO_API_KEY');
  }

  async getPrices(tokens: TokenDto[]) {
    const ids = tokens.map((token) => token.id).join(',');

    try {
      const response = await axios.get(URLS.COIN_GECKO_SIMPLE_PRICE, {
        headers: {'X-CMC_PRO_API_KEY': this.COIN_GECKO_API_KEY},
        params: {ids, vs_currencies: 'usd'},
      });

      const prices = response.data;

      return tokens.map((token) => ({
        id: token.id,
        price: prices[token.id]?.usd || 0,
      }));
    } catch (error) {
      console.error('Error getting prices:', error);
      throw new Error('Failed to get prices');
    }
  }
}
