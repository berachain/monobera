import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";

import { calculatePercentDifference } from "~/utils/percentDifference";
import { usePollPrices } from "~/hooks/usePollPrices";

export const MarketPrice = ({ pairIndex }: { pairIndex: string }) => {
  const { marketPrices } = usePollPrices();
  const price = marketPrices[pairIndex ?? ""] ?? "0";

  return (
    <div className="w-[88px]">
      {" "}
      {price !== "0" ? (
        <span>{formatUsd(price)}</span>
      ) : (
        <Skeleton className="h-[16px] w-[80px]" />
      )}
    </div>
  );
};

export const MarketPriceChange = ({
  pairIndex,
  dailyHistoricPrice,
  showAbsolutePrice = true,
}: {
  pairIndex: string;
  dailyHistoricPrice: number;
  showAbsolutePrice?: boolean;
}) => {
  const { marketPrices } = usePollPrices();
  const price = marketPrices[pairIndex ?? ""] ?? "0";

  const difference = useMemo(() => {
    return calculatePercentDifference(
      dailyHistoricPrice?.toString() ?? "0",
      price,
    );
  }, [dailyHistoricPrice, price]);

  const priceDifference = useMemo(() => {
    return BigNumber(price)
      .minus(dailyHistoricPrice ?? 0)
      .toString(10);
  }, [dailyHistoricPrice, price]);

  return (
    <div className={cn("flex flex-col gap-1", showAbsolutePrice && "w-[80px]")}>
      <div
        className={cn(
          "text-sm font-semibold leading-tight",
          difference.gte(0)
            ? "text-success-foreground"
            : "text-destructive-foreground",
        )}
      >
        {price !== "0" ? (
          <span>
            {!difference.isNaN() ? difference.dp(2).toString(10) : 0}%
          </span>
        ) : (
          <Skeleton className="h-[16px] w-[50px]" />
        )}
      </div>
      {showAbsolutePrice && (
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          {price !== "0" ? (
            <span>
              {!difference.isNaN() ? formatUsd(priceDifference) : "$0"}
            </span>
          ) : (
            <Skeleton className="h-[16px] w-[80px]" />
          )}
        </div>
      )}
    </div>
  );
};
