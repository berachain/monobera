import type { ChainInfo } from "@keplr-wallet/types";
import { type Chain } from "wagmi";

interface PrecompileMapping {
  [key: string]: string;
}

export interface NetworkConfig extends ChainInfo {
  isTestnet?: boolean;
  chain: Chain;
  precompileAddresses: PrecompileMapping;
}
