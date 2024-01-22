import { useEffect, useState } from "react";
import Link from "next/link";
import { type Pool } from "@bera/bera-router";
import {
  formatAmountSmall,
  formatUsd,
  formatter,
  usePollBgtRewards,
} from "@bera/berajs";
import { ApyTooltip, TokenIconList } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { RewardBtn } from "~/app/components/reward-btn";
import { usePositionSize } from "~/hooks/usePositionSize";

export default function RewardsCard({ pool }: { pool: Pool }) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !mobile) {
        setMobile(true);
      } else if (window.innerWidth > 768 && mobile) {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { useBgtReward } = usePollBgtRewards([pool.pool]);
  const { data: bgtRewards } = useBgtReward(pool.pool);
  const title = pool.poolName ?? "";

  const { userTotalValue, isPositionSizeLoading } = usePositionSize({
    pool: pool,
  });

  const { isSmall, numericValue: formattedBgt } = formatAmountSmall(bgtRewards);

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4 md:p-6 lg:flex-row">
      <div className="flex w-full flex-row gap-3">
        <TokenIconList tokenList={pool.tokens.map((t) => t.address)} />
        <Link
          href={`/pool/${pool?.pool}`}
          className="whitespace-nowrap text-xs font-medium leading-tight hover:underline md:text-sm"
        >
          {mobile && title.length > 19 ? title.slice(0, 19) + "..." : title}
        </Link>
      </div>

      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row md:justify-between">
        <div className="flex min-w-[65px] flex-col gap-1">
          <div className=" text-left text-sm font-semibold leading-tight md:text-lg md:leading-7">
            {isPositionSizeLoading ? (
              <Skeleton className="h-[32px] w-[150px]" />
            ) : (
              formatUsd(userTotalValue ?? 0)
            )}
          </div>
          <div className="text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
            My TVL
          </div>
        </div>

        <div className="flex min-w-[65px] flex-col gap-1">
          <div className=" text-left text-sm font-semibold leading-tight md:text-lg md:leading-7">
            {(pool.bgtApy ?? 0) > 100000
              ? formatter.format(pool.bgtApy ?? 0)
              : (pool.bgtApy ?? 0).toFixed(2)}
            %
          </div>
          <div className="flex flex-row items-center gap-1 text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
            Est. APY <ApyTooltip />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex min-w-[65px] flex-col gap-1">
            <div className=" text-left text-sm font-semibold leading-tight text-warning-foreground md:text-lg md:leading-7">
              <p className="text-lg font-semibold text-foreground">
                {isSmall ? `< ${formattedBgt}` : `${formattedBgt.toFixed(2)}`}
              </p>
            </div>
            <div className="text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
              BGT earned
            </div>
          </div>
        </div>
        {/* @ts-ignore */}
        <RewardBtn poolAddress={pool.pool} variant="warning" />
      </div>
    </div>
  );
}
