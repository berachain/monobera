import Link from "next/link";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { truncateHash } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { ApyTooltip, TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

export default function PoolHeader({ pool }: { pool: Pool | undefined }) {
  return (
    <div className="flex w-full flex-col items-center justify-between md:items-end md:justify-center lg:flex-row">
      <div className="flex w-full flex-col items-center gap-4 md:items-start">
        <Link href={"/pool"} target="_self">
          <Button
            variant={"ghost"}
            size="sm"
            className="flex items-center gap-1"
          >
            <Icons.arrowLeft className="h-4 w-4" />
            <div className="text-sm font-medium"> All Pools</div>
          </Button>
        </Link>
        <p className="flex w-full justify-center gap-4 text-center text-2xl font-semibold md:justify-start md:text-left">
          <TokenIconList
            tokenList={pool?.tokens?.map((t) => t.address) ?? []}
            size="xl"
          />
          {pool?.poolName}
        </p>
        <div className="flex w-full flex-row items-center justify-center gap-4 leading-7 text-muted-foreground md:justify-start">
          <div className="flex w-fit items-center gap-1">
            APY
            <ApyTooltip className="w-3" />:
            <span className="text-sm text-success-foreground">
              {pool?.totalApy?.toFixed(2)}%
            </span>
          </div>
          <div className="flex w-fit items-center gap-1">
            BGT Rewards:
            <span className="text-sm text-warning-foreground">
              {pool?.bgtApy?.toFixed(2)}%
            </span>
          </div>
          <div className="flex w-fit items-center gap-1">
            Fee:
            <span className="text-sm text-success-foreground">
              {(
                Number(formatUnits(BigInt(pool?.swapFee ?? 0) ?? "", 18)) * 100
              ).toFixed(2)}
              %
            </span>
          </div>

          <div className="hidden w-fit items-center gap-1 sm:flex">
            {" "}
            Pool Contract:
            <span
              className="cursor-pointer px-1 text-sm text-foreground hover:underline"
              onClick={() =>
                window.open(
                  `${blockExplorerUrl}/address/${pool?.poolShareDenomHex}`,
                )
              }
            >
              {truncateHash(pool?.pool ?? "")}
              <Icons.externalLink className="-mt-1 ml-1 inline-block h-4 w-4 text-muted-foreground" />
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-fit items-center gap-1 sm:hidden ">
        {" "}
        Pool Contract:
        <span
          className="cursor-pointer px-1 text-sm text-foreground hover:underline"
          onClick={() =>
            window.open(
              `${blockExplorerUrl}/address/${pool?.poolShareDenomHex}`,
            )
          }
        >
          {truncateHash(pool?.pool ?? "")}
          <Icons.externalLink className="-mt-1 ml-1 inline-block h-4 w-4 text-muted-foreground" />
        </span>
      </div>
      <div className="mt-4 flex gap-2 md:mt-0">
        <Button
          variant={"outline"}
          onClick={() =>
            window.open(`/pool/${pool?.pool}/add-liquidity`, "_self")
          }
        >
          <Icons.add />
          <span className="ml-1">Add</span>
        </Button>
        <Button
          variant={"outline"}
          onClick={() => window.open(`/pool/${pool?.pool}/withdraw`, "_self")}
        >
          <Icons.subtract />
          <span className="ml-1">Withdraw</span>
        </Button>
      </div>
    </div>
  );
}
