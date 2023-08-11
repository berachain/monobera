import { type NetworkConfig } from "@bera/berajs";
import { type Chain } from "viem";

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
} from "~/config";

export const navItems = [
  {
    href: "/",
    title: "My BGT",
  },
  // {
  //   href: "/dashboard",
  //   title: "Dashboard",
  // },

  {
    href: "/stake",
    title: "Stake",
  },
  {
    href: "/delegate",
    title: "Delegate",
  },
  {
    href: "/governance",
    title: "Governance",
  },
  {
    href: "/redeem",
    title: "Redeem",
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
