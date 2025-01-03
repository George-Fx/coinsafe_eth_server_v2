export const erc20Abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function transfer(address to, uint amount) returns (bool)',
  'function balanceOf(address) view returns (uint)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
];
