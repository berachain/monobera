import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { PositionCardTitle } from "~/app/components/position-title";
import type { ICards, IClosedTrade } from "~/types/order-history";

export const getPnlListItems = (historyItems: IClosedTrade[]): ICards[] => {
  const cards = historyItems.map((item) => {
    const volume = BigNumber(item?.volume);

    const openPrice = formatFromBaseUnit(item.open_price ?? "0", 10);
    const size = volume.div(openPrice).dp(4).toString(10);

    const fees =
      Number(item.rollover_fee) +
      Number(item.funding_rate) +
      Number(item.closing_fee) +
      Number(item.borrowing_fee);

    return {
      title: (
        <PositionCardTitle
          market={item.market}
          type={item.buy === true ? "Long" : "Short"}
          size={size}
        />
      ),
      footer: undefined,
      rows: [
        {
          key: "PnL",
          value: (
            <div className="text-xs font-medium leading-tight ">
              <span
                className={cn(
                  "",
                  Number(item.pnl) > 0
                    ? "text-success-foreground"
                    : "text-destructive-foreground",
                )}
              >
                {formatUsd(item.pnl ?? 0)}
              </span>
            </div>
          ),
        },
        {
          key: "Order Type",
          value: (
            <p className="text-xs text-muted-foreground">
              {item.close_type || "-"}
            </p>
          ),
        },
        {
          key: "Open Price",
          value: (
            <p className="text-xs text-muted-foreground">
              {formatUsd(
                formatFromBaseUnit(item.open_price ?? "0", 10).toString(10),
              )}
            </p>
          ),
        },
        {
          key: "Close Price",
          value: (
            <p className="text-xs text-muted-foreground">
              {formatUsd(
                formatFromBaseUnit(item.close_price ?? "0", 10).toString(10),
              )}
            </p>
          ),
        },
        {
          key: "Fees",
          value: (
            <p className="text-xs text-muted-foreground">
              {formatUsd(fees ?? 0)}
            </p>
          ),
        },
      ],
    };
  });

  return cards;
};
