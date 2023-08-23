"use client";

import { useState } from "react";
import { Dropdown, SearchInput } from "@bera/shared-ui";

import { Banner } from "./reward-banner";
import RewardsCard from "./rewards-card";

const selection = [
  "Highest-TVL",
  "Lowest-TVL",
  "Highest-APY",
  "Lowest-APY",
  "Most-fees-earned",
  "Least-fees-earned",
  "Most-BGT-earned",
  "Least-BGT-earned",
];

export const Rewards = () => {
  const [sortBy, setSortBy] = useState("Most-BGT-earned");
  return (
    <div className="container max-w-[980px]">
      <Banner /> <br />
      <div className="flex flex-col gap-3">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 md:flex-row">
          <SearchInput
            placeholder="Search by pool name, address, or token"
            className="md:w-[400px]"
          />
          <Dropdown
            selected={sortBy}
            onSelect={setSortBy}
            selectionList={selection}
            className="block flex-shrink-0"
          />
        </div>
        {new Array(10).fill(null).map((_, i) => (
          <RewardsCard key={i} />
        ))}
      </div>
    </div>
  );
};
