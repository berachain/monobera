import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router";
import { formatUsd } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
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
export const PoolCard = ({ pool }: { pool: Pool | undefined }) => {
  const fees =
    (Number(pool?.formattedSwapFee) / 100) * Number(pool?.dailyVolume);
  const swapApr = (fees / Number(pool?.totalValue)) * 365 * 100;

  const router = useRouter();
  return (
    <div
      key={pool?.pool}
      className="col-span-1 w-[275px] rounded-xl border border-border bg-background px-6 py-8"
    >
      <div className="flex flex-row flex-wrap">
        {pool?.tags?.map((tag) => {
          return (
            <Badge
              key={tag}
              className="mb-2 mr-2 border-sky-600 bg-sky-50 font-medium text-sky-600 hover:bg-sky-50"
            >
              {getBadgeContent(tag)}
            </Badge>
          );
        })}
      </div>
      <div className="mt-6">
        <div className="mb-2 text-left text-sm font-medium">
          {pool?.poolName}
        </div>
        <div className="flex flex-row">
          {pool?.tokens?.map((token, i) => (
            <TokenIcon
              key={token.address}
              token={token}
              className={cn(
                " border-2 border-border ",
                i !== 0 && "ml-[-15px]",
              )}
            />
          ))}
        </div>
      </div>
      <div className="mb-6 mt-6 grid grid-cols-2 gap-2">
        <div className="rounded-xl border bg-muted p-4">
          <div className="text-left text-xs">APR</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold ">
            {(Number.isNaN(swapApr) ? 0 : swapApr).toFixed(2)}%
          </div>
        </div>
        <div className="rounded-xl border bg-muted p-4">
          <div className="text-left text-xs">TVL</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold ">
            {formatUsd(pool?.totalValue ?? "0")}
          </div>
        </div>
        <div className="rounded-xl border bg-muted p-4">
          <div className="text-left text-xs">24H Volume</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold  ">
            {formatUsd(pool?.dailyVolume ?? "0")}
          </div>
        </div>
        <div className="rounded-xl border bg-muted p-4">
          <div className="text-left text-xs">24H Fees</div>
          <div className="overflow-hidden truncate whitespace-nowrap text-left text-sm font-semibold ">
            {" "}
            {pool?.dailyVolume && Number(pool?.dailyVolume) !== 0
              ? formatUsd(fees)
              : "$0"}
          </div>
        </div>
      </div>
      <Button
        className="w-full gap-1"
        onClick={() => router.push(`/pool/${pool?.pool}`)}
      >
        View Pool <Icons.arrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
