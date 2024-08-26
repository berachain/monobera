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
  multicallAddress,
  multicallCreationBlock,
} from "@bera/config";
import { EvmNetwork } from "@dynamic-labs/sdk-react-core";
import { type Chain } from "viem";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";

import type { NetworkConfig } from "~/context/context";

const BeraChain: Chain = {
  id: chainId,
  name: chainName,
  nativeCurrency: {
    decimals: gasTokenDecimals,
    name: gasTokenName,
    symbol: gasTokenSymbol,
  },

  contracts: {
    multicall3: {
      address: multicallAddress,
      blockCreated: multicallCreationBlock,
    },
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

export const defaultBeraNetworkConfig: NetworkConfig = {
  chain: BeraChain,
  evmNetwork,
};

export const wagmiConfig = createConfig({
  chains: [defaultBeraNetworkConfig.chain],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),

  batch: {
    /**
     * @see https://viem.sh/docs/clients/public#batchmulticallwait-optional
     */
    multicall: {
      wait: 10,
    },
  },
  transports: {
    [defaultBeraNetworkConfig.chain.id]: http(
      defaultBeraNetworkConfig.chain.rpcUrls.default.http[0] || "",
    ),
  },
});
