import {
  blockExplorerName,
  blockExplorerUrl,
  chainId,
  chainName,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  jsonRpcUrl,
  networkName,
} from "@bera/config";
import {
  createPublicClient,
  http,
  type Address,
  type Chain,
  type PublicClient,
} from "viem";

const chain: Chain = {
  id: chainId,
  name: chainName,
  network: networkName,
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
      http: [jsonRpcUrl],
    },
  },
};

const client = createPublicClient({
  chain: chain,
  transport: http(),
});

export interface RouterConfig {
  subgraphUrl: string;
  publicClient: PublicClient;
  contracts: {
    poolAddress: Address;
    multicallAddress: Address;
    connectingTokens: {
      symbol: string;
      address: string;
    }[];
    blacklistedPools: Address[];
    honey: Address;
    wbera: Address;
  };
}

export const defaultConfig: RouterConfig = {
  subgraphUrl: process.env.NEXT_PUBLIC_INDEXER_ENDPOINT as string,
  publicClient: client as PublicClient,
  contracts: {
    poolAddress: process.env.NEXT_PUBLIC_ERC20_DEX_ADDRESS as Address,
    multicallAddress: process.env.NEXT_PUBLIC_MULTICALL_ADDRESS as Address,
    connectingTokens: [
      {
        symbol: "wbera",
        address: "0x0",
      },
    ],
    blacklistedPools: [],
    honey: "0x0",
    wbera: "0x0",
  },
};
