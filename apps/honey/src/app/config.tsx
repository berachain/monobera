import { type NetworkConfig } from "@bera/berajs";
import {
  bankAddress,
  berachefAddress,
  blockExplorerName,
  blockExplorerUrl,
  chainId,
  chainName,
  epochsAddress,
  erc20BgtAddress,
  erc20DexAddress,
  erc20HoneyAddress,
  erc20ModuleAddress,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  governanceAddress,
  honeyAddress,
  jsonRpcUrl,
  multicallAddress,
  networkName,
  rewardsAddress,
  stakingAddress,
} from "@bera/config";
import { type Chain } from "viem";

export const navItems = [
  {
    href: "#mint",
    title: "Mint",
  },
  {
    href: "#supply",
    title: "Supply",
  },
  {
    href: "#transactions",
    title: "Transactions",
  },
];

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

export const beraJsConfig: NetworkConfig = {
  precompileAddresses: {
    multicallAddress,
    erc20DexAddress,
    erc20ModuleAddress,
    erc20HoneyAddress,
    stakingAddress,
    governanceAddress,
    bankAddress,
    epochsAddress,
    erc20BgtAddress,
    berachefAddress,
    honeyAddress,
    rewardsAddress,
  },
  chain: chain,
};
