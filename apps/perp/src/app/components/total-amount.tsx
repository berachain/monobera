import { useContext, useMemo } from "react";
import { FormattedNumber, Tooltip, usePrevious } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { TableContext } from "~/context/table-context";
import { usePollAccountTradingSummary } from "~/hooks/usePollAccountTradingSummary";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollOpenPositionsSummary } from "~/hooks/usePollOpenPositionsSummary";
import type { IMarket } from "~/types/market";
import type { TableTabTypes } from "~/types/table";
import { TotalRelativePnLHoverState } from "../berpetuals/components/total-relative-pnl-hover-state";
import { usePollPrices } from "~/hooks/usePollPrices";
import { calculateUnrealizedPnl } from "~/utils/calculateUnrealizedPnl";

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
  const { totalUnrealizedPnl, openPositionSize } =
    usePollOpenPositionsSummary();
  const { tableState } = useContext(TableContext);
  const { data: openPositions } = usePollOpenPositions(tableState);
  const { marketPrices } = usePollPrices();
  const unrealizedPnl = useMemo(() => {
    if (!openPositions) {
      return BigNumber(totalUnrealizedPnl);
    }
    const pnl = calculateUnrealizedPnl(openPositions, marketPrices);
    return BigNumber(pnl ?? totalUnrealizedPnl);
  }, [openPositions, marketPrices, totalUnrealizedPnl]);
  const { useAccountTradingSummary } = usePollAccountTradingSummary();
  const { data: accountTradingSummary } = useAccountTradingSummary();
  const realizedPnl = accountTradingSummary?.pnl ?? "0";
  const totalPnlBN = unrealizedPnl.plus(realizedPnl);

  const totalRelativePnL = () => {
    return (
      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Relative Pnl
        </span>
        <div className="group relative">
          <Tooltip
            toolTipTrigger={
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
            children={
              <div className="p-2">
                <TotalRelativePnLHoverState
                  totalUnrealizedPnl={
                    unrealizedPnl.isNaN() ? "0" : unrealizedPnl.toString(10)
                  }
                  realizedPnl={realizedPnl ?? "0"}
                  totalPnl={totalPnlBN.isNaN() ? "0" : totalPnlBN.toString(10)}
                />
              </div>
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
                Number(unrealizedPnl) > 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
              value={unrealizedPnl ?? 0}
              compact={false}
              compactThreshold={9_999}
              symbol="USD"
            />
          }
        </span>
      </div>
    );
  };

  const totalHistoricalPnL = () => {
    return (
      <div className="flex flex-col items-center sm:flex-row sm:gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          Total Historical Pnl
        </span>
        <span className="text-sm font-medium text-success-foreground">
          {
            <FormattedNumber
              className={cn(
                "",
                Number(realizedPnl) > 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
              value={realizedPnl ?? 0}
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
      {tabType === "history"
        ? totalRelativePnL()
        : tabType === "pnl"
          ? totalHistoricalPnL()
          : totalOpenPnL()}
      {spacer && tabType !== "pnl" && (
        <span className="mx-1 flex items-center text-xs font-medium text-muted-foreground">
          {"|"}
        </span>
      )}
      {tabType !== "pnl" && (
        <div className="flex flex-col items-center sm:flex-row sm:gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Total Position Size
          </span>
          <span className="text-sm font-medium text-foreground">
            {
              <FormattedNumber
                className="text-sm font-medium text-foreground"
                value={openPositionSize}
                compact={false}
                compactThreshold={9_999}
                symbol="USD"
              />
            }
          </span>
        </div>
      )}
    </div>
  );
}
