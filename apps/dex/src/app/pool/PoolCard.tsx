import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router";
import { formatAmountBig, formatUsd, formatter } from "@bera/berajs";
import { TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { TagList } from "~/components/tag-list";
import { usePositionSize } from "~/hooks/usePositionSize";

export const PoolCard = ({
  pool,
  isUserData,
}: {
  pool: Pool | undefined;
  isUserData?: boolean;
}) => {
  const router = useRouter();
  const poolName = pool?.poolName ?? "";
  const { userTotalValue, isPositionSizeLoading } = usePositionSize({
    pool: pool,
  });
  return (
    <div
      key={pool?.pool}
      className="col-span-1 mx-auto flex w-full max-w-[275px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-background"
    >
      <div className="flex flex-col items-center justify-center gap-1 p-6 pb-4">
        <TokenIconList
          tokenList={pool?.tokens?.map((t: any) => t.address) ?? []}
          size="lg"
        />
        <div className="flex h-12 w-full items-center justify-center text-sm text-muted-foreground">
          {poolName.length > 60 ? `${poolName.slice(0, 60)}...` : poolName}
        </div>
        <div className="flex h-7 flex-shrink-0 gap-2 whitespace-nowrap text-center text-xl font-semibold">
          {(pool?.totalApy ?? 0) > 10000
            ? formatter.format(pool?.totalApy ?? 0)
            : (pool?.totalApy ?? 0).toFixed(2)}
          % PRR <TagList tagList={pool?.tags ?? []} className="inline-flex" />
        </div>
      </div>

      <div className="flex flex-col gap-1 bg-muted px-6 py-3">
        {isUserData && (
          <div className=" flex justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              Position Size
            </div>
            <div className="text-sm font-medium">
              {isPositionSizeLoading ? (
                <Skeleton className="h-[32px] w-[150px]" />
              ) : (
                formatUsd(userTotalValue ?? 0)
              )}
            </div>
          </div>
        )}
        <div className=" flex justify-between">
          <div className="text-sm font-medium text-muted-foreground">TVL</div>
          <div className="text-sm font-medium">
            {formatAmountBig(pool?.totalValue ?? "0")}
          </div>
        </div>
        <div className=" flex justify-between">
          <div className="text-sm font-medium text-muted-foreground">
            Volume (24H)
          </div>
          <div className="text-sm font-medium">
            {formatUsd(pool?.dailyVolume ?? "0")}
          </div>
        </div>
        <div className=" flex justify-between">
          <div className="text-sm font-medium text-muted-foreground">
            Fees (24H)
          </div>
          <div className="text-sm font-medium">
            {pool?.dailyVolume && Number(pool?.dailyVolume) !== 0
              ? formatUsd(pool?.fees ?? "0")
              : "$0"}
          </div>
        </div>
      </div>

      <div className="w-full bg-muted p-3">
        <div className="flex gap-1">
          <Button
            className="w-fit py-[10px]"
            onClick={() => router.push(`/pool/${pool?.pool}/add-liquidity`)}
          >
            <Icons.add className="h-6 w-6" />
          </Button>

          <Button
            className="h-11 w-full"
            variant={"secondary"}
            onClick={() => router.push(`/pool/${pool?.pool}`)}
          >
            View Pool
          </Button>
        </div>
      </div>
    </div>
  );
};

export const PoolCardLoading = () => {
  return (
    <div className="col-span-1 flex w-full max-w-[275px] flex-col rounded-xl bg-background">
      <div className="flex flex-col items-center gap-1 px-6 pb-4 pt-6">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-7 w-full" />
      </div>
      <div className="flex flex-col gap-1 bg-muted px-6 py-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="flex w-full gap-1 bg-muted p-3 pt-6 ">
        <Skeleton className="h-[44px] w-14 flex-shrink-0" />
        <Skeleton className="h-[44px] w-full" />
      </div>
    </div>
  );
};
