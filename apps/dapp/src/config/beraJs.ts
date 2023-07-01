import { getCosmosChain, type NetworkConfig } from "@bera/berajs";
import { type Chain } from "wagmi";

export const BERA = {
  coinDenom: "bera",
  coinMinimalDenom: "abera",
  coinDecimals: 18,
};

export const BGT = {
  coinDenom: "bgt",
  coinMinimalDenom: "abgt",
  coinDecimals: 18,
};

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
      http: ["http://localhost:8545"],
    },
    public: {
      http: ["http://localhost:8545"],
    },
  },
};

export const beraConfig: NetworkConfig = {
  ...getCosmosChain(),
  precompileAddresses: {
    multicall: "0x0000",
  },
  chain: PolarisChain,
};
