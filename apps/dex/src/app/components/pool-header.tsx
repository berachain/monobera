import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { truncateHash } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

export default function PoolHeader({ pool }: { pool: Pool }) {
  return (
    <div className="flex w-full items-end justify-between">
      <div className="flex w-full flex-col items-center gap-4 sm:items-start">
        <Button
          variant={"ghost"}
          size="sm"
          className="flex items-center gap-1"
          onClick={() => window.open("/pool", "_self")}
        >
          <Icons.arrowLeft className="h-4 w-4" />
          <div className="text-sm font-medium"> All Pools</div>
        </Button>
        <p className="flex w-full gap-4 text-center text-2xl font-semibold sm:text-left">
          <TokenIconList
            tokenList={pool.tokens.map((t) => t.address)}
            size="xl"
          />
          {pool?.poolName}
        </p>
        <div className="flex w-full flex-row items-center gap-4 leading-7 text-muted-foreground">
          <div className="flex w-fit items-center gap-1">
            PRR:
            <span className="text-sm text-success-foreground">
              {pool?.bgtApy?.toFixed(2)}%
            </span>
          </div>
          <div className="flex w-fit items-center gap-1">
            Fee:
            <span className="text-sm text-success-foreground">
              {(
                Number(formatUnits(BigInt(pool.swapFee) ?? "", 18)) * 100
              ).toFixed(2)}
              %
            </span>
          </div>
          <div className="flex w-fit items-center gap-1">
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
              {truncateHash(pool.pool)}
              <Icons.externalLink className="-mt-1 ml-1 inline-block h-4 w-4 text-muted-foreground" />
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
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
