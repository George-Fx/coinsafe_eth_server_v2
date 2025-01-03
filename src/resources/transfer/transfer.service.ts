import {ethers} from 'ethers';
import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {erc20Abi} from '../../abi/abi';
import {createProvider} from '../../provider/provider';

@Injectable()
export class TransferService {
  private provider: ethers.JsonRpcProvider;

  constructor(private configService: ConfigService) {
    this.provider = createProvider(this.configService);
  }

  async transfer(
    fromPrivateKey: string,
    to: string,
    amount: number,
  ): Promise<{success: boolean}> {
    try {
      const wallet = new ethers.Wallet(fromPrivateKey, this.provider);
      const contract = new ethers.Contract(to, erc20Abi, wallet);

      const decimals = await contract.decimals();
      const amountInUnits = ethers.parseUnits(amount.toString(), decimals);

      const tx = await contract.transfer(to, amountInUnits);
      await tx.wait();

      return {success: true};
    } catch (error) {
      console.error('Error sending tokens:', error);
      throw new Error(`Failed to send tokens: ${error.message}`);
    }
  }
}
