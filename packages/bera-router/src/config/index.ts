import {
  createPublicClient,
  http,
  type Address,
  type Chain,
  type PublicClient,
} from "viem";

const PolarisChain: Chain = {
  id: 2061,
  name: "Polaris",
  network: "Polaris",
  nativeCurrency: {
    decimals: 18,
    name: "Polaris",
    symbol: "tbera",
  },
  blockExplorers: {
    etherscan: {
      name: "PolarScan",
      url: "k8s-guardedt-explorer-f0d73f8a8b-1f6003a02eec3390.elb.us-west-2.amazonaws.com",
    },
    default: {
      name: "PolarScan",
      url: "k8s-guardedt-explorer-f0d73f8a8b-1f6003a02eec3390.elb.us-west-2.amazonaws.com",
    },
  },
  rpcUrls: {
    default: {
      http: ["https://devnet.beraswillmakeit.com"],
    },
    public: {
      http: ["https://devnet.beraswillmakeit.com"],
    },
  },
};

const client = createPublicClient({
  chain: PolarisChain,
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
