import axios from 'axios';
import {ethers} from 'ethers';
import {ConfigService} from '@nestjs/config';
import {Injectable, HttpException, HttpStatus} from '@nestjs/common';

import {URLS} from '../../config';
import {createProvider} from '../../provider/provider';

@Injectable()
export class EthereumService {
  private provider: ethers.JsonRpcProvider;

  constructor(private configService: ConfigService) {
    this.provider = createProvider(this.configService);
  }

  async getBalanceInEther(address: string) {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async getPrice(): Promise<number> {
    try {
      const response = await axios.get(URLS.COIN_BASE_ETH_USD);
      const price = parseFloat(response.data.data.amount);

      return price;
    } catch (error) {
      console.error('Error getting Ethereum price:', error);
      throw new HttpException(
        'Failed to get Ethereum price',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBalance(address: string) {
    try {
      const balanceInEther = await this.getBalanceInEther(address);
      const price = await this.getPrice();
      const balanceInToken = parseFloat(balanceInEther);

      return {price, balance: balanceInToken};
    } catch (error) {
      console.error('Error getting balance:', error);
      throw new HttpException(
        'Failed to get Ethereum data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
