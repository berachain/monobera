import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { HoverCard } from "@bera/shared-ui";
import { cn } from "@bera/ui";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import type { IMarket } from "../page";
import { type BerpTabTypes } from "./order-history-header";
import { TotalRelativePnLHoverState } from "./total-relative-pnl-hover-state";

export function TotalAmount({
  className,
  markets,
  tabType,
}: {
  className?: string;
  markets: IMarket[];
  tabType: BerpTabTypes;
}) {
  const { useTotalUnrealizedPnl, useTotalPositionSize } =
    usePollOpenPositions();
  const totalUnrealizedPnl = useTotalUnrealizedPnl(markets);

  const { useRealizedPnl } = usePollTradingHistory();
  const realizedPnl = useRealizedPnl();

  const totalPositionSize = useTotalPositionSize();
  const totalPnl = useMemo(() => {
    return totalUnrealizedPnl + realizedPnl;
  }, [totalUnrealizedPnl, realizedPnl]);

  const totalRelativePnL = () => {
    return (
      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Relative Pnl
        </span>
        <div className="group relative">
          <HoverCard
            triggerElement={
              <span className="font-medium text-success-foreground">
                <span
                  className={cn(
                    "cursor-help underline decoration-dashed",
                    Number(totalPnl) > 0
                      ? "text-success-foreground"
                      : "text-destructive-foreground",
                  )}
                >
                  {formatUsd(totalPnl)}
                </span>
              </span>
            }
            content={
              <TotalRelativePnLHoverState
                totalUnrealizedPnl={totalUnrealizedPnl}
                realizedPnl={realizedPnl}
                totalPnl={totalPnl}
              />
            }
          />
        </div>
      </div>
    );
  };

  const totalOpenPnL = () => {
    return (
      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Open Pnl
        </span>
        <span className="font-medium text-success-foreground">
          <span
            className={cn(
              "",
              Number(totalPnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(totalUnrealizedPnl)}
          </span>
        </span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex justify-between border-y border-border p-3",
        className,
      )}
    >
      {tabType === "positions" || tabType === "orders"
        ? totalOpenPnL()
        : totalRelativePnL()}

      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Position Size
        </span>
        <span className="font-medium text-foreground">
          {formatUsd(totalPositionSize ?? 0)}
        </span>
      </div>
    </div>
  );
}
