import {
  bgtName,
  bgtUrl,
  blockExplorerName,
  blockExplorerUrl,
  dexName,
  dexUrl,
  faucetName,
  faucetUrl,
  homepageName,
  homepageUrl,
  honeyName,
  honeyUrl,
  lendName,
  lendUrl,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";

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
    href: "/leaderboard",
    title: "Leaderboard",
  },
  {
    href: "/referrals",
    title: "Referrals",
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
        icon: <Icons.bgtFav className="h-10 w-10" />,
      },
      {
        href: dexUrl,
        type: "external",
        title: dexName,
        blurb: "Swap tokens and provide liquidity",
        icon: <Icons.bexFav className="h-10 w-10" />,
      },
      {
        href: honeyUrl,
        type: "external",
        title: honeyName,
        blurb: "Mint or redeem Berachain’s native stablecoin",
        icon: <Icons.honeyFav className="h-10 w-10" />,
      },
      {
        href: lendUrl,
        type: "external",
        title: lendName,
        blurb: "Supply assets and borrow honey",
        icon: <Icons.bendFav className="h-10 w-10" />,
      },
      // {
      //   href: perpsUrl,
      //   type: "external",
      //   title: perpsName,
      //   blurb: "Trade your favourite pairs",
      //   icon: <Icons.berpsFav className="h-10 w-10" />,
      // },
      {
        href: blockExplorerUrl,
        type: "external",
        title: blockExplorerName,
        blurb: "Berachain's block explorer",
        icon: <Icons.berascanFav className="h-10 w-10" />,
      },
      {
        href: homepageUrl,
        type: "external",
        title: homepageName,
        blurb: "Explore Berachain and learn more about our vision",
        icon: <Icons.foundationFav className="h-10 w-10" />,
      },
      {
        href: faucetUrl,
        type: "external",
        title: faucetName,
        blurb: "Fund your testnet wallet with BERA tokens",
        icon: <Icons.faucetFav className="h-10 w-10" />,
      },
    ],
  },
];
