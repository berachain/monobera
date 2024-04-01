import { useEffect, useMemo, useState } from "react";
import type { PaginationState, RowSelectionState } from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { getPnl } from "~/hooks/useCalculatePnl";
import { usePollOpenOrders } from "~/hooks/usePollOpenOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import type { IMarket } from "~/types/market";
import type { CloseOrderPayload } from "~/types/order-history";
import type { TableTabTypes } from "~/types/table-tab-types";
import { OrderHistoryHeader } from "./order-history-header";
import { OrderHistoryTable } from "./order-history-table";
import { TotalAmount } from "./total-amount";

export function OrderHistory({
  markets,
  tabType,
  setTabType,
  selection,
  setSelection,
  pagination,
  setPagination,
}: {
  markets: IMarket[];
  tabType: TableTabTypes;
  setTabType: (tab: TableTabTypes) => void;
  selection: RowSelectionState;
  setSelection: (selection: RowSelectionState) => void;
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
}) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640 && !mobile) {
        setMobile(true);
      } else if (window.innerWidth >= 640 && mobile) {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobile]);

  const { useMarketOpenPositions } = usePollOpenPositions();

  const { useMarketClosedPositions } = usePollTradingHistory();

  const { useMarketOpenOrders } = usePollOpenOrders();

  const openPositions = useMarketOpenPositions(markets);

  const closedPositions = useMarketClosedPositions(markets);

  const openOrders = useMarketOpenOrders(markets);

  const headers = [
    {
      title: "Positions",
      counts: openPositions?.length ?? 0,
      type: "positions",
    },
    {
      title: "Open Orders",
      counts: openOrders?.length ?? 0,
      type: "orders",
    },
    {
      title: "History",
      type: "history",
    },
    {
      title: "Realized PnL",
      type: "pnl",
    },
  ];

  const closePositionsPayload = useMemo(() => {
    return openPositions?.reduce<CloseOrderPayload[]>(
      (acc, position, index) => {
        if (selection && Object.keys(selection).length !== 0) {
          if (selection[index] === true) {
            acc.push({
              pairIndex: BigInt(position.market.pair_index),
              index: BigInt(position.index),
            });
          }
        } else {
          acc.push({
            pairIndex: BigInt(position.market.pair_index),
            index: BigInt(position.index),
          });
        }
        return acc;
      },
      [],
    );
  }, [openPositions, selection]);

  const closeOrdersPayload = useMemo(() => {
    return openOrders?.reduce<CloseOrderPayload[]>((acc, position, index) => {
      if (selection && Object.keys(selection).length !== 0) {
        if (selection[index] === true) {
          acc.push({
            pairIndex: BigInt(position.market.pair_index),
            index: BigInt(position.index),
          });
        }
      } else {
        acc.push({
          pairIndex: BigInt(position.market.pair_index),
          index: BigInt(position.index),
        });
      }
      return acc;
    }, []);
  }, [openOrders, selection]);

  const { usePriceFeed } = usePricesSocket();

  const priceFeed = usePriceFeed();

  const allPositions = useMemo(() => {
    // performance errors can occur if too many positions
    if (openPositions === undefined || closedPositions === undefined) {
      return [];
    }
    const positions = openPositions?.map((position) => {
      const price = priceFeed
        ? JSON.parse(priceFeed)[Number(position.market?.pair_index ?? 0)]
        : 0;

      const estPnl = getPnl({
        currentPrice: price,
        openPosition: position,
      });

      return {
        ...position,
        open_time: position?.timestamp_open,
        close_time: "",
        close_price: "",
        close_type: "",
        borrowing_fee: formatFromBaseUnit(
          position.borrowing_fee ?? "0",
          18,
        ).toString(10),
        closing_fee: formatFromBaseUnit(
          position.closing_fee ?? "0",
          18,
        ).toString(10),
        funding_rate: formatFromBaseUnit(
          position.funding_rate ?? "0",
          18,
        ).toString(10),
        open_fee: formatFromBaseUnit(position.open_fee ?? "0", 18).toString(10),
        volume: formatFromBaseUnit(position.position_size ?? "0", 18)
          .times(position.leverage ?? "1")
          .toString(10),
        pnl: estPnl && !estPnl.isNaN() ? estPnl.toString(10) : "0",
      };
    });
    const orders = [...positions, ...closedPositions];
    // sort the orders by open time on mobile cards
    if (mobile && tabType === "history") {
      orders.sort((a, b) => Number(b.open_time) - Number(a.open_time));
    }
    return orders;
  }, [openPositions, priceFeed, closedPositions, mobile, tabType]);

  return (
    <div className="mx-2 mb-10 flex h-full w-[calc(100%-16px)] flex-col overflow-auto rounded-md border border-border lg:mb-2 lg:ml-0 lg:w-[calc(100%-8px)]">
      <OrderHistoryHeader
        closePositionsPayload={closePositionsPayload}
        closeOrdersPayload={closeOrdersPayload}
        selection={selection}
        {...{ headers, tabType, setTabType }}
      />
      <TotalAmount
        className="flex sm:hidden"
        markets={markets}
        tabType={tabType}
      />
      <OrderHistoryTable
        tab={tabType}
        selection={selection}
        setSelection={setSelection}
        pagination={pagination}
        setPagination={setPagination}
        openPositions={openPositions}
        openOrders={openOrders}
        allPositions={allPositions}
        history={closedPositions}
        markets={markets}
        mobile={mobile}
      />
    </div>
  );
}
