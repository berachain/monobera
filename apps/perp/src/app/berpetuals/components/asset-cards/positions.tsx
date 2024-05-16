import { formatUsd } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { PositionCardTitle } from "~/app/components/position-title";
import { PositionLiquidationPrice } from "~/app/components/table-columns/positions";
import { MarketTradePNL } from "~/app/components/market-trade-pnl";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { type IMarket } from "~/types/market";
import type { ICards, IOpenTrade } from "~/types/order-history";

export const getMarketListItems = (
  marketOrderItems: IOpenTrade[],
  markets: IMarket[],
): ICards[] => {
  const cards = marketOrderItems.map((item) => {
    const positionSize = formatFromBaseUnit(item.position_size, 18).times(
      item.leverage ?? "1",
    );
    const openPrice = formatFromBaseUnit(item.open_price ?? "0", 10);
    const size = positionSize.div(openPrice).dp(4).toString(10);
    return {
      title: (
        <PositionCardTitle
          market={item.market}
          type={item.buy === true ? "Long" : "Short"}
          size={size}
        />
      ),
      footer: (
        <div className="flex h-11 w-full flex-row gap-4">
          <UpdatePositionModal
            openPosition={item}
            className="h-full w-14"
            trigger={
              <Button variant={"secondary"} className="h-full w-14">
                <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
              </Button>
            }
          />
          <ClosePositionModal
            className="w-full"
            trigger={
              <Button className="text-md h-full w-full cursor-pointer rounded-lg  bg-destructive text-center font-semibold text-destructive-foreground hover:opacity-80 ">
                Close Position
              </Button>
            }
            openPosition={item}
          />
        </div>
      ),
      rows: [
        {
          key: "Entry Price",
          value: (
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              {formatUsd(
                formatFromBaseUnit(item.open_price ?? "0", 10).toString(10),
              )}
            </p>
          ),
        },
        {
          key: "Leverage",
          value: (
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              {item.leverage}x
            </p>
          ),
        },
        {
          key: "LIQ Price",
          value: (
            <PositionLiquidationPrice
              position={item}
              className="text-xs font-medium leading-tight text-muted-foreground"
              markets={markets}
            />
          ),
        },
        {
          key: "TP/SL",
          value: (
            <div className="text-xs">
              <span className="text-success-foreground">
                {item.tp === "0"
                  ? "∞"
                  : formatUsd(
                      formatFromBaseUnit(item.tp ?? "0", 10).toString(10),
                    ) ?? "-"}{" "}
              </span>
              /
              <span className="text-destructive-foreground">
                {" "}
                {item.sl === "0"
                  ? "∞"
                  : formatUsd(
                      formatFromBaseUnit(item.sl ?? "0", 10).toString(10),
                    )}
              </span>
            </div>
          ),
        },
        {
          key: "Net PnL",
          value: (
            <MarketTradePNL
              position={item}
              positionSize={item.position_size}
              wrapped
              className="mb-2 max-h-[15px] text-xs font-medium leading-tight text-muted-foreground"
            />
          ),
        },
      ],
    };
  });

  return cards;
};
