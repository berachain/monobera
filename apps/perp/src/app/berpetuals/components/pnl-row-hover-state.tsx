import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";

export function PnLRowHoverState({
  initialCollateral,
  pnlAfterFees,
  borrowFee,
  closeFee,
  openFee,
}: {
  initialCollateral: string;
  pnlAfterFees: string;
  borrowFee: string;
  closeFee: string;
  openFee: string;
}) {
  const pnl =
    Number(pnlAfterFees) +
    Number(borrowFee) +
    Number(closeFee) +
    Number(openFee);
  return (
    <div>
      <div className="flex">
        <span className="text-xs font-medium text-muted-foreground">
          Est. PnL: Initial Collateral - Fees + PnL
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">Initial Collateral</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(initialCollateral) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(initialCollateral)}
          </span>
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">PnL</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(pnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(pnl)}
          </span>
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">Borrow Fee</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(borrowFee) * -1 > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(Number(borrowFee) * -1)}
          </span>
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">Open Fee</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(openFee) * -1 > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(Number(openFee) * -1)}
          </span>
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">Close Fee</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(closeFee) * -1 > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(Number(closeFee) * -1)}
          </span>
        </span>
      </div>
      <div className="flex flex-row items-start justify-between gap-2 self-stretch">
        <span className="font-medium text-foreground">PnL After Fees</span>
        <span className="font-medium text-foreground">
          <span
            className={cn(
              "",
              Number(pnlAfterFees) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(pnlAfterFees)}
          </span>
        </span>
      </div>
    </div>
  );
}
