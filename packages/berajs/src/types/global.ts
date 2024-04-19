import { SWRConfiguration, SWRResponse } from "swr";
import { Address } from "viem";

import { Token } from "./dex";

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
    honeyAddress?: Address;
    bgtTokenAddress?: Address;
    nativeTokenAddress?: Address;
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
  banners?: {
    [key: string]: {
      lauchBannerEnabled: boolean;
      rpcBannerEnabled: boolean;
    };
  };
}

export type DefaultHookOptions = {
  beraConfigOverride?: BeraConfig; // hooks typically use the useBeraJS hook to get the beraConfig by default, this overrides the beraConfig explicitly
  opts?: SWRConfiguration | undefined;
};

export type DefaultHookReturnType<T = any> = SWRResponse<T, any, any>;

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
