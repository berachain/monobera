import { isProduction } from "../utils/isProduction";

export type Token = {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  default?: boolean;
  normalizedWeight?: number;
  weight?: string | number;
  balance?: bigint;
};

const TESTNET_TOKENS: Token[] = [];

const MAINNET_TOKENS: Token[] = [];

export const getTokens = (): Token[] => {
  if (isProduction()) return MAINNET_TOKENS;
  else return TESTNET_TOKENS;
};
