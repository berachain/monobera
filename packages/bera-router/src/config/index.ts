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
      http: [
        "http://k8s-guardedt-archive0-706b2d9d3e-0a11fbacff1901c5.elb.us-west-2.amazonaws.com:8545",
      ],
    },
    public: {
      http: [
        "http://k8s-guardedt-archive0-706b2d9d3e-0a11fbacff1901c5.elb.us-west-2.amazonaws.com:8545",
      ],
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
  subgraphUrl: "",
  publicClient: client as PublicClient,
  contracts: {
      poolAddress: "0x0d5862FDbdd12490f9b4De54c236cff63B038074",
      multicallAddress: "0xF44791eCf779318C22d6eA7fbb4741aA3b167654",
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
