// Custom Balancer network configuration for Berachain

import {
  BalancerNetworkConfig,
  BalancerSdkConfig,
  ContractAddresses,
} from "@balancer-labs/sdk";
import {
  balancerHelperAddress,
  balancerQueriesAddress,
  balancerVaultAddress,
  beraTokenAddress,
  jsonRpcUrl,
  multicallAddress,
  nativeTokenAddress,
} from "@bera/config";

// FIXME: this throws TypeError: Cannot read properties of undefined (reading 'addresses')
const contractAddresses: ContractAddresses = {
  vault: balancerVaultAddress,
  multicall: multicallAddress,
  poolDataQueries: balancerQueriesAddress,
  balancerHelpers: balancerHelperAddress, // "0x389A5033796c6cF8043AECc12B3ffE5874186697",
  balancerRelayer: "0x0000000000000000000000000000000000000001", // https://docs.balancer.fi/concepts/advanced/relayers.html#authorizing-a-relayer
};

export const balancerNetworkConfig: BalancerNetworkConfig = {
  addresses: {
    contracts: contractAddresses,
    tokens: {
      wrappedNativeAsset: beraTokenAddress,
      bal: nativeTokenAddress,
    },
  },
  urls: {
    subgraph: "https://bartio-bexapi.berachain.com/graphql", // FIXME: this will likely throw CORS
  },
  thirdParty: {
    coingecko: {
      nativeAssetId: "berachain-bera", // CoinGecko ID for Berachain's native asset (https://www.coingecko.com/en/coins/berachain-bera)
      platformId: "berachain-bera",
    },
  },
  pools: {},
  chainId: 80084, // FIXME: need to fork Balancer SDK to support Berachain fully (vs modifying locally)

  // multicallBatchSize: 10, // Optional batch size for multicall
  // averageBlockTime: 3, // Optional average block time in seconds
};
export const balancerSdkConfig: BalancerSdkConfig = {
  network: balancerNetworkConfig,
  rpcUrl: jsonRpcUrl,
  enableLogging: true,
};
