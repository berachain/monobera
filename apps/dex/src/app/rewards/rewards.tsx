"use client";

import { type Pool } from "@bera/bera-router";
import { useBeraJs, usePollUserPendingBgtRewards } from "@bera/berajs";
import { ConnectWalletBear, NotFoundBear } from "@bera/shared-ui";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import Loading from "./loading-component";
import { Banner } from "./reward-banner";
import RewardsCard from "./rewards-card";

export const Rewards = () => {
  const { usePoolsPendingBgtRewards, isLoading } = usePollUserPendingBgtRewards(
    `${getAbsoluteUrl()}/api/getPools/api`,
  );
  const userPools = usePoolsPendingBgtRewards();
  const { isReady } = useBeraJs();
  return (
    <div>
      <Banner />
      <br />
      <div className="flex flex-col gap-3">
        {isLoading ? (
          <Loading />
        ) : isReady ? (
          !userPools || userPools.length === 0 ? (
            <NotFoundBear
              title="You have no rewards"
              subtitle="Only BGT boosted pools are eligible for rewards"
              actionTitle="View Pools with BGT Rewards"
              actionLink="/pool"
            />
          ) : (
            <>
              {userPools?.map((pool: Pool) => (
                <RewardsCard pool={pool} key={pool.pool} />
              ))}
            </>
          )
        ) : (
          <ConnectWalletBear message="You need to connect your wallet to see rewards on deposited pools" />
        )}
      </div>
    </div>
  );
};
