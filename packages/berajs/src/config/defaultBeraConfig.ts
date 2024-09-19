import {
  beraTokenAddress,
  bgtEndpointUrl,
  bgtSubgraphUrl,
  bgtTokenAddress,
  crocDexAddress,
  crocIndexerEndpoint,
  crocMultiSwapAddress,
  crocRouterEndpoint,
  crocSubgraphEndpoint,
  governanceSubgraphUrl,
  governanceTimelockAddress,
  governorAddress,
  honeyRouterAddress,
  honeySubgraphUrl,
  lendOracleAddress,
  lendPoolAddressProviderAddress,
  lendPoolImplementationAddress,
  lendRewardsAddress,
  lendSubgraphUrl,
  lendUIDataProviderAddress,
  marketListUrl,
  multicallAddress,
  tokenListUrl,
  tradingContractAddress,
  validatorListUrl,
} from "@bera/config";

import type { BeraConfig } from "..";

export const defaultBeraConfig: BeraConfig = {
  endpoints: {
    dexRouter: crocRouterEndpoint,
    dexIndexer: crocIndexerEndpoint,
    tokenList: tokenListUrl,
    validatorList: validatorListUrl,
    marketList: marketListUrl,
    validatorInfo: validatorListUrl,
    bgtEndpoint: bgtEndpointUrl,
  },
  subgraphs: {
    honeySubgraph: honeySubgraphUrl,
    dexSubgraph: crocSubgraphEndpoint,
    lendSubgraph: lendSubgraphUrl,
    bgtSubgraph: bgtSubgraphUrl,
    governanceSubgraph: governanceSubgraphUrl,
  },
  contracts: {
    multicallAddress: multicallAddress,
    crocMultiSwapAddress: crocMultiSwapAddress,
    wrappedTokenAddress: beraTokenAddress,
    dexAddress: crocDexAddress,
    bgtAddress: bgtTokenAddress,
    lendAddressProviderAddress: lendPoolAddressProviderAddress,
    lendOracleAddress: lendOracleAddress,
    lendPoolProxyAddress: lendPoolImplementationAddress,
    lendUIDataProviderAddress: lendUIDataProviderAddress,
    lendRewardsAggregatorAddress: lendRewardsAddress,
    honeyRouterAddress: honeyRouterAddress,
    perpsTradingContractAddress: tradingContractAddress,
    governance: {
      berahub: {
        governor: governorAddress,
        timelock: governanceTimelockAddress,
      },
      honey: {
        governor: governorAddress,
        timelock: governanceTimelockAddress,
      },
      bend: {
        governor: governorAddress,
        timelock: governanceTimelockAddress,
      },
      berps: {
        governor: governorAddress,
        timelock: governanceTimelockAddress,
      },
      general: {
        governor: governorAddress,
        timelock: governanceTimelockAddress,
      },
    },
  },
};
