import {
  API_CHAIN_NAMES,
  BALANCER_QUERIES,
  BALANCER_RELAYER,
  BalancerApi,
  CHAINS,
  COMPOSABLE_STABLE_POOL_FACTORY,
  NATIVE_ASSETS,
  Token,
  VAULT,
  WEIGHTED_POOL_FACTORY_BALANCER_V2,
} from "@balancer/sdk";
import {
  balancerApiUrl,
  balancerQueriesAddress,
  balancerRelayerAddress,
  balancerVaultAddress,
  beraTokenAddress,
  chainId,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
} from "@bera/config";
import { defaultBeraNetworkConfig } from "@bera/wagmi/config";

import { ADDRESS_ZERO } from "~/config";

export * from "@balancer/sdk";

export const balancerApi = new BalancerApi(balancerApiUrl, chainId);

API_CHAIN_NAMES[chainId] = "BARTIO";
CHAINS[chainId] = defaultBeraNetworkConfig.chain;
BALANCER_RELAYER[chainId] = balancerRelayerAddress;
VAULT[chainId] = balancerVaultAddress;
BALANCER_QUERIES[chainId] = balancerQueriesAddress;

WEIGHTED_POOL_FACTORY_BALANCER_V2[chainId] = ADDRESS_ZERO;
COMPOSABLE_STABLE_POOL_FACTORY[chainId] = ADDRESS_ZERO;
// @ts-expect-error not in network list
NATIVE_ASSETS[chainId] = new Token(
  chainId,
  ADDRESS_ZERO,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  beraTokenAddress,
);
