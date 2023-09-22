import { type NetworkConfig } from "@bera/berajs";
import {
  bankAddress,
  berachefAddress,
  blockExplorerName,
  blockExplorerUrl,
  chainId,
  chainName,
  dexName,
  dexUrl,
  epochsAddress,
  erc20BgtAddress,
  erc20BribeModule,
  erc20DexAddress,
  erc20ModuleAddress,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  governanceAddress,
  homepageName,
  homepageUrl,
  honeyAddress,
  honeyName,
  honeyUrl,
  jsonRpcUrl,
  lendName,
  lendUrl,
  multicallAddress,
  networkName,
  perpsName,
  perpsUrl,
  rewardsAddress,
  stakingAddress,
} from "@bera/config";
import { type Chain } from "viem";

export const navItems = [
  {
    href: "/my-bgt",
    title: "My BGT",
  },
  {
    href: "/validators",
    title: "Validators",
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
  {
    href: "#",
    title: "Explore",
    children: [
      {
        href: homepageUrl,
        title: homepageName,
        blurb: "Explore Berachain and learn more about our vision",
      },
      {
        href: honeyUrl,
        title: honeyName,
        blurb: "Mint or redeem Honey, the stablecoin of Berachain",
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
    stakingAddress,
    governanceAddress,
    bankAddress,
    epochsAddress,
    erc20BgtAddress,
    berachefAddress,
    honeyAddress,
    rewardsAddress,
    erc20BribeModule,
  },
  chain: chain,
};
