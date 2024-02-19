"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
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
  lendDocsUrl,
  lendName,
  lendUrl,
  perpsDocsUrl,
  perpsName,
  perpsUrl,
} from "@bera/config";
import { SearchInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

// enum EcosystemType {
//   All = 1,
//   Defi = 2,
//   Stablecoins = 3,
//   Validators = 4,
//   Gaming = 5,
//   Metaverse = 6,
//   Data = 7,
//   Infrastructure = 7,
// }

// TODO: add in other properties
const ecosystemTypeTabs = [
  {
    value: "All",
  },
  {
    value: "Defi",
  },
  {
    value: "Bridges",
  },
  {
    value: "Wallets and Onramps",
  },
  {
    value: "CEXs",
  },
  {
    value: "NFTs",
  },
  {
    value: "Gaming",
  },
  {
    value: "SocialFi",
  },
  {
    value: "Infrastructure & Tooling",
  },
];
// TODO: add in other projects
const projectList = [
  {
    icon: <Icons.bexFav className="h-[52px] w-[52px]" />,
    name: dexName,
    subtitle: "Berachain’s Dex",
    description:
      "Swap a variety of tokens effortlessly on our decentralized platform. Provide liquidity to pools and earn BGT rewards.",
    goto: dexUrl,
  },
  {
    icon: <Icons.honeyFav className="h-[52px] w-[52px]" />,
    name: honeyName,
    subtitle: "Berachain’s Native Stablecoin",
    description:
      "A stablecoin that's integral to the Berachain ecosystem. Utilize HONEY for seamless trading, ensuring value consistency.",
    goto: honeyUrl,
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
    icon: <Icons.bgtFav className="h-[52px] w-[52px]" />,
    name: bgtName,
    subtitle: "The Hub for BGT Governance",
    description:
      "Engage directly in the governance of BGT, leverage BGT Station for innovative bribe mechanisms, enhancing participation.",
    goto: bgtUrl,
  },
  {
    icon: <Icons.berascanFav className="h-[52px] w-[52px]" />,
    name: blockExplorerName,
    subtitle: "Berachain's block explorer",
    description:
      "A complete guide to the Berachain Network. View all transactions and get detailed blockchain info with ease.",
    goto: blockExplorerUrl,
  },
];

export default function EcosystemProjects() {
  const [keywords, setKeywords] = useState<string | null>(null);
  const [ecosystemType, setEcosystemType] = React.useState<string>("All");
  const [visibleProjects, setVisibleProjects] = React.useState(4);
  const [viewMore, setViewMore] = React.useState(true);

  const toggleDisplay = () => {
    if (viewMore) {
      setVisibleProjects(projectList.length);
    } else {
      setVisibleProjects(4);
    }
    setViewMore(!viewMore);
  };
  const filteredProjectList: any = useMemo(
    () =>
      projectList?.filter((project: any) => {
        if (!keywords) return true;
        return project.name.toLowerCase().includes(keywords.toLowerCase());
      }),
    [projectList, keywords],
  );
  return (
    <div
      id="dapps"
      className="mt-16 flex flex-col items-center justify-center gap-6 text-center lg:w-[1280px]"
    >
      <SearchInput
        className="h-[40px] w-full rounded-md border border-solid bg-background"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeywords(e.target.value)
        }
      />

      <Tabs defaultValue={"All"} className="hidden w-full sm:block">
        <TabsList className="w-full">
          {ecosystemTypeTabs.map((type) => (
            <TabsTrigger
              value={type.value as any}
              key={type.value}
              className="w-full rounded-sm"
              onClick={() => setEcosystemType(type.value)}
            >
              {type.value}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="my-4 w-full border border-solid" />

      <div className="mx-auto grid w-fit grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {filteredProjectList
          .slice(0, visibleProjects)
          .map((fav: any, index: number) => (
            <div
              key={index}
              className="mx-auto flex w-full max-w-[260px] flex-col items-center justify-center gap-4 rounded-md border border-solid bg-background p-6"
            >
              {fav.icon}
              <div>
                <div className="text-3xl font-semibold leading-9">
                  {fav.name}
                </div>
                <div className="font-medium ">{fav.subtitle}</div>
              </div>
              <div className="text-center text-sm leading-5 text-muted-foreground">
                {fav.description}
              </div>
              <Link href={fav.goto}>
                <div className="flex justify-between gap-2 text-sm text-muted-foreground">
                  Visit Project <Icons.arrowRight />
                </div>
              </Link>
            </div>
          ))}
      </div>
      <Button
        variant="outline"
        className="z-10 m-8 mt-12 h-[44px] w-[144px] p-4"
        onClick={toggleDisplay}
      >
        {viewMore ? "View More" : "View Less"}
      </Button>
    </div>
  );
}
