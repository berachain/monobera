"use client";

import { useBeraJs, useUserPools, type IUserPool } from "@bera/berajs";
import { ConnectWalletBear, NotFoundBear } from "@bera/shared-ui";

import Loading from "./loading-component";
import { Banner } from "./reward-banner";
import RewardsCard from "./rewards-card";

export const Rewards = () => {
  const { isReady } = useBeraJs();
  const { data: userPools, isLoading } = useUserPools();

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
              actionLink="/pools"
            />
          ) : (
            <>
              {userPools
                // ?.filter((userPool: PoolV2) => userPool.bgtApy !== undefined)
                ?.map((pool: IUserPool) => (
                  <RewardsCard pool={pool} key={pool.poolName} />
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
