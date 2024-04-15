import { SWRConfiguration } from "swr";
import { Address } from "viem";

export interface BeraConfig {
  endpoints?: {
    dexRouter?: string;
    tokenList?: string;
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
    honeyAddress?: Address;
  };
}

export interface DefaultHookTypes {
  config: BeraConfig;
  opts?: SWRConfiguration | undefined;
}

export interface PayloadReturnType<T = any[]> {
  payload: T;
  value?: bigint;
}
