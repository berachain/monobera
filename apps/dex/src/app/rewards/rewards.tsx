"use client";

import { type Pool } from "@bera/bera-router";
import { useBeraJs, usePollUserDepositedPools } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { Banner } from "./reward-banner";
import RewardsCard from "./rewards-card";

// TODO: loading state and empty state

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
        {!isReady && (
          <ConnectWalletBear message="You need to connect your wallet to see rewards on deposited pools" />
        )}
        {!isLoading &&
          isReady &&
          userPools?.map((pool: Pool) => (
            <RewardsCard pool={pool} key={pool.pool} />
          ))}
        {!isLoading && userPools === undefined && isReady && (
          <>Not Deposited to any pools with BGT Rewards</>
        )}
        {isLoading && !isReady && <>Loading...</>}
      </div>
    </div>
  );
};
