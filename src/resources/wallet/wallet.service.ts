import {Injectable} from '@nestjs/common';

@Injectable()
export class WalletService {
  async createWallet() {
    return 'This action adds a new wallet';
  }
}
