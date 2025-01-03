import axios from 'axios';
import {ethers} from 'ethers';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {URLS} from '../../config';
import {createProvider} from '../../provider/provider';

@Injectable()
export class TransactionsService {
  private provider: ethers.JsonRpcProvider;

  private readonly ETHERSCAN_API_KEY: string;

  constructor(private configService: ConfigService) {
    this.provider = createProvider(this.configService);
    this.ETHERSCAN_API_KEY =
      this.configService.get<string>('ETHERSCAN_API_KEY');
  }

  async getHistory(walletAddress: string) {
    try {
      const response = await axios.get(URLS.ETHERSCAN_URL, {
        params: {
          module: 'account',
          action: 'txlist',
          // action: 'tokentx',
          address: walletAddress,
          startblock: 0,
          endblock: 99999999,
          sort: 'asc',
          apikey: this.ETHERSCAN_API_KEY,
        },
      });

      let trx = response.data.result.reverse();
      // trx = trx.filter((transaction: any) => transaction.value !== '0');

      return trx;
    } catch (error) {
      console.error('Error getting transaction history:', error);
    }
  }
}
