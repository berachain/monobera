import { formatUsd } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";

import type { IMarket } from "~/app/berpetuals/page";
import { usePollAccountTradingSummary } from "~/hooks/usePollAccountTradingSummary";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";

export function UserGeneralInfo({ markets }: { markets: IMarket[] }) {
  const { useTotalPositionSize, useTotalUnrealizedPnl } =
    usePollOpenPositions();
  const positionSize = useTotalPositionSize();

  const { useAccountTradingSummary } = usePollAccountTradingSummary();
  const { data } = useAccountTradingSummary();

  const unrealizedPnl = useTotalUnrealizedPnl(markets);

  return (
    <div className="flex h-full w-full flex-col gap-4 flex-1 sm:flex-row lg:flex-col">
      <div className="flex w-full flex-col gap-1 rounded-md border border-border bg-muted px-4 py-4 lg:w-[270px]">
        <div className="mb-2 border-b border-border px-1 pb-2 font-medium">
          Current Open Positions
        </div>
        <div className="text-3xl font-semibold leading-9 text-foreground">
          {formatUsd(Number(positionSize))}
        </div>
        <div
          className={cn(
            "text-sm font-medium leading-normal",
            unrealizedPnl < 0
              ? "text-destructive-foreground"
              : "text-success-foreground",
          )}
        >
          {formatUsd(unrealizedPnl)}
          <span className="ml-2 text-muted-foreground">Open PnL</span>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 rounded-md border border-border bg-muted px-4 py-4 lg:w-[270px]">
        <div className="mb-2 border-b border-border px-1 pb-2 font-medium">
          Lifetime Stats
        </div>
        <div className="p flex flex-col gap-2">
          <div className="flex justify-between px-1 text-sm leading-tight">
            <div>Total Trades</div>
            <div>{data?.num_trades ?? 0}</div>
          </div>
          <div className="flex justify-between px-1 text-sm leading-tight">
            <div>Fees Paid</div>
            <div>{formatUsd(data?.fees_paid ?? 0)}</div>
          </div>
          <div className="flex justify-between px-1 text-sm leading-tight">
            <div className="flex flex-row items-center gap-1">
              Realized PnL{" "}
              <Tooltip text="Cumulative Profit & Loss for this account" />
            </div>
            <div
              className={
                data?.pnl < 0
                  ? "text-destructive-foreground"
                  : "text-success-foreground"
              }
            >
              {formatUsd(data?.pnl ?? 0)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
