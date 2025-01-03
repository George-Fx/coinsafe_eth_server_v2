import {ethers} from 'ethers';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {erc20Abi} from '../../abi/abi';
import {TokenDto} from '../../dto/token.dto';
import {createProvider} from '../../provider/provider';

@Injectable()
export class BalanceService {
  private provider: ethers.JsonRpcProvider;

  constructor(private configService: ConfigService) {
    this.provider = createProvider(this.configService);
  }

  async getBalance(tokens: TokenDto[], walletAddress: string) {
    try {
      const balances = await Promise.all(
        tokens.map(async (token) => {
          const contract = new ethers.Contract(
            token.contractAddress,
            erc20Abi,
            this.provider,
          );
          const [decimals, balance] = await Promise.all([
            contract.decimals(),
            contract.balanceOf(walletAddress),
          ]);
          const decimalsNumber = Number(decimals);
          return {
            id: token.id,
            balance: ethers.formatUnits(balance, decimalsNumber),
          };
        }),
      );
      return balances;
    } catch (error) {
      console.error('Error getting balance:', error);
      throw new Error('Failed to get balance');
    }
  }
}
