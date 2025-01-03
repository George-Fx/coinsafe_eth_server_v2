export class TokenDto {
  id: string;
  name: string;
  symbol: string;
  price?: number | string;
  balance?: number | string;
  contractAddress: string;
}
