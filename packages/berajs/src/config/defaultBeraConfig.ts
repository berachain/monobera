import {
  balancerVaultAddress,
  beraTokenAddress,
  bgtEndpointUrl,
  bgtSubgraphUrl,
  bgtTokenAddress,
  // TODO: remove the croc addresses & endpoints
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
    dexRouter: crocRouterEndpoint, // TODO (#): more croc-specific endpoints here
    dexIndexer: crocIndexerEndpoint,
    tokenList: tokenListUrl,
    validatorList: validatorListUrl,
    marketList: marketListUrl,
    validatorInfo: validatorListUrl,
    bgtEndpoint: bgtEndpointUrl,
  },
  subgraphs: {
    honeySubgraph: honeySubgraphUrl,
    dexSubgraph: crocSubgraphEndpoint, // TODO (#): swap to balancer subgraph
    lendSubgraph: lendSubgraphUrl,
    bgtSubgraph: bgtSubgraphUrl,
    governanceSubgraph: governanceSubgraphUrl,
  },
  contracts: {
    multicallAddress: multicallAddress,
    crocMultiSwapAddress: crocMultiSwapAddress,
    balancerVaultAddress: balancerVaultAddress,
    wrappedTokenAddress: beraTokenAddress,
    dexAddress: crocDexAddress, // TODO (#): prune/migrate this croc-specific address to balancer
    bgtAddress: bgtTokenAddress,
    lendAddressProviderAddress: lendPoolAddressProviderAddress,
    lendOracleAddress: lendOracleAddress,
    lendPoolProxyAddress: lendPoolImplementationAddress,
    lendUIDataProviderAddress: lendUIDataProviderAddress,
    lendRewardsAggregatorAddress: lendRewardsAddress,
    honeyRouterAddress: honeyRouterAddress,
    perpsTradingContractAddress: tradingContractAddress,
    governance: {
      governor: governorAddress,
      timelock: governanceTimelockAddress,
    },
  },
};
