import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";

import type { IMarket } from "~/app/berpetuals/page";
import { usePollAccountTradingSummary } from "~/hooks/usePollAccountTradingSummary";
import { usePollDailyPnl } from "~/hooks/usePollDailyPnl";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";

export function UserGeneralInfo({ markets }: { markets: IMarket[] }) {
  const { useTotalPositionSize, useTotalUnrealizedPnl } =
    usePollOpenPositions();
  const positionSize = useTotalPositionSize();

  const { useAccountTradingSummary } = usePollAccountTradingSummary();
  const { data } = useAccountTradingSummary();

  const { useDailyPnl } = usePollDailyPnl();

  const unrealizedPnl = useTotalUnrealizedPnl(markets);
  const dailyPnl = useDailyPnl();

  const pnl = useMemo(() => {
    return unrealizedPnl + dailyPnl;
  }, [unrealizedPnl, dailyPnl]);

  return (
    <div className="flex max-h-[300px] w-full flex-shrink-0 flex-col gap-8 rounded-xl border border-border bg-muted px-4 py-6 lg:w-[270px]">
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium leading-none text-muted-foreground">
          Current Open Positions <Tooltip text="Total open position size" />
        </div>
        <div className="text-3xl font-semibold leading-9 text-foreground">
          {formatUsd(Number(positionSize))}
        </div>
        <div
          className={cn(
            "text-sm font-medium leading-normal",
            pnl < 0 ? "text-destructive-foreground" : "text-success-foreground",
          )}
        >
          {formatUsd(pnl)}
          <span className="ml-2 cursor-pointer text-muted-foreground underline">
            24H PnL
          </span>
        </div>
      </div>

      <div>
        <div className="mb-4 border-b border-border p-[10px] font-medium">
          Details
        </div>
        <div className="p flex flex-col gap-2">
          <div className="flex justify-between px-3 text-sm leading-tight">
            <div>Total Trades</div>
            <div>{data?.num_trades ?? 0}</div>
          </div>
          <div className="flex justify-between px-3 text-sm leading-tight">
            <div>Fees Paid</div>
            <div>{formatUsd(data?.fees_paid ?? 0)}</div>
          </div>
          <div className="flex justify-between px-3 text-sm leading-tight">
            <div className="flex flex-row items-center gap-1">
              Net PnL{" "}
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
