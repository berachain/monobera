"use client";

import { Banner } from "./reward-banner";
import RewardsCard from "./rewards-card";
import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { usePollUserDepositedPools } from "@bera/berajs";
import { type Pool } from "@bera/bera-router";
// TODO: loading state and empty state


export const Rewards = () => {
  const { useUserDepositedPools } = usePollUserDepositedPools(
    `${getAbsoluteUrl()}/pool/api`,
  );
  const userPools = useUserDepositedPools();

  console.log(userPools)
  return (
    <div className="container max-w-[980px]">
      <Banner /> <br />
      <div className="flex flex-col gap-3">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 md:flex-row">
          {/* <SearchInput
            placeholder="Search by pool name, address, or token"
            className="md:w-[400px]"
          /> */}
          {/* <Dropdown
            selected={sortBy}
            onSelect={setSortBy}
            selectionList={selection}
            className="block flex-shrink-0"
          /> */}
        </div>
        {userPools?.map((pool: Pool) => (
          <RewardsCard pool={pool} key={pool.pool} />
        ))}
      </div>
    </div>
  );
};
