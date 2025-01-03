import {ethers} from 'ethers';
import * as bip39 from 'bip39';
import {Injectable} from '@nestjs/common';

@Injectable()
export class WalletService {
  async createWallet() {
    return 'This action adds a new wallet';
  }
}
