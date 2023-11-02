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
  perpsName,
  perpsUrl,
  rewardsAddress,
  stakingAddress,
} from "@bera/config";
import { type Chain } from "wagmi";

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
    href: "/rewards",
    title: "Rewards",
  },
  {
    href: "#",
    title: "Explore",
    children: [
      {
        href: bgtUrl,
        type: "external",
        title: bgtName,
        blurb: "The hub for BGT governance and bribes on Berachain",
      },
      // {
      //   href: dexUrl,
      //   type: "external",
      //   title: dexName,
      //   blurb: "Swap tokens and provide liquidity to earn BGT rewards",
      // },
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
      {
        href: perpsUrl,
        type: "external",
        title: perpsName,
        blurb:
          "Trade all your favourite pairs with deep liquidity and market diversity",
      },
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
