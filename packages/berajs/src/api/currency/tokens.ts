import { isProduction } from "../utils/isProduction";

export type Token = {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
};

const TESTNET_TOKENS: Token[] = [
  {
    address: "0x3945f611Fe77A51C7F3e1f84709C1a2fDcDfAC5B",
    decimals: 18,
    symbol: "TK",
    name: "Token",
  },
];

const MAINNET_TOKENS = [
  {
    address: "0x00000000",
    decimals: 18,
    symbol: "BERA",
    name: "Bera",
  },
  {
    address: "0x00000000",
    decimals: 18,
    symbol: "BGT",
    name: "BGT",
  },
  {
    address: "0x00000000",
    decimals: 18,
    symbol: "HONEY",
    name: "HONEY",
  },
  {
    address: "0x3945f611Fe77A51C7F3e1f84709C1a2fDcDfAC5B",
    decimals: 18,
    symbol: "TK",
    name: "Token",
  },
];

export const getTokens = () => {
  if (isProduction()) return MAINNET_TOKENS;
  else return TESTNET_TOKENS;
};
