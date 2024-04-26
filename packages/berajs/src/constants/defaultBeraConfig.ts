import {
  beraTokenAddress,
  crocDexAddress,
  crocIndexerEndpoint,
  crocMultiSwapAddress,
  crocRouterEndpoint,
  crocSubgraphEndpoint,
  honeySubgraphUrl,
  lendOracleAddress,
  lendPoolAddressProviderAddress,
  lendPoolImplementationAddress,
  lendRewardsAddress,
  lendSubgraphUrl,
  lendUIDataProviderAddress,
  multicallAddress,
  tokenListUrl,
} from "@bera/config";

import { BeraConfig } from "..";

export const defaultBeraConfig: BeraConfig = {
  endpoints: {
    tokenList: tokenListUrl,
    dexRouter: crocRouterEndpoint,
    dexIndexer: crocIndexerEndpoint,
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
  },
};
