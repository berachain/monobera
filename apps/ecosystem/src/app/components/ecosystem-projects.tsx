"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SearchInput } from "@bera/shared-ui";
import { Avatar, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { useProjects } from "../hooks/useProjects";

const ITEMS_PER_PAGE = 12;

// TODO: add in other properties like ids
const ecosystemTypeTabs = [
  {
    value: "All",
  },
  {
    value: "Native",
  },
  {
    value: "DeFi",
  },
  {
    value: "RWA",
  },
  {
    value: "Bridge",
  },
  {
    value: "Oracle",
  },
  {
    value: "Custody",
  },
  {
    value: "Acct Abstraction",
  },
  {
    value: "Security",
  },
  {
    value: "Ramps/Payments",
  },
  {
    value: "Wallets",
  },
  {
    value: "GameFi",
  },
  {
    value: "SocialFi",
  },
  {
    value: "NFTfi",
  },
  {
    value: "BetFi",
  },
  {
    value: "Dev Exp",
  },
  {
    value: "Dao",
  },
  {
    value: "Other",
  },
  {
    value: "Stable Coin",
  },
];

export interface EcosystemProject {
  icon: string;
  name: string;
  subtitle: string;
  description: string;
  goto: string;
  twitter: string;
  ecosystemType1: string;
  ecosystemType2: string;
}

export default function EcosystemProjects() {
  const [keywords, setKeywords] = useState<string | null>(null);
  const [ecosystemType, setEcosystemType] = React.useState<string>("All");
  const [visibleProjects, setVisibleProjects] = React.useState<
    number | undefined
  >(ITEMS_PER_PAGE);
  const [viewMore, setViewMore] = React.useState(true);

  const { projects: projectList, isLoading } = useProjects();

  const filteredProjectList = projectList?.filter((project: any) => {
    const matchesKeywords =
      !keywords ||
      project.name.toLowerCase().includes(keywords.toLowerCase()) ||
      project.description.toLowerCase().includes(keywords.toLowerCase()) ||
      project.ecosystemType1.toLowerCase().includes(keywords.toLowerCase()) ||
      project.ecosystemType2.toLowerCase().includes(keywords.toLowerCase());
    const matchesEcosystemType =
      ecosystemType === "All" ||
      project.ecosystemType1 === ecosystemType ||
      project.ecosystemType2 === ecosystemType;
    return matchesKeywords && matchesEcosystemType;
  });

  const toggleDisplay = () => {
    if (viewMore) {
      setVisibleProjects(projectList?.length);
    } else {
      setVisibleProjects(ITEMS_PER_PAGE);
    }
    setViewMore(!viewMore);
  };

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

      <div className="flex w-full flex-row flex-wrap items-center">
        {ecosystemTypeTabs.map((type) => (
          <Button
            onClick={() => setEcosystemType(type.value)}
            key={type.value}
            variant={type.value === ecosystemType ? "secondary" : "ghost"}
            className="flex min-w-[50px] items-center justify-center border-none"
          >
            <div className="text-sm font-normal text-muted-foreground">
              {type.value}
            </div>
          </Button>
        ))}
      </div>

      <div className="my-2 w-full border border-solid" />
      {isLoading && (
        <div className="flex w-full flex-row items-center justify-between gap-8">
          <Skeleton className="sm:h-[296px] sm:w-[260px]" />
          <Skeleton className="sm:h-[296px] sm:w-[260px]" />
          <Skeleton className="sm:h-[296px] sm:w-[260px]" />
          <Skeleton className="sm:h-[296px] sm:w-[260px]" />
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(filteredProjectList as EcosystemProject[])?.length === 0 ? (
          <div className="mx-auto flex h-64 w-full items-center justify-center sm:h-[296px] sm:w-[260px]">
            No project found in this category
          </div>
        ) : (
          (filteredProjectList as EcosystemProject[])
            ?.slice(0, visibleProjects)
            .map((project: EcosystemProject, index: number) => (
              <Link href={`/project/${project.name}`}>
                <div
                  key={index}
                  className="flip-card perspective mx-auto flex h-64 w-full flex-col justify-between sm:h-[296px] sm:w-[260px]"
                >
                  <div className="flip-card-inner transform-style relative w-full rounded-md border border-solid bg-background transition-transform duration-700 ease-in-out hover:bg-muted">
                    <div className="flip-card-front flex flex-col items-center justify-center">
                      <Avatar className="h-[96px] w-[96px]">
                        <AvatarImage
                          src={
                            project.icon?.endsWith(".svg")
                              ? "https://artio-static-asset-public.s3.ap-southeast-1.amazonaws.com/assets/bera.png"
                              : project.icon
                          }
                          className="rounded-full"
                        />
                      </Avatar>

                      <div className="pt-4">
                        <div className="text-lg font-semibold">
                          {project.name}
                        </div>

                        {/* Show 2 types */}
                        <div className="items center flex flex-wrap justify-center gap-2 pt-4 text-foreground">
                          <Button variant="secondary" className="text-xs">
                            {project.ecosystemType1}
                          </Button>
                          {project.ecosystemType2 && (
                            <Button variant="secondary" className="text-xs">
                              {project.ecosystemType2}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flip-card-back flex flex-col items-center justify-center">
                      <div className="text-lg font-semibold">
                        {project.name}
                      </div>

                      <div
                        className="flex p-6 text-center text-sm leading-5 text-foreground"
                        style={{ maxHeight: "120px", overflowY: "auto" }}
                      >
                        {project.description}
                      </div>

                      <div className="flex items-center justify-center gap-2 pt-4">
                        {project.goto && (
                          <Link href={project.goto}>
                            <Icons.externalLink />
                          </Link>
                        )}
                        <Link
                          href={
                            project.twitter ? project.twitter : project.goto
                          }
                        >
                          <Icons.twitter />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
        )}
      </div>
      {(filteredProjectList?.length ?? 0) > ITEMS_PER_PAGE && (
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
