import { SWRConfiguration } from "swr";
import { Address } from "viem";

export interface BeraConfig {
  endpoints?: {
    dexRouter?: string;
  };
  subgraphs?: {
    honeySubgraph?: string;
    dexSubgraph?: string;
    lendSubgraph?: string;
  };
  contracts?: {
    multicallAddress?: Address;
    crocMultiSwapAddress?: Address;
    wrappedTokenAddress?: Address;
    dexAddress?: Address;
  };
}

export interface DefaultHookTypes {
  config?: BeraConfig;
  opts?: SWRConfiguration;
}

export interface PayloadReturnType {
  payload: any[];
  value?: bigint;
}
