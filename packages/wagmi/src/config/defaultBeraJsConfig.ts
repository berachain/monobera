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
