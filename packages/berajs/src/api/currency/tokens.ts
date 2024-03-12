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
  formattedBalance?: string;
};

export type Gauge = {
  logoURI?: string;
  address: string;
  url?: string;
  categoryName?: string;
  categoryIcon?: string;
  name: string;
  default?: boolean;
  normalizedWeight?: number;
  weight?: string | number;
};
