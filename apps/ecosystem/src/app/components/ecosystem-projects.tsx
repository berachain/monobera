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
import { set } from "date-fns";

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

const ITEMS_PER_PAGE = 6;

export default function EcosystemProjects() {
  const [keywords, setKeywords] = useState<string | null>(null);
  const [ecosystemType, setEcosystemType] = React.useState<string>("All");
  const [page, setPage] = React.useState(1);

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
      className="mt-16 flex flex-col items-center justify-center gap-6 text-center lg:w-[1280px]"
    >
      <SearchInput
        className="h-[40px] w-full rounded-md border border-solid bg-background"
        placeholder="Search..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setKeywords(e.target.value)
        }
      />
      <div className="flex w-full">
        {/* Side Nav Filter */}
        <div className="flex w-60 flex-col border-r border-solid p-4">
          {ecosystemTypeTabs.map((type) => (
            <Button
              key={type.value}
              variant="ghost"
              className="mb-2 rounded-sm px-2 py-1 text-sm hover:bg-muted"
              onClick={() => {
                setEcosystemType(type.value);
                setPage(1);
              }}
            >
              <div className="text-left text-sm font-normal text-muted-foreground">
                {type.value}
              </div>
            </Button>
          ))}
        </div>

        {/* Project List */}
        <div className="flex-grow pl-16">
          <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjectList
              .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
              .map((project: any, index: number) => (
                <div
                  key={index}
                  className="mx-auto flex w-full max-w-[260px] flex-col justify-between gap-4 rounded-md border border-solid bg-background p-6"
                >
                  <div className="flex flex-col items-center gap-4">
                    {project.icon}
                    <div>
                      <div className="text-3xl font-semibold leading-9">
                        {project.name}
                      </div>
                      <div className="font-medium">{project.subtitle}</div>
                    </div>
                    <div className="flex-grow text-center text-sm leading-5 text-muted-foreground">
                      {project.description}
                    </div>
                  </div>
                  <Link href={project.goto}>
                    <div className="flex justify-center gap-2 text-sm text-muted-foreground">
                      Visit Project <Icons.arrowRight />
                    </div>
                  </Link>
                </div>
              ))}
          </div>

          {/* Pagination Footer */}
          <div className="mt-8 flex justify-end">
            <div className="mt-8 flex justify-end">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() =>
                    setPage((currentPage) => Math.max(1, currentPage - 1))
                  }
                  variant="ghost"
                  className="rounded-sm px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                >
                  Previous
                </Button>

                <div className="flex items-center justify-center text-sm text-muted-foreground">
                  {page}
                </div>

                <Button
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  variant="ghost"
                  className="rounded-sm px-4 py-2 text-sm text-muted-foreground hover:bg-muted"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
