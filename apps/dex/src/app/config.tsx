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
    href: "/swap",
    title: "Swap",
  },
  {
    href: "/pool",
    title: "Pool",
  },
  {
    href: "#",
    title: "Explore",
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

export const ctaFeatures = [
  {
    logoURI: "/graphics/swap.png",
    title: "Swap",
    href: "/swap",
  },
  {
    logoURI: "/graphics/rewards.png",
    title: "Rewards",
    href: "/claim",
  },
  {
    logoURI: "/graphics/pool.png",
    title: "Pool",
    href: "/pool",
  },
];

export const partnerships = [
  {
    logoURI: "/partners/agora.png",
    title: "Agora",
    href: "https://twitter.com/AgoraBlockchain",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/gumball.png",
    title: "Gumball",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/hallsOfOlympia.png",
    title: "HallsOfOlympia",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/hiddenHand.png",
    title: "HiddenHand",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/midas.png",
    title: "Midas",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/olympus.png",
    title: "Olympus",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/pickle.png",
    title: "Pickle",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/pirex.png",
    title: "Pirex",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/qidao.png",
    title: "QiDao",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/redacted.png",
    title: "Redacted",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/synapse.png",
    title: "Synapse",
    href: "https://google.com",
    description: "Pool with others",
  },
  {
    logoURI: "/partners/y2k.png",
    title: "Y2K",
    href: "https://google.com",
    description: "Pool with others",
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
