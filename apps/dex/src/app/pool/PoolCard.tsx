import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router";
import { formatUsd } from "@bera/berajs";
import { TokenIconList } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

const getBadgeContent = (tag: string) => {
  switch (tag) {
    case "hot":
      return "🔥 Hot Pools";
    case "new":
      return "🚀 New Pools";
    case "bgtRewards":
      return "📈 BGT Rewards";
    default:
      return "hot";
  }
};
export const PoolCard = ({
  pool,
  addLp = false,
}: {
  pool: Pool | undefined;
  addLp?: boolean;
}) => {
  const router = useRouter();
  return (
    <div
      key={pool?.pool}
      className="col-span-1 flex w-full max-w-[275px] flex-col justify-end rounded-xl border border-border bg-background px-6 py-8"
    >
      <div className="flex h-12 flex-row flex-wrap">
        {pool && pool.tags ? (
          pool.tags.map((tag) => {
            return (
              <Badge key={tag} variant={"info"}>
                {getBadgeContent(tag)}
              </Badge>
            );
          })
        ) : (
          <Badge key={"pool"} variant={"info"}>
            🐻 Bera Pools
          </Badge>
        )}
      </div>
      <div className="mt-6">
        <div className="mb-2 text-left text-sm font-medium">
          {pool?.poolName}
        </div>
        <div className="flex flex-row">
          <TokenIconList
            tokenList={pool?.tokens?.map((t) => t.address) ?? []}
            size={24}
          />
        </div>
      </div>
      <div className="mb-6 mt-6 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border-border bg-muted px-4 py-2">
          <div className="text-left text-xs">APR</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold ">
            {(pool?.totalApy ?? 0).toFixed(2)}%
          </div>
        </div>
        <div className="rounded-2xl border-border bg-muted px-4 py-2">
          <div className="text-left text-xs">TVL</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold ">
            {formatUsd(pool?.totalValue ?? "0")}
          </div>
        </div>
        <div className="rounded-2xl border-border bg-muted px-4 py-2">
          <div className="text-left text-xs">24H Volume</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold  ">
            {formatUsd(pool?.dailyVolume ?? "0")}
          </div>
        </div>
        <div className="rounded-2xl border-border bg-muted px-4 py-2">
          <div className="text-left text-xs">24H Fees</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold ">
            {" "}
            {pool?.dailyVolume && Number(pool?.dailyVolume) !== 0
              ? formatUsd(pool?.fees ?? "0")
              : "$0"}
          </div>
        </div>
      </div>
      {addLp ? (
        <Button
          className="w-full gap-1"
          onClick={() => router.push(`/pool/${pool?.pool}/add-liquidity`)}
        >
          <Icons.add className="h-6 w-6" /> Add Liquidity
        </Button>
      ) : (
        <Button
          className="w-full gap-1"
          onClick={() => router.push(`/pool/${pool?.pool}`)}
        >
          {/* should go to this add Liquidity place for this pool instead of pool details */}
          Details <Icons.arrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
