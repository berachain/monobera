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
  erc20BribeModule,
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
} from "@bera/config";
import { type Chain } from "viem";

export const navItems = [
  {
    href: "/",
    title: "Dashboard",
  },
  {
    href: "/my-bgt",
    title: "My BGT",
  },
  {
    href: "/redeem",
    title: "Redeem",
  },
  {
    href: "#",
    title: "Validators",
    children: [
      {
        href: "/validators",
        type: "internal",
        title: "Validators",
        blurb: `View all validators on the ${chainName} network`,
      },
      {
        href: "/delegate",
        type: "internal",
        title: "Delegate",
        blurb: "Delegate, redelegate, and unbond from Validators",
      },
      {
        href: "/governance",
        type: "internal",
        title: "Governance",
        blurb: "Vote on proposals and participate in governance",
      },
    ],
  },
  // {
  //   href: "#",
  //   title: "Explore",
  //   children: [
  //     {
  //       href: homePageUrl,
  //       type: 'external',
  //       title: "Berachain Foundation",
  //       blurb: "The homepage of the chain",
  //     },
  //     {
  //       href: honeyDappUrl,
  //       type: 'external',
  //       title: honeyDappName,
  //       blurb: "Mint or redeem the stablecoin of the Berachain",
  //     },
  //     {
  //       href: bgtDappUrl,
  //       type: 'external',
  //       title: bgtDappName,
  //       blurb: "The hub for the governance token of Berachain, BGT",
  //     },
  //     {
  //       href: blockExplorerUrl,
  //       type: 'external',
  //       title: blockExplorerName,
  //       blurb: "View all transactions in the Berachain network",
  //     },
  //   ],
  // },
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
