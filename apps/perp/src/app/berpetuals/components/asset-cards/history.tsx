import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { PositionCardTitle } from "~/app/components/position-title";
import type { ICards, IMarketOrder } from "~/types/order-history";
// import { usePollPrices } from "~/hooks/usePollPrices";
// import { useCalculatePnl } from "~/hooks/useCalculatePnl";

export const getHistoryListItems = (historyItems: IMarketOrder[]): ICards[] => {
  // const { marketPrices } = usePollPrices();
  const cards = historyItems.map((item) => {
    const volume = formatFromBaseUnit(item.initial_pos_token ?? "0", 18).times(
      item.leverage ?? "0",
    );

    const openPrice = formatFromBaseUnit(item.open_price ?? "0", 10);
    const size = volume.div(openPrice).dp(4).toString(10);

    const openTime = new Date(Number(item.timestamp_open) * 1000);
    const closeTime = new Date(Number(item.timestamp_close) * 1000);

    const positionSize = volume;
    // let price = marketPrices[item?.market?.pair_index ?? ""] ?? "0";

    // if (item.trade_open) {
    //   price = formatFromBaseUnit(item.price, 10).toString(10);
    // }

    // const pnl = useCalculatePnl({
    //   currentPrice: price,
    //   openPosition: item,
    //   positionSize: item.initial_pos_token
    // })

    const fees = formatFromBaseUnit(item.rollover_fee ?? "0", 18).plus(
      formatFromBaseUnit(item.funding_fee ?? "0", 18).plus(
        formatFromBaseUnit(item.closing_fee ?? "0", 18).plus(
          formatFromBaseUnit(item.borrowing_fee ?? "0", 18).plus(
            formatFromBaseUnit(item.open_fee ?? "0", 18),
          ),
        ),
      ),
    );

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
          key: "Open Time",
          value: (
            <div className="flex flex-row items-center gap-1">
              <div className="text-xs text-muted-foreground">
                {openTime.toLocaleDateString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {openTime.toLocaleTimeString()}
              </div>
            </div>
          ),
        },
        {
          key: "Close Time",
          value: (
            <div className="flex flex-row items-center gap-1">
              <div className="text-xs text-muted-foreground">
                {item.timestamp_close ? closeTime.toLocaleDateString() : ""}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.timestamp_close ? closeTime.toLocaleTimeString() : "-"}
              </div>
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
              {item.trade_open
                ? "-"
                : formatUsd(
                    formatFromBaseUnit(item.price ?? "0", 10).toString(10),
                  )}
            </p>
          ),
        },
        {
          key: "Position Size",
          value: (
            <p className="text-xs text-muted-foreground">
              {formatUsd(positionSize.toString(10) ?? 0)}
            </p>
          ),
        },
        {
          key: "Fees",
          value: (
            <p className="text-xs text-muted-foreground">
              {formatUsd(fees.toString(10))}
            </p>
          ),
        },
        // {
        //   key: "PnL",
        //   value: (
        //     <div className="text-xs font-medium leading-tight ">
        //       <span
        //         className={cn(
        //           "",
        //           Number(pnl) > 0
        //             ? "text-success-foreground"
        //             : "text-destructive-foreground",
        //         )}
        //       >
        //         {formatUsd(Number(pnl) - Number(item.open_fee) ?? 0)}
        //       </span>
        //     </div>
        //   ),
        // },
      ],
    };
  });

  return cards;
};
