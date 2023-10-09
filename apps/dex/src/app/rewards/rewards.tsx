"use client";

import { type Pool } from "@bera/bera-router";
import { useBeraJs, usePollUserDepositedPools } from "@bera/berajs";
import { ConnectWalletBear, NotFoundBear } from "@bera/shared-ui";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import Loading from "./loading-component";
import { Banner } from "./reward-banner";
import RewardsCard from "./rewards-card";

export const Rewards = () => {
  const { useUserBgtDepositedPools, isLoading } = usePollUserDepositedPools(
    `${getAbsoluteUrl()}/pool/api`,
  );
  const userPools = useUserBgtDepositedPools();
  const { isReady } = useBeraJs();

  return (
    <div className="container max-w-[980px]">
      <Banner /> <br />
      <div className="flex flex-col gap-3">
        {/* {!isReady ? (
          <ConnectWalletBear message="You need to connect your wallet to see rewards on deposited pools" />
        ) : isLoading ? (
          <Loading /> 
        ) : !userPools || userPools.length === 0 ? (
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
        )} */}

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
