import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";

export function TotalRelativePnLHoverState({
  totalUnrealizedPnl,
  realizedPnl,
  totalPnl,
}: {
  totalUnrealizedPnl: number;
  realizedPnl: number;
  totalPnl: number;
}) {
  return (
    <div>
      <div className="flex">
        <span className="text-xs font-medium text-muted-foreground">
          Total Relative PnL: PnL for open trades + Historical PnL
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">PnL for open trades</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(totalUnrealizedPnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(totalUnrealizedPnl)}
          </span>
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">Historical PnL</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(realizedPnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(realizedPnl)}
          </span>
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">Total Relative PnL</span>
        <span className="font-medium text-foreground">
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
    </div>
  );
}
