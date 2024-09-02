import {
  blockExplorerName,
  blockExplorerUrl,
  faucetName,
  faucetUrl,
  homepageName,
  homepageUrl,
  honeyName,
  honeyUrl,
  perpsName,
  perpsUrl,
  hubName,
  hubUrl,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";

export const navItems = [
  {
    href: "/dashboard",
    title: "Dashboard",
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
