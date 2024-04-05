import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { CloseOrderModal } from "~/app/components/close-order-modal";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { PositionCardTitle } from "~/app/components/position-title";
import {
  ActivePositionPNL,
  PositionLiquidationPrice,
} from "~/app/components/table-columns/positions";
import { UpdateLimitOrderModal } from "~/app/components/update-limit-order-modal";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { type IMarket } from "~/types/market";
import type {
  ICards,
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
  IPosition,
} from "~/types/order-history";

export const getAssetCardList = ({
  marketOrderItems,
  limitOrderItems,
  historyItems,
  markets,
  allPositions,
}: {
  marketOrderItems: IMarketOrder[];
  limitOrderItems: ILimitOrder[];
  historyItems: IClosedTrade[];
  markets: IMarket[];
  allPositions: IPosition[];
}): {
  marketList: ICards[];
  limitList: ICards[];
  historyList: ICards[];
  pnlList: ICards[];
} => {
  return {
    marketList: getMarketListItems(marketOrderItems ?? [], markets),
    limitList: getLimitListItems(limitOrderItems ?? []),
    historyList: getHistoryListItems(allPositions ?? []),
    pnlList: getPnlListItems(historyItems ?? []),
  };
};

const getMarketListItems = (
  marketOrderItems: IMarketOrder[],
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
            <ActivePositionPNL
              position={item}
              className="mb-2 max-h-[15px] text-xs font-medium leading-tight text-muted-foreground"
            />
          ),
        },
      ],
    };
  });

  return cards;
};

const getLimitListItems = (limitOrderItems: ILimitOrder[]): ICards[] => {
  const cards = limitOrderItems.map((item) => {
    const positionSize = formatFromBaseUnit(item.position_size, 18).times(
      item.leverage ?? "1",
    );
    const openPrice = formatFromBaseUnit(item.price ?? "0", 10);
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
          <UpdateLimitOrderModal
            type={"market"}
            openOrder={item}
            className="h-full w-14"
            trigger={
              <Button variant={"secondary"} className="h-full w-14">
                <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
              </Button>
            }
          />
          <CloseOrderModal
            className="w-full"
            trigger={
              <Button className="text-md h-full w-full cursor-pointer rounded-lg  bg-destructive text-center font-semibold text-destructive-foreground hover:opacity-80 ">
                Close Order
              </Button>
            }
            openOrder={item}
          />
        </div>
      ),
      rows: [
        {
          key: "Order Type",
          value: (
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              LIMIT ORDER
            </p>
          ),
        },
        {
          key: "Price",
          value: (
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              {formatUsd(
                formatFromBaseUnit(item.price ?? "0", 10).toString(10),
              )}
            </p>
          ),
        },
        {
          key: "Position Size",
          value: (
            <p className="text-xs font-medium leading-tight text-muted-foreground">
              {formatUsd(
                formatFromBaseUnit(item.position_size ?? "0", 18).toString(10),
              )}
            </p>
          ),
        },
      ],
    };
  });

  return cards;
};

const getHistoryListItems = (historyItems: IPosition[]): ICards[] => {
  const cards = historyItems.map((item) => {
    const volume = BigNumber(item?.volume);

    const openPrice = formatFromBaseUnit(item.open_price ?? "0", 10);
    const size = volume.div(openPrice).dp(4).toString(10);

    const openTime = new Date(Number(item.open_time) * 1000);
    const closeTime = new Date(Number(item.close_time) * 1000);

    const positionSize = volume;

    const fees =
      Number(item.rollover_fee) +
      Number(item.funding_rate) +
      Number(item.closing_fee) +
      Number(item.borrowing_fee) +
      Number(item.open_fee);

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
                {item.close_time ? closeTime.toLocaleDateString() : ""}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.close_time ? closeTime.toLocaleTimeString() : "-"}
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
              {item.close_price === ""
                ? "-"
                : formatUsd(
                    formatFromBaseUnit(item.close_price ?? "0", 10).toString(
                      10,
                    ),
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
              {formatUsd(fees ?? 0)}
            </p>
          ),
        },
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
                {formatUsd(Number(item.pnl) - Number(item.open_fee) ?? 0)}
              </span>
            </div>
          ),
        },
      ],
    };
  });

  return cards;
};

const getPnlListItems = (historyItems: IClosedTrade[]): ICards[] => {
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
