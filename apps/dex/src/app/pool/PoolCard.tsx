import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router";
import { formatAmountBig, formatUsd } from "@bera/berajs";
import { TokenIconList } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { TagList } from "~/components/tag-list";

export const PoolCard = ({ pool }: { pool: Pool | undefined }) => {
  const router = useRouter();
  return (
    <div
      key={pool?.pool}
      className="col-span-1 flex w-full max-w-[275px] flex-col justify-end gap-9 rounded-xl border border-border bg-background px-6 py-8"
    >
      <div>
        <div className="flex items-center justify-center gap-2">
          <TagList tagList={pool?.tags ?? []} />
          <div className="mb-2 line-clamp-2 flex h-12 w-full overflow-hidden text-left text-sm">
            {pool?.poolName}
          </div>
        </div>
        <TokenIconList
          tokenList={pool?.tokens?.map((t) => t.address) ?? []}
          size="lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-border bg-muted px-4 py-2">
          <div className="text-left text-xs font-medium text-muted-foreground">
            APR
          </div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-medium">
            {(pool?.totalApy ?? 0).toFixed(2)}%
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-muted px-4 py-2">
          <div className="text-left text-xs font-medium text-muted-foreground">
            TVL
          </div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-medium">
            ${formatAmountBig(pool?.totalValue ?? "0")}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-muted px-4 py-2">
          <div className="text-left text-xs font-medium text-muted-foreground">
            24H Volume
          </div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-medium">
            {formatUsd(pool?.dailyVolume ?? "0")}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-muted px-4 py-2">
          <div className="text-left text-xs font-medium text-muted-foreground">
            Fees (24H)
          </div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-medium">
            {" "}
            {pool?.dailyVolume && Number(pool?.dailyVolume) !== 0
              ? formatUsd(pool?.fees ?? "0")
              : "$0"}
          </div>
        </div>
      </div>

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
          View Pools
        </Button>
      </div>
    </div>
  );
};

export const PoolCardLoading = () => {
  return (
    <div className="col-span-1 flex w-full max-w-[275px] flex-col gap-8 rounded-xl bg-border p-8">
      <div className="flex gap-2">
        <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-8 w-full" />
      <div className="grid grid-cols-2 gap-2">
        {[0, 0, 0, 0].map((_, index) => (
          <Skeleton className="h-16 w-full" key={index} />
        ))}
      </div>

      <div className="flex h-8 gap-2">
        <Skeleton className="h-full w-8 flex-shrink-0" />
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};
