import { getCosmosChain } from "@bera/berajs";
import { type NetworkConfig } from "@bera/berajs/src/config";
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
