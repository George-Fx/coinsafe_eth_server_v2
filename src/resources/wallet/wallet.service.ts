import {ethers} from 'ethers';
import * as bip39 from 'bip39';
import {Injectable} from '@nestjs/common';

@Injectable()
export class WalletService {
  async createWallet(entropy: number) {
    // entropy - 128 | 160 | 192 | 224 | 256
    try {
      const mnemonic = bip39.generateMnemonic(entropy);
      const wallet = ethers.Wallet.fromPhrase(mnemonic);
      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: mnemonic,
      };
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  }
}
