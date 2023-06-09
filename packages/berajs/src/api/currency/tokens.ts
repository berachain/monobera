import { isProduction } from "../utils/isProduction";

export type Token = {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  default: boolean;
};

const TESTNET_TOKENS: Token[] = [];

const MAINNET_TOKENS = [
  {
    address: "0x00000000",
    decimals: 18,
    symbol: "BERA",
    name: "Bera",
    default: true,
  },
  {
    address: "0x00000000",
    decimals: 18,
    symbol: "BGT",
    name: "BGT",
    default: true,
  },
  {
    address: "0x00000000",
    decimals: 18,
    symbol: "HONEY",
    name: "HONEY",
    default: true,
  },
  {
    address: "0x3945f611Fe77A51C7F3e1f84709C1a2fDcDfAC5B",
    decimals: 18,
    symbol: "TK",
    name: "Token",
    default: true,
  },
];

export const getTokens = (): Token[] => {
  if (isProduction()) return MAINNET_TOKENS;
  else return TESTNET_TOKENS;
};
