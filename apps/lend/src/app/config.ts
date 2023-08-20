import { type NetworkConfig } from "@bera/berajs";
import { type Chain } from "wagmi";

import {
  bankAddress,
  berachefAddress,
  bgtDappName,
  bgtDappUrl,
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
  homePageUrl,
  honeyAddress,
  honeyDappName,
  honeyDappUrl,
  jsonRpcUrl,
  multicallAddress,
  networkName,
  rewardsAddress,
  stakingAddress,
} from "../config";

export const navItems = [
  {
    href: "/dashboard",
    title: "Dashboard",
  },
  {
    href: "/markets",
    title: "Markets",
  },
  {
    href: "#",
    title: "More",
    children: [
      {
        href: homePageUrl,
        title: "Berachain Foundation",
        blurb: "The homepage of the chain",
      },
      {
        href: honeyDappUrl,
        title: honeyDappName,
        blurb: "Mint or redeem the stablecoin of the Berachain",
      },
      {
        href: bgtDappUrl,
        title: bgtDappName,
        blurb: "The hub for the governance token of Berachain, BGT",
      },
      {
        href: blockExplorerUrl,
        title: blockExplorerName,
        blurb: "View all transactions in the Berachain network",
      },
    ],
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
