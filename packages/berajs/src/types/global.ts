import { SWRConfiguration, SWRResponse } from "swr";
import { Address } from "viem";

import { Token } from "./dex";

export interface BeraConfig {
  endpoints?: {
    dexRouter?: string;
    dexIndexer?: string;
    tokenList?: string;
    validatorInfo?: string;
  };
  subgraphs?: {
    honeySubgraph?: string;
    dexSubgraph?: string;
    lendSubgraph?: string;
    bgtSubgraph?: string;
  };
  contracts?: {
    multicallAddress?: Address;
    crocMultiSwapAddress?: Address;
    wrappedTokenAddress?: Address;
    dexAddress?: Address;
    lendAddressProviderAddress?: Address;
    lendOracleAddress?: Address;
    lendPoolProxyAddress?: Address;
    lendUIDataProviderAddress?: Address;
    lendRewardsAggregatorAddress?: Address;
    honeyRouterAddress?: Address;
    perpsTradingContractAddress?: Address;
  };
}

export type DefaultHookOptions = {
  beraConfigOverride?: BeraConfig; // hooks typically use the useBeraJS hook to get the beraConfig by default, this overrides the beraConfig explicitly
  opts?: SWRConfiguration | undefined;
};

export type DefaultHookReturnType<T = any> = SWRResponse<T, any, any> & {
  refresh: () => void;
};

export interface PayloadReturnType<T = any[]> {
  payload: T;
  value?: bigint;
}

export interface TokenBalance {
  balance: bigint;
  formattedBalance: string;
}

export interface AllowanceToken extends Token {
  allowance: bigint;
  formattedAllowance: string;
}
