import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import BigNumber from "bignumber.js";

export const PnlWithPercentage = ({
  positionSize,
  pnl,
}: {
  positionSize: BigNumber;
  pnl: BigNumber;
}) => {
  const percentage = useMemo(() => {
    if (!positionSize || !pnl) return BigNumber("0");
    const currentSize = positionSize.plus(pnl);
    const percentage = currentSize
      .minus(positionSize)
      .div(positionSize)
      .times(100);
    return percentage;
  }, [positionSize, pnl]);
  return (
    <div className="items-start text-sm font-medium leading-tight ">
      <span
        className={cn(
          "flex flex-col items-start",
          pnl.gt(0) ? "text-success-foreground" : "text-destructive-foreground",
        )}
      >
        {formatUsd(pnl.toString(10) ?? "0")}
        <div className="text-xs">({percentage.dp(2).toString(10)}%)</div>
      </span>
    </div>
  );
};
