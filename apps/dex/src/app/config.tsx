import {
  bgtName,
  bgtUrl,
  blockExplorerName,
  blockExplorerUrl,
  faucetName,
  faucetUrl,
  homepageName,
  homepageUrl,
  honeyName,
  honeyUrl,
  lendName,
  lendUrl,
  perpsName,
  perpsUrl,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";

export const navItems = [
  {
    href: "/swap",
    title: "Swap",
  },
  {
    href: "/pools",
    title: "Pool",
  },
  {
    href: "/rewards",
    title: "Rewards",
  },
  // {
  //   href: faucetUrl,
  //   title: "Faucet",
  // },
  {
    href: "#",
    title: "Explore",
    children: [
      {
        href: bgtUrl,
        type: "external",
        title: bgtName,
        blurb: "The hub for BGT governance",
        icon: <Icons.bgtFav className="h-8 w-8" />,
      },
      // {
      //   href: dexUrl,
      //   type: "external",
      //   title: dexName,
      //   blurb: "Swap tokens and provide liquidity",
      //   icon: <Icons.bexFav className="h-8 w-8" />,
      // },
      {
        href: honeyUrl,
        type: "external",
        title: honeyName,
        blurb: "Mint or redeem Berachain’s native stablecoin",
        icon: <Icons.honeyFav className="h-8 w-8" />,
      },
      {
        href: lendUrl,
        type: "external",
        title: lendName,
        blurb: "Supply assets and borrow honey",
        icon: <Icons.bendFav className="h-8 w-8" />,
      },
      {
        href: perpsUrl,
        type: "external",
        title: perpsName,
        blurb: "Trade your favourite pairs",
        icon: <Icons.berpsFav className="h-8 w-8" />,
      },
      {
        href: blockExplorerUrl,
        type: "external",
        title: blockExplorerName,
        blurb: "Berachain's block explorer",
        icon: <Icons.berascanFav className="h-8 w-8" />,
      },
      {
        href: homepageUrl,
        type: "external",
        title: homepageName,
        blurb: "Explore Berachain and learn more about our vision",
        icon: <Icons.foundationFav className="h-8 w-8" />,
      },
      {
        href: faucetUrl,
        type: "external",
        title: faucetName,
        blurb: "Fund your testnet wallet with BERA tokens",
        icon: <Icons.faucetFav className="h-8 w-8" />,
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
    href: "/pools",
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
