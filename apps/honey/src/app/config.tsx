import { type NetworkConfig } from "@bera/berajs";
import {
  bankAddress,
  berachefAddress,
  bgtName,
  bgtUrl,
  blockExplorerName,
  blockExplorerUrl,
  chainId,
  chainName,
  dexName,
  dexUrl,
  epochsAddress,
  erc20BgtAddress,
  erc20DexAddress,
  erc20HoneyAddress,
  erc20ModuleAddress,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  governanceAddress,
  homepageName,
  homepageUrl,
  honeyAddress,
  jsonRpcUrl,
  lendName,
  lendUrl,
  multicallAddress,
  networkName,
  perpsName,
  perpsUrl,
  publicAnalyticsUrl,
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
  {
    href: "#",
    title: "Explore",
    children: [
      {
        href: publicAnalyticsUrl,
        title: "Dune Analytics",
        blurb: "Checkout HONEY’s stats on dune analytics",
      },
      {
        href: homepageUrl,
        title: homepageName,
        blurb: "Explore Berachain and learn more about our vision",
      },
      {
        href: dexUrl,
        title: dexName,
        blurb: "Swap tokens and provide liquidity to earn BGT rewards",
      },
      {
        href: blockExplorerUrl,
        type: "external",
        title: blockExplorerName,
        blurb:
          "View all transactions and blockchain information on the Berachain network",
      },
      {
        href: bgtUrl,
        type: "external",
        title: bgtName,
        blurb: "The hub for BGT governance and bribes on Berachain ",
      },
      {
        href: lendUrl,
        type: "external",
        title: lendName,
        blurb:
          "Earn Interest And Rewards By Supplying Your Assets And Borrowing Honey",
      },
      {
        href: perpsUrl,
        type: "external",
        title: perpsName,
        blurb:
          "Trade All Your Favourite Pairs With Deep Liquidity and Market Diversity",
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
