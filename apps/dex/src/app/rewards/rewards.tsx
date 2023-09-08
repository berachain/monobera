"use client";

import { type Pool } from "@bera/bera-router";
import { usePollUserDepositedPools } from "@bera/berajs";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { Banner } from "./reward-banner";
import RewardsCard from "./rewards-card";

// TODO: loading state and empty state

export const Rewards = () => {
  const { useUserBgtDepositedPools, isLoading } = usePollUserDepositedPools(
    `${getAbsoluteUrl()}/pool/api`,
  );
  const userPools = useUserBgtDepositedPools();

  return (
    <div className="container max-w-[980px]">
      <Banner /> <br />
      <div className="flex flex-col gap-3">
        {!isLoading &&
          userPools?.map((pool: Pool) => (
            <RewardsCard pool={pool} key={pool.pool} />
          ))}
        {!isLoading && userPools === undefined && (
          <>Not Deposited to any pools with BGT Rewards</>
        )}
        {isLoading && <>Loading...</>}
      </div>
    </div>
  );
};
