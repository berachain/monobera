import React, { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { useCalculatePnl } from "~/hooks/useCalculatePnl";
import { usePollPrices } from "~/hooks/usePollPrices";
import type {
  IMarketOrder,
  IOpenTrade,
  IClosedTrade,
} from "~/types/order-history";
import { PnLRowHoverState } from "../berpetuals/components/pnl-row-hover-state";

export const MarketTradePNL = ({
  position,
  positionSize,
  className,
  wrapped,
  closePrice,
  hoverState = true,
  calculatedPnl,
  openFee,
  closeFee,
  borrowFee,
}: {
  position: IOpenTrade | IMarketOrder | IClosedTrade;
  positionSize: string;
  className?: string;
  wrapped?: boolean;
  closePrice?: string;
  hoverState?: boolean;
  calculatedPnl?: string;
  openFee?: string;
  closeFee?: string;
  borrowFee?: string;
}) => {
  const { marketPrices } = usePollPrices();
  let price = marketPrices[position?.market?.pair_index ?? ""] ?? "0";

  const openTrade = !!(position as IMarketOrder)?.trade_open;

  if (closePrice) {
    price = formatFromBaseUnit(closePrice, 10).toString(10);
  }

  let pnl = "0";
  if (calculatedPnl) {
    pnl = calculatedPnl;
  } else {
    pnl =
      useCalculatePnl({
        currentPrice: price,
        openPosition: position as IOpenTrade,
        positionSize: positionSize,
      }) ?? "0";
  }

  const positionSizeBN = formatFromBaseUnit(positionSize ?? "0", 18);
  const percentage = useMemo(() => {
    if (!pnl || !position) return "0";
    const currentSize = positionSizeBN.plus(pnl);
    const percentage = currentSize
      .minus(positionSizeBN)
      .div(positionSizeBN)
      .times(100);
    return percentage.isFinite() ? percentage.dp(2).toString(10) : "-";
  }, [pnl, positionSizeBN]);

  const initialCollateral = formatFromBaseUnit(positionSize, 18)
    .plus(formatFromBaseUnit(position.open_fee || "0", 18))
    .toString(10);
  const borrowFeeFormatted = borrowFee
    ? borrowFee
    : formatFromBaseUnit(position.borrowing_fee || "0", 18).toString(10);
  const closeFeeFormatted = closeFee
    ? closeFee
    : position.closing_fee
      ? formatFromBaseUnit(position.closing_fee || "0", 18).toString(10)
      : formatFromBaseUnit(
          position?.market?.pair_fixed_fee?.close_fee_p ?? "0",
          12,
        )
          .times(positionSizeBN)
          .times(position.leverage)
          .toString(10);

  const openFeeFormatted = openFee
    ? openFee
    : formatFromBaseUnit(position.open_fee || "0", 18).toString(10);

  return (
    <div className={cn("", className)}>
      {pnl !== undefined ? (
        <div>
          <div
            className={cn(
              " flex flex-col items-start",
              Number(pnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
              wrapped && "flex-row gap-1",
            )}
          >
            {hoverState ? (
              <Tooltip
                toolTipTrigger={
                  <div className="cursor-help underline decoration-dashed">
                    {formatUsd(pnl)}
                  </div>
                }
                children={
                  <PnLRowHoverState
                    initialCollateral={initialCollateral}
                    pnlAfterFees={pnl}
                    borrowFee={borrowFeeFormatted}
                    closeFee={closeFeeFormatted}
                    openFee={openFeeFormatted}
                    openTrade={openTrade}
                  />
                }
              />
            ) : (
              <div>{formatUsd(pnl)}</div>
            )}
            {wrapped && <div className="text-xs"> | </div>}
            <div className="text-xs">({percentage}%)</div>
          </div>
        </div>
      ) : (
        <Skeleton className={cn("h-[28px] w-[80px]", className)} />
      )}
    </div>
  );
};
