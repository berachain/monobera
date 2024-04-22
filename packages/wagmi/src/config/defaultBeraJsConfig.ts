import { BeraConfig } from "@bera/berajs";
import {
  aHoneyTokenAddress,
  beraTokenAddress,
  bgtTokenAddress,
  blockExplorerName,
  blockExplorerUrl,
  chainId,
  chainName,
  crocDexAddress,
  crocRouterEndpoint,
  crocSubgraphEndpoint,
  gasTokenDecimals,
  gasTokenIconUrl,
  gasTokenName,
  gasTokenSymbol,
  honeyAddress,
  honeySubgraphUrl,
  honeyTokenAddress,
  jsonRpcUrl,
  lendOracleAddress,
  lendPoolAddressProviderAddress,
  lendPoolImplementationAddress,
  lendRewardsAddress,
  lendSubgraphUrl,
  lendUIDataProviderAddress,
  multicallAddress,
  nativeTokenAddress,
  publicJsonRpcUrl,
  stgusdcTokenAddress,
  tokenListUrl,
  vdHoneyTokenAddress,
  wbtcTokenAddress,
  wethTokenAddress,
} from "@bera/config";
import { EvmNetwork } from "@dynamic-labs/sdk-react-core";
import { type Chain } from "viem";
import { createConfig, http } from "wagmi";

import { NetworkConfig } from "~/context/context";
import { crocMultiSwapAddress } from "../../../config/env/index";

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

export interface BannerConfig {
  [key: string]: DappBannerConfig;
}

export interface BannerProperty {
  enabled: boolean;
  text: string;
  href?: string;
}

export enum DappBannerType {
  LAUNCH = "LAUNCH",
  RPC = "RPC",
  SLOW = "SLOW",
}

export interface DappBannerConfig {
  [DappBannerType.LAUNCH]: BannerProperty;
  [DappBannerType.RPC]: BannerProperty;
  [DappBannerType.SLOW]: BannerProperty;
}

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
    [DappBannerType.LAUNCH]: {
      enabled: false,
      text: "Welcome to Berachain Dapps.",
      href: "https://berachain.com",
    },
    [DappBannerType.RPC]: {
      enabled: false,
      text: "We are currently performing system-wide updates. Our services will be temporarily unavailable, but we&apos;ll be back up shortly.",
    },
    [DappBannerType.SLOW]: {
      enabled: true,
      text: "We are currently experiencing network congestion in our system, please be patient with us.",
    },
  },
  BEND: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      text: "Welcome to BEND",
    },
    [DappBannerType.RPC]: {
      enabled: false,
      text: "We are currently performing system-wide updates. Our services will be temporarily unavailable, but we&apos;ll be back up shortly.",
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      text: "We are currently experiencing network congestion in our system, please be patient with us.",
    },
  },
  BEX: {
    [DappBannerType.LAUNCH]: {
      enabled: true,
      text: "Welcome to BEX",
    },
    [DappBannerType.RPC]: {
      enabled: true,
      text: "We are currently performing system-wide updates. Our services will be temporarily unavailable, but we&apos;ll be back up shortly.",
    },
    [DappBannerType.SLOW]: {
      enabled: true,
      text: "We are currently experiencing network congestion in our system, please be patient with us.",
    },
  },
  Honey: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      text: "Welcome to Honey",
    },
    [DappBannerType.RPC]: {
      enabled: false,
      text: "We are currently performing system-wide updates. Our services will be temporarily unavailable, but we&apos;ll be back up shortly.",
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      text: "We are currently experiencing network congestion in our system, please be patient with us.",
    },
  },
  BERPS: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      text: "Welcome to Berps",
    },
    [DappBannerType.RPC]: {
      enabled: false,
      text: "We are currently performing system-wide updates. Our services will be temporarily unavailable, but we&apos;ll be back up shortly.",
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      text: "We are currently experiencing network congestion in our system, please be patient with us.",
    },
  },
  "BGT Station": {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      text: "Welcome to BGT station",
    },
    [DappBannerType.RPC]: {
      enabled: false,
      text: "We are currently performing system-wide updates. Our services will be temporarily unavailable, but we&apos;ll be back up shortly.",
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      text: "We are currently experiencing network congestion in our system, please be patient with us.",
    },
  },
  Faucet: {
    [DappBannerType.LAUNCH]: {
      enabled: false,
      text: "Welcome to Berachain Faucet",
    },
    [DappBannerType.RPC]: {
      enabled: false,
      text: "We are currently performing system-wide updates. Our services will be temporarily unavailable, but we&apos;ll be back up shortly.",
    },
    [DappBannerType.SLOW]: {
      enabled: false,
      text: "We are currently experiencing network congestion in our system, please be patient with us.",
    },
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
