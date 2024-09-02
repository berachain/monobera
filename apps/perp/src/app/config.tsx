import {
  blockExplorerName,
  blockExplorerUrl,
  faucetName,
  faucetUrl,
  homepageName,
  homepageUrl,
  honeyName,
  honeyUrl,
  hubName,
  hubUrl,
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
  {
    href: "#",
    title: "Explore",
    children: [
      {
        href: hubUrl,
        type: "external",
        title: hubName,
        blurb: "The hub for BGT governance",
        icon: <Icons.hubFav className="h-8 w-8" />,
      },
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
