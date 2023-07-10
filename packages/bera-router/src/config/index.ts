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
  subgraphUrl: "http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com",
  publicClient: client as PublicClient,
  contracts: {
    poolAddress: "0x0d5862FDbdd12490f9b4De54c236cff63B038074",
    multicallAddress: "0x85dd28e1Cd670eD7535a1fB5F13863725e75BF66",
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
