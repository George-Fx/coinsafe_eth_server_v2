import {ethers} from 'ethers';
import {ConfigService} from '@nestjs/config';

export const createProvider = (
  configService: ConfigService,
): ethers.JsonRpcProvider => {
  const infuraUrl = configService.get<string>('INFURA_MAINNET_URL');
  return new ethers.JsonRpcProvider(infuraUrl);
};
