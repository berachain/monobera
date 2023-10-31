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
  faucetName,
  faucetUrl,
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
        href: bgtUrl,
        type: "external",
        title: bgtName,
        blurb: "The hub for BGT governance and bribes on Berachain",
      },
      {
        href: dexUrl,
        type: "external",
        title: dexName,
        blurb: "Swap tokens and provide liquidity to earn BGT rewards",
      },
      {
        href: honeyUrl,
        type: "external",
        title: honeyName,
        blurb: "Mint or redeem Honey, the stablecoin of Berachain",
      },
      {
        href: lendUrl,
        type: "external",
        title: lendName,
        blurb:
          "Earn interest and rewards by supplying your assets and borrowing Honey",
      },
      // {
      //   href: perpsUrl,
      //   type: "external",
      //   title: perpsName,
      //   blurb:
      //     "Trade all your favourite pairs with deep liquidity and market diversity",
      // },
      {
        href: blockExplorerUrl,
        type: "external",
        title: blockExplorerName,
        blurb:
          "View all transactions and blockchain information on the Berachain network",
      },
      {
        href: homepageUrl,
        type: "external",
        title: homepageName,
        blurb: "Explore Berachain and learn more about our vision",
      },
      {
        href: faucetUrl,
        type: "external",
        title: faucetName,
        blurb: "Fund your testnet wallet with BERA tokens",
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
