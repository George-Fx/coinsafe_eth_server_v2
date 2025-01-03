import axios from 'axios';
import {ethers} from 'ethers';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {URLS} from '../../config';
import {createProvider} from '../../provider/provider';
import {MarketTokenType} from '../../dto/market-token.dto';

@Injectable()
export class MarketService {
  private provider: ethers.JsonRpcProvider;

  constructor(private configService: ConfigService) {
    this.provider = createProvider(this.configService);
  }

  async getMarketData(): Promise<MarketTokenType[]> {
    const COIN_MARKET_CAP_API_KEY = this.configService.get<string>(
      'COIN_MARKET_CAP_API_KEY',
    );

    if (!COIN_MARKET_CAP_API_KEY) {
      throw new Error('CoinMarketCap API key is not defined');
    }

    const url = URLS.COIN_MARKET_CAP_LASTEST_URL;
    const headers = {'X-CMC_PRO_API_KEY': COIN_MARKET_CAP_API_KEY};
    const params = {start: '1', limit: '5000', convert: 'USD'};

    try {
      const response = await axios.get(url, {headers, params});
      const data = response.data.data;

      const updatedData = data.map((coin: MarketTokenType) => {
        const logo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`;
        return {logo, ...coin};
      });

      return updatedData;
    } catch (error) {
      console.error('Error fetching market data:', error);
      throw new Error('Failed to fetch market data');
    }
  }
}
