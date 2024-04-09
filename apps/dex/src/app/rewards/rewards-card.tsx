import { useEffect, useState } from "react";
import Link from "next/link";
import { ApyTooltip, FormattedNumber, TokenIconList } from "@bera/shared-ui";

import { RewardBtn } from "~/app/components/reward-btn";
import { type IUserPool } from "~/hooks/usePollUserDeposited";
import { getPoolUrl } from "../pools/fetchPools";

export default function RewardsCard({ pool }: { pool: IUserPool }) {
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

  const title = pool.poolName ?? "";

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4 md:p-6 lg:flex-row">
      <div className="flex w-full flex-row gap-3">
        <TokenIconList tokenList={pool.tokens} />
        <Link
          href={getPoolUrl(pool)}
          className="whitespace-nowrap text-xs font-medium leading-tight hover:underline md:text-sm"
        >
          {mobile && title.length > 19 ? `${title.slice(0, 19)}...` : title}
        </Link>
      </div>

      <div className="flex w-full flex-col justify-between gap-4 sm:flex-row md:justify-between">
        <div className="flex min-w-[65px] flex-col-reverse gap-1 md:flex-col">
          <div className=" text-left text-sm font-semibold leading-tight md:text-lg md:leading-7">
            {/* {isMyPoolsLoading ? (
              <Skeleton className="h-[32px] w-[150px]" />
            ) : (
              formatUsd(0)
            )} */}
            <FormattedNumber
              value={pool.userPosition?.estimatedHoneyValue ?? 0}
              symbol="USD"
            />
          </div>
          <div className="text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
            My TVL
          </div>
        </div>

        <div className="flex min-w-[65px] flex-col-reverse gap-1  md:flex-col">
          <div className=" text-left text-sm font-semibold leading-tight md:text-lg md:leading-7">
            {/* {(pool.bgtApy ?? 0) > 100000
              ? formatter.format(pool.bgtApy ?? 0)
              : (pool.bgtApy ?? 0).toFixed(2)} */}
            0 %
          </div>
          <div className="flex flex-row items-center gap-1 text-left text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
            Est. APY <ApyTooltip />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex min-w-[65px] flex-col flex-col-reverse  gap-1 md:flex-col">
            <div className=" text-left text-sm font-semibold leading-tight md:text-lg md:leading-7">
              {/* {isSmall ? `< ${formattedBgt}` : `${formattedBgt.toFixed(2)}`} */}
              0
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
