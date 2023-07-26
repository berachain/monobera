import { type Address, type Chain } from "wagmi";

interface PrecompileMapping {
  [key: string]: Address;
}

export interface NetworkConfig {
  isTestnet?: boolean;
  chain: Chain;
  precompileAddresses: PrecompileMapping;
}
