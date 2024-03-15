import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { truncateHash } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { ApyTooltip, TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import {
  getPoolAddLiquidityUrl,
  getPoolWithdrawUrl,
  type PoolV2,
} from "../pools/fetchPools";

export default function PoolHeader({ pool }: { pool: PoolV2 }) {
  const params = useSearchParams();

  const isMyPool = params.get("back") && params.get("back") === "my-pools";

  return (
    <div className="flex w-full flex-col items-center justify-between md:items-end md:justify-center lg:flex-row">
      <div className="flex w-full flex-col items-center gap-4 md:items-start">
        <Link
          href={isMyPool ? "/pools?pool=userPools" : "/pools"}
          target="_self"
        >
          <Button
            variant={"ghost"}
            size="sm"
            className="flex items-center gap-1"
          >
            <Icons.arrowLeft className="h-4 w-4" />
            <div className="text-sm font-medium">
              {" "}
              {isMyPool ? "My Pools" : "All Pools"}
            </div>
          </Button>
        </Link>
        <span className="flex w-full justify-center gap-4 text-center text-2xl font-semibold md:justify-start md:text-left">
          <TokenIconList tokenList={pool?.tokens ?? []} size="xl" />
          {pool?.poolName}
        </span>
        <div className="flex w-full flex-row items-center justify-center gap-4 leading-7 text-muted-foreground md:justify-start">
          <div className="flex w-fit items-center gap-1">
            APY
            <ApyTooltip className="w-3" />:
            <span className="text-sm text-success-foreground">
              {/* {pool?.totalApy?.toFixed(2)}% */}
              0%
            </span>
          </div>
          <div className="flex w-fit items-center gap-1">
            BGT Rewards:
            <span className="text-sm text-warning-foreground">
              {/* {pool?.bgtApy?.toFixed(2)}% */}
              0%
            </span>
          </div>
          <div className="flex w-fit items-center gap-1">
            Fee:
            <span className="text-sm text-success-foreground">
              {pool.feeRate.toFixed(2)}%
            </span>
          </div>

          {
            <div className="hidden w-fit items-center gap-1 sm:flex">
              {" "}
              Pool Contract:
              <span
                className="cursor-pointer px-1 text-sm text-foreground hover:underline"
                onClick={() =>
                  window.open(
                    `${blockExplorerUrl}/address/${pool?.shareAddress}`,
                  )
                }
              >
                {truncateHash(pool?.shareAddress ?? "")}
                <Icons.externalLink className="-mt-1 ml-1 inline-block h-4 w-4 text-muted-foreground" />
              </span>
            </div>
          }
        </div>
      </div>
      {
        <div className="flex w-fit items-center gap-1 sm:hidden ">
          <span
            className="cursor-pointer px-1 text-sm text-foreground hover:underline"
            onClick={() =>
              window.open(`${blockExplorerUrl}/address/${pool?.shareAddress}`)
            }
          >
            {truncateHash(pool?.shareAddress ?? "")}
            <Icons.externalLink className="-mt-1 ml-1 inline-block h-4 w-4 text-muted-foreground" />
          </span>
        </div>
      }
      <div className="mt-4 flex gap-2 md:mt-0">
        <Link href={getPoolAddLiquidityUrl(pool)} target="_self">
          <Button variant={"outline"}>
            <Icons.add />
            <span className="ml-1">Add</span>
          </Button>
        </Link>
        <Link href={getPoolWithdrawUrl(pool)} target="_self">
          <Button variant={"outline"}>
            <Icons.subtract />
            <span className="ml-1">Withdraw</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
