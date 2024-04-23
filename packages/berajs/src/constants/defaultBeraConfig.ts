import {
  aHoneyTokenAddress,
  beraTokenAddress,
  bgtTokenAddress,
  crocDexAddress,
  crocMultiSwapAddress,
  crocRouterEndpoint,
  crocSubgraphEndpoint,
  honeyAddress,
  honeySubgraphUrl,
  honeyTokenAddress,
  lendOracleAddress,
  lendPoolAddressProviderAddress,
  lendPoolImplementationAddress,
  lendRewardsAddress,
  lendSubgraphUrl,
  lendUIDataProviderAddress,
  multicallAddress,
  nativeTokenAddress,
  stgusdcTokenAddress,
  tokenListUrl,
  vdHoneyTokenAddress,
  wbtcTokenAddress,
  wethTokenAddress,
} from "@bera/config";

import { BeraConfig } from "..";

export const defaultBeraConfig: BeraConfig = {
  endpoints: {
    tokenList: tokenListUrl,
    dexRouter: crocRouterEndpoint,
  },
  subgraphs: {
    honeySubgraph: honeySubgraphUrl,
    dexSubgraph: crocSubgraphEndpoint,
    lendSubgraph: lendSubgraphUrl,
  },
  contracts: {
    multicallAddress: multicallAddress,
    crocMultiSwapAddress: crocMultiSwapAddress,
    wrappedTokenAddress: beraTokenAddress,
    dexAddress: crocDexAddress,
    lendAddressProviderAddress: lendPoolAddressProviderAddress,
    lendOracleAddress: lendOracleAddress,
    lendPoolProxyAddress: lendPoolImplementationAddress,
    lendUIDataProviderAddress: lendUIDataProviderAddress,
    lendRewardsAggregatorAddress: lendRewardsAddress,
  }
};
