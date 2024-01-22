import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import type { IMarket } from "../page";

export function TotalAmount({
  className,
  markets,
}: {
  className?: string;
  markets: IMarket[];
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

  return (
    <div
      className={cn(
        "flex justify-between border-y border-border p-3",
        className,
      )}
    >
      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Relative Pnl
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
            {formatUsd(totalPnl)}
          </span>
        </span>
      </div>

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
