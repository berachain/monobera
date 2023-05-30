import type { ChainInfo } from "@keplr-wallet/types";
import { type Chain } from "wagmi";

export type Token = {
  chainId: number;
  ticker: string;
  name: string;
  address: string;
  decimals: number;
  projectLink?: string;
};

export interface TokenList {
  [symbol: string]: Token;
}

interface PrecompileMapping {
  [key: string]: string;
}

export interface NetworkConfig extends ChainInfo {
  isTestnet?: boolean;
  chain: Chain;
  precompileAddresses: PrecompileMapping;
}
