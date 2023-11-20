"use client";

import {
  bgtName,
  bgtUrl,
  blockExplorerName,
  blockExplorerUrl,
  dexName,
  dexUrl,
  docsUrl,
  honeyName,
  honeyUrl,
  lendName,
  lendUrl,
  perpsName,
  perpsUrl,
} from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export const Explore = () => {
  return (
    <div className="mt-20 flex flex-col gap-6 text-center">
      <div className="leading-12 text-5xl font-bold text-background">
        Explore Berachain
      </div>
      <div className="text-centertext-lg mb-2 font-semibold leading-7 text-background">
        Utilize our Defi primitives
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10 xl:grid-cols-3 xl:gap-20">
        {favList.map((fav, index) => (
          <div
            key={index}
            className="mx-auto flex w-[360px] flex-col items-center gap-4 rounded-xl bg-background p-6"
          >
            {fav.icon}
            <div>
              <div className="text-3xl font-semibold leading-9">{fav.name}</div>
              <div className="font-medium ">{fav.subtitle}</div>
            </div>
            <div className="text-center text-sm leading-5 text-muted-foreground">
              {fav.description}
            </div>
            <div className="flex w-full justify-between gap-2">
              <Button onClick={() => window.open(fav.goto)}>
                Go To App <Icons.arrowRight />
              </Button>

              <Button
                variant={"outline"}
                disabled={!fav.learnMore}
                onClick={() => window.open(fav.learnMore)}
              >
                Learn More <Icons.arrowRight />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
const favList = [
  {
    icon: <Icons.bexFav className="h-[52px] w-[52px]" />,
    name: dexName,
    subtitle: "Berachain’s Dex",
    description:
      "Swap a variety of tokens effortlessly on our decentralized platform. Provide liquidity to pools and earn BGT rewards.",
    goto: dexUrl,
    learnMore: `${docsUrl}/learn/dex`,
  },
  {
    icon: <Icons.honeyFav className="h-[52px] w-[52px]" />,
    name: honeyName,
    subtitle: "Berachain’s Native Stable Coin",
    description:
      "A stable coin that's integral to the Berachain ecosystem. Utilize HONEY for seamless trading, ensuring value consistency.",
    goto: honeyUrl,
    learnMore: `${docsUrl}/learn/protocol/honey-stablecoin`,
  },
  {
    icon: <Icons.bendFav className="h-[52px] w-[52px]" />,
    name: lendName,
    subtitle: "Supply Assets & Borrow HONEY",
    description:
      "Supply assets and unlock the potential to borrow HONEY. Earn BGT rewards while you supply and borrow.",
    goto: lendUrl,
  },
  {
    icon: <Icons.berpsFav className="h-[52px] w-[52px]" />,
    name: perpsName,
    subtitle: "Trade Your Favourite Pairs",
    description:
      "Experience the thrill of high leverage trading, tailored for both novices and seasoned traders. With an impressive 100x leverage.",
    goto: perpsUrl,
  },
  {
    icon: <Icons.berascanFav className="h-[52px] w-[52px]" />,
    name: blockExplorerName,
    subtitle: "Supply Assets & Borrow HONEY",
    description:
      "A complete guide to the Berachain Network. View all transactions and get detailed blockchain info with ease.",
    goto: blockExplorerUrl,
    learnMore: `${docsUrl}/developers/berascan-block-explorer`,
  },
  {
    icon: <Icons.bgtFav className="h-[52px] w-[52px]" />,
    name: bgtName,
    subtitle: "The Hub for BGT Governance",
    description:
      "Engage directly in the governance of BGT, leverage BGT Station for innovative bribe mechanisms, enhancing participation.",
    goto: bgtUrl,
    learnMore: `${docsUrl}/learn/protocol/bgt-station`,
  },
];
