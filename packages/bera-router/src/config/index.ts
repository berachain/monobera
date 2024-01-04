import {
  blockExplorerName,
  blockExplorerUrl,
  chainId,
  chainName,
  erc20DexAddress,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  jsonRpcUrl,
  multicallAddress,
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
  publicClient: client as PublicClient,
  contracts: {
    poolAddress: erc20DexAddress,
    multicallAddress: multicallAddress,
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
