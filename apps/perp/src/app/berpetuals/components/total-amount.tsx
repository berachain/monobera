import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { FormattedNumber, HoverCard, usePrevious } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import BigNumber from "bignumber.js";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import type { IMarket } from "~/types/market";
import type { TableTabTypes } from "~/types/table-tab-types";
import { TotalRelativePnLHoverState } from "./total-relative-pnl-hover-state";

export function TotalAmount({
  className,
  markets,
  tabType,
  spacer,
}: {
  className?: string;
  markets: IMarket[];
  tabType: TableTabTypes;
  spacer?: boolean;
}) {
  const { useTotalUnrealizedPnl, useTotalPositionSize } =
    usePollOpenPositions();
  const totalUnrealizedPnl = useTotalUnrealizedPnl(markets);

  const { useRealizedPnl } = usePollTradingHistory();
  const realizedPnl = useRealizedPnl();

  const totalPositionSize = useTotalPositionSize();
  const totalPnlBN = useMemo(() => {
    return BigNumber(totalUnrealizedPnl).plus(realizedPnl);
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
              <span className="text-sm font-medium text-success-foreground">
                {
                  <FormattedNumber
                    className={cn(
                      "cursor-help underline decoration-dashed",
                      totalPnlBN.gt(0)
                        ? "text-success-foreground"
                        : "text-destructive-foreground",
                    )}
                    value={totalPnlBN.isNaN() ? "0" : totalPnlBN.toString(10)}
                    compact={false}
                    compactThreshold={9_999}
                    symbol="USD"
                  />
                }
              </span>
            }
            content={
              <TotalRelativePnLHoverState
                totalUnrealizedPnl={totalUnrealizedPnl ?? "0"}
                realizedPnl={realizedPnl ?? "0"}
                totalPnl={totalPnlBN.isNaN() ? "0" : totalPnlBN.toString(10)}
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
        <span className="text-sm font-medium text-success-foreground">
          {
            <FormattedNumber
              className={cn(
                "",
                Number(totalUnrealizedPnl) > 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
              value={totalUnrealizedPnl ?? 0}
              compact={false}
              compactThreshold={9_999}
              symbol="USD"
            />
          }
        </span>
      </div>
    );
  };

  return (
    <div className={cn("flex justify-between p-3", className)}>
      {tabType === "positions" || tabType === "orders"
        ? totalOpenPnL()
        : totalRelativePnL()}
      {spacer && (
        <span className="mx-1 flex items-center text-xs font-medium text-muted-foreground">
          {"|"}
        </span>
      )}
      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Position Size
        </span>
        <span className="text-sm font-medium text-foreground">
          {
            <FormattedNumber
              className="text-sm font-medium text-foreground"
              value={totalPositionSize ?? "0"}
              compact={false}
              compactThreshold={9_999}
              symbol="USD"
            />
          }
        </span>
      </div>
    </div>
  );
}
