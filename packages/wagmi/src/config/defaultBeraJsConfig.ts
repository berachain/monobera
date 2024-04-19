import { BannerConfig, BeraConfig } from "@bera/berajs";
import {
  blockExplorerName,
  blockExplorerUrl,
  chainId,
  chainName,
  gasTokenDecimals,
  gasTokenIconUrl,
  gasTokenName,
  gasTokenSymbol,
  jsonRpcUrl,
  publicJsonRpcUrl,
} from "@bera/config";
import { EvmNetwork } from "@dynamic-labs/sdk-react-core";
import { type Chain } from "viem";
import { createConfig, http } from "wagmi";

import { NetworkConfig } from "~/context/context";

const BeraChain: Chain = {
  id: chainId,
  name: chainName,
  nativeCurrency: {
    decimals: gasTokenDecimals,
    name: gasTokenName,
    symbol: gasTokenSymbol,
  },
  blockExplorers: {
    etherscan: {
      name: blockExplorerName,
      url: blockExplorerUrl,
    },
    default: {
      name: blockExplorerName,
      url: blockExplorerUrl,
    },
  },
  rpcUrls: {
    default: {
      http: [jsonRpcUrl],
    },
    public: {
      http: [publicJsonRpcUrl],
    },
  },
};

const evmNetwork: EvmNetwork = {
  blockExplorerUrls: [blockExplorerUrl],
  chainId: chainId,
  chainName: chainName,
  iconUrls: [gasTokenIconUrl],
  nativeCurrency: {
    decimals: gasTokenDecimals,
    name: gasTokenName,
    symbol: gasTokenSymbol,
  },
  networkId: chainId,
  privateCustomerRpcUrls: [jsonRpcUrl],
  rpcUrls: [publicJsonRpcUrl],
  vanityName: chainName,
  name: chainName,
};

export const defaultBeraConfig: NetworkConfig = {
  chain: BeraChain,
  evmNetwork,
};

export const wagmiConfig = createConfig({
  chains: [defaultBeraConfig.chain],
  multiInjectedProviderDiscovery: false,
  ssr: false,
  transports: {
    [defaultBeraConfig.chain.id]: http(
      defaultBeraConfig.chain.rpcUrls.default.http[0] || "",
    ),
  },
});

export const bannerConfig: BannerConfig = {
  global: {
    lauchBannerEnabled: false,
    rpcBannerEnabled: false,
  },
  BEND: {
    lauchBannerEnabled: false,
    rpcBannerEnabled: false,
  },
  Honey: {
    lauchBannerEnabled: true,
    rpcBannerEnabled: false,
  },
  BEX: {
    lauchBannerEnabled: true,
    rpcBannerEnabled: true,
  },
  BERPS: {
    lauchBannerEnabled: false,
    rpcBannerEnabled: false,
  },
  "BGT Station": {
    lauchBannerEnabled: false,
    rpcBannerEnabled: false,
  },
  Faucet: {
    lauchBannerEnabled: false,
    rpcBannerEnabled: false,
  },
};

export const beraJsConfig: BeraConfig = {
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
    honeyAddress: honeyAddress,
    bgtTokenAddress: bgtTokenAddress,
    nativeTokenAddress: nativeTokenAddress,
  },
  erc20: {
    bera: nativeTokenAddress,
    wbera: beraTokenAddress,
    bgt: bgtTokenAddress,
    honey: honeyTokenAddress,
    stgusd: stgusdcTokenAddress,
    weth: wethTokenAddress,
    wbtc: wbtcTokenAddress,
    ahoney: aHoneyTokenAddress,
    vdhoney: vdHoneyTokenAddress,
  },
};
