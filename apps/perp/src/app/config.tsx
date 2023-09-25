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
  erc20ModuleAddress,
  gasTokenDecimals,
  gasTokenName,
  gasTokenSymbol,
  governanceAddress,
  homepageUrl,
  honeyAddress,
  honeyName,
  honeyUrl,
  jsonRpcUrl,
  multicallAddress,
  networkName,
  rewardsAddress,
  stakingAddress,
} from "@bera/config";
import { type Chain } from "wagmi";

export const navItems = [
  {
    href: "/berpetuals",
    title: "Berpetuals",
  },
  {
    href: "/portfolio",
    title: "Portfolio",
  },
  {
    href: "/markets",
    title: "Markets",
  },
  {
    href: "/vault",
    title: "Vault",
  },
  {
    href: "/history",
    title: "History",
  },

  {
    href: "#",
    title: "More",
    children: [
      {
        href: homepageUrl,
        title: "Berachain Foundation",
        blurb: "The homepage of the chain",
      },
      {
        href: honeyUrl,
        title: honeyName,
        blurb: "Mint or redeem the stablecoin of the Berachain",
      },
      {
        href: bgtUrl,
        title: bgtName,
        blurb: "The hub for the governance token of Berachain, BGT",
      },
      {
        href: dexUrl,
        title: dexName,
        blurb: "Mint or redeem the stablecoin of the Berachain",
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
