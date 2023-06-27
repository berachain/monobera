import { type Chain } from "wagmi";

interface PrecompileMapping {
  [key: string]: string;
}

export interface NetworkConfig {
  isTestnet?: boolean;
  chain: Chain;
  precompileAddresses: PrecompileMapping;
}
