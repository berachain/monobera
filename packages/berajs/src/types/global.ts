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
    lendAddressProviderAddress: Address;
    lendOracleAddress: Address;
    lendPoolProxyAddress: Address;
    lendUIDataProviderAddress: Address;
    lendRewardsAggregatorAddress: Address;
  };
  erc20?: {
    bera: Address;
    wbera: Address;
    bgt: Address;
    honey: Address;
    stgusd: Address;
    weth: Address;
    wbtc: Address;
    ahoney: Address;
    vdhoney: Address;
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
