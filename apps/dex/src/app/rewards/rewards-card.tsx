import { useEffect, useState } from "react";
import { type Pool } from "@bera/bera-router";
import { formatUsd } from "@bera/berajs";
import { Button } from "@bera/ui/button";

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

  const title = pool.poolName ?? "";
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border border-border bg-background p-4 md:p-6">
      <div className="flex w-[200px] flex-col gap-3">
        <div className="whitespace-nowrap text-xs font-medium leading-tight md:text-sm">
          {mobile && title.length > 19 ? title.slice(0, 19) + "..." : title}
        </div>
      </div>

      <div className="flex min-w-[65px] flex-col gap-1">
        <div className=" text-right text-sm font-semibold leading-tight md:text-lg md:leading-7">
          {formatUsd(pool.userDeposited ?? 0)}
        </div>
        <div className="text-right text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
          My TVL
        </div>
      </div>

      <div className="flex min-w-[65px] flex-col gap-1">
        <div className=" text-right text-sm font-semibold leading-tight md:text-lg md:leading-7">
          {pool.bgtApy?.toFixed(2) ?? 0}%
        </div>
        <div className="text-right text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
          Est. APY
        </div>
      </div>

      {/* <div className="hidden flex-col gap-1 md:flex">
        <div className="text-lg font-semibold leading-7">$690</div>
        <div className="text-sm font-medium leading-tight text-muted-foreground">
          Fees earned
        </div>
      </div> */}

      <div className="flex items-center gap-4">
        <div className="flex min-w-[65px] flex-col gap-1">
          <div className=" text-right text-sm font-semibold leading-tight text-warning-foreground md:text-lg md:leading-7">
            420.69
          </div>
          <div className="text-right text-xs font-medium leading-tight text-muted-foreground md:text-sm ">
            BGT earned
          </div>
        </div>

        <Button
          variant={"warning"}
          className="px-2 text-sm leading-none md:px-4 md:text-lg md:leading-7"
        >
          Claim
        </Button>
      </div>
    </div>
  );
}
