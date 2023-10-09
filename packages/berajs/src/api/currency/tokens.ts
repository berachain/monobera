export type Token = {
  chainId?: number;
  logoURI?: string;
  tags?: string[];
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  default?: boolean;
  normalizedWeight?: number;
  weight?: string | number;
  balance?: bigint;
};
