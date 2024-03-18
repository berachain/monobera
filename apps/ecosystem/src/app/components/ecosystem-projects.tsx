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
  honeyName,
  honeyUrl,
  lendName,
  lendUrl,
  perpsName,
  perpsUrl,
} from "@bera/config";
import { SearchInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

const ITEMS_PER_PAGE = 6;

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
    ecosystemType: "Defi",
  },
  {
    icon: <Icons.honeyFav className="h-[52px] w-[52px]" />,
    name: honeyName,
    subtitle: "Berachain’s Native Stablecoin",
    description:
      "A stablecoin that's integral to the Berachain ecosystem. Utilize HONEY for seamless trading, ensuring value consistency.",
    goto: honeyUrl,
    ecosystemType: "Gaming",
  },
  {
    icon: <Icons.bendFav className="h-[52px] w-[52px]" />,
    name: lendName,
    subtitle: "Supply Assets & Borrow HONEY",
    description:
      "Supply assets and unlock the potential to borrow HONEY. Earn BGT rewards while you supply and borrow.",
    goto: lendUrl,
    ecosystemType: "Defi",
  },
  {
    icon: <Icons.berpsFav className="h-[52px] w-[52px]" />,
    name: perpsName,
    subtitle: "Trade Your Favourite Pairs",
    description:
      "Experience the thrill of high leverage trading, tailored for both novices and seasoned traders. With an impressive 100x leverage.",
    goto: perpsUrl,
    ecosystemType: "SocialFi",
  },
  {
    icon: <Icons.bgtFav className="h-[52px] w-[52px]" />,
    name: bgtName,
    subtitle: "The Hub for BGT Governance",
    description:
      "Engage directly in the governance of BGT, leverage BGT Station for innovative bribe mechanisms, enhancing participation.",
    goto: bgtUrl,
    ecosystemType: "Infrastructure & Tooling",
  },
  {
    icon: <Icons.berascanFav className="h-[52px] w-[52px]" />,
    name: blockExplorerName,
    subtitle: "Berachain's block explorer",
    description:
      "A complete guide to the Berachain Network. View all transactions and get detailed blockchain info with ease.",
    goto: blockExplorerUrl,
    ecosystemType: "Infrastructure & Tooling",
  },
  {
    icon: <Icons.XOctagon className="h-[52px] w-[52px]" />,
    name: perpsName,
    subtitle: "Trade Your Favourite Pairs",
    description:
      "Experience the thrill of high leverage trading, tailored for both novices and seasoned traders. With an impressive 100x leverage.",
    goto: perpsUrl,
    ecosystemType: "SocialFi",
  },
  {
    icon: <Icons.bee className="h-[52px] w-[52px]" />,
    name: bgtName,
    subtitle: "The Hub for BGT Governance",
    description:
      "Engage directly in the governance of BGT, leverage BGT Station for innovative bribe mechanisms, enhancing participation.",
    goto: bgtUrl,
    ecosystemType: "Infrastructure & Tooling",
  },
  {
    icon: <Icons.berascanFav className="h-[52px] w-[52px]" />,
    name: blockExplorerName,
    subtitle: "Berachain's block explorer",
    description:
      "A complete guide to the Berachain Network. View all transactions and get detailed blockchain info with ease.",
    goto: blockExplorerUrl,
    ecosystemType: "Infrastructure & Tooling",
  },
];

export default function EcosystemProjects() {
  const [keywords, setKeywords] = useState<string | null>(null);
  const [ecosystemType, setEcosystemType] = React.useState<string>("All");
  const [visibleProjects, setVisibleProjects] = React.useState(ITEMS_PER_PAGE);
  const [viewMore, setViewMore] = React.useState(true);

  const toggleDisplay = () => {
    if (viewMore) {
      setVisibleProjects(projectList.length);
    } else {
      setVisibleProjects(ITEMS_PER_PAGE);
    }
    setViewMore(!viewMore);
  };

  const filteredProjectList = useMemo(() => {
    return projectList.filter((project) => {
      const matchesKeywords =
        !keywords ||
        project.name.toLowerCase().includes(keywords.toLowerCase());
      const matchesEcosystemType =
        ecosystemType === "All" || project.ecosystemType === ecosystemType;
      return matchesKeywords && matchesEcosystemType;
    });
  }, [keywords, ecosystemType]);

  return (
    <div
      id="dapps"
      className="flex w-full flex-col items-center justify-center gap-6 px-4 text-center xl:w-[1280px]"
    >
      <SearchInput
        className="h-[40px] w-full rounded-md border border-solid bg-background"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeywords(e.target.value)
        }
      />

      <div className="flex w-full flex-row flex-wrap items-center sm:justify-between">
        {ecosystemTypeTabs.map((type) => (
          <Button
            onClick={() => setEcosystemType(type.value)}
            key={type.value}
            variant={type.value === ecosystemType ? "secondary" : "ghost"}
            className="flex min-w-[50px] items-center justify-center"
          >
            <div className="text-sm font-normal text-muted-foreground">
              {type.value}
            </div>
          </Button>
        ))}
      </div>

      <div className="my-2 w-full border border-solid" />

      <div className="mx-auto grid w-fit grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProjectList
          .slice(0, visibleProjects)
          .map((project: any, index: number) => (
            <div
              key={index}
              className="mx-auto flex w-full flex-col justify-between rounded-md border border-solid bg-background p-6 hover:bg-muted sm:h-[296px] sm:w-[260px]"
            >
              <div className="flex flex-col items-center gap-4">
                {project.icon}
                <div>
                  <div className="font-semibold">{project.name}</div>
                </div>
                <div className="flex-grow text-center text-sm leading-5 text-muted-foreground">
                  {project.description}
                </div>
              </div>
              <Link href={project.goto}>
                <div className="flex justify-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:rounded-lg hover:bg-white">
                  Visit Project <Icons.arrowRight />
                </div>
              </Link>
            </div>
          ))}
      </div>
      {filteredProjectList.length > ITEMS_PER_PAGE && (
        <Button
          variant="outline"
          className="z-10 m-8 mt-12 h-[44px] w-[144px] p-4"
          onClick={toggleDisplay}
        >
          {viewMore ? "View More" : "View Less"}
        </Button>
      )}
    </div>
  );
}
