import { BeraConfig } from "@bera/berajs";
import {
  beraTokenAddress,
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
  jsonRpcUrl,
  lendSubgraphUrl,
  multicallAddress,
  publicJsonRpcUrl,
  tokenListUrl,
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
    honeyAddress: honeyAddress,
  },
};
