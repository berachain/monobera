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
  const poolName = pool?.poolName ?? "";
  const dataList = [
    { title: "TVL", amount: `$${formatAmountBig(pool?.totalValue ?? "0")}` },
    { title: "Volume (24H)", amount: formatUsd(pool?.dailyVolume ?? "0") },
    {
      title: "Fees (24H)",
      amount:
        pool?.dailyVolume && Number(pool?.dailyVolume) !== 0
          ? formatUsd(pool?.fees ?? "0")
          : "$0",
    },
    {
      title: "vAPY",
      amount: (pool?.totalApy ?? 0).toFixed(2) + "%",
    },
  ];
  return (
    <div
      key={pool?.pool}
      className="col-span-1 flex w-full max-w-[275px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-background"
    >
      <div className="flex flex-col items-center justify-center gap-1 p-6 pb-4">
        <TokenIconList
          tokenList={pool?.tokens?.map((t: any) => t.address) ?? []}
          size="lg"
        />
        <div className="flex h-12 w-full items-center justify-center text-sm font-medium text-muted-foreground">
          {poolName.length > 60 ? `${poolName.slice(0, 60)}...` : poolName}
        </div>
        <div className="flex h-7 gap-2 text-center text-xl font-semibold whitespace-nowrap flex-shrink-0">
          {(pool?.totalApy ?? 0).toFixed(2)}% APY{" "}
          <TagList tagList={pool?.tags ?? []} className="inline-flex" />
        </div>
      </div>

      <div className="flex flex-col gap-1 bg-muted px-6 py-3">
        {dataList.map((data, index) => (
          <div key={index} className=" flex justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              {data.title}
            </div>
            <div className="text-sm font-medium">{data.amount}</div>
          </div>
        ))}
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
