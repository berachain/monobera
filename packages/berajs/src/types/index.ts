export interface WalletBalance {
  ticker: string;
  address: string;
  balance: string;
}

export interface TokenIF {
  name: string;
  address: string;
  symbol: string;
  decimals: number;
  chainId: number;
  logoURI: string;
  fromList?: string;
  listedBy?: string[];
  walletBalance?: string;
  dexBalance?: string;
}
