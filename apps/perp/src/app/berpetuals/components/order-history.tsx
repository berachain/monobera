"use client";

import { useMemo, useState, useEffect } from "react";
import type { ClosedTrade, OpenLimitOrder, OpenTrade } from "@bera/proto/src";

import { usePollOpenOrders } from "~/hooks/usePollOpenOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import { getPnl } from "~/hooks/useCalculatePnl";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "../page";
import { OrderHistoryHeader, type BerpTabTypes } from "./order-history-header";
import { OrderHistoryTable } from "./order-history-table";
import { TotalAmount } from "./total-amount";
import { formatUnits } from "viem";

export interface IMarketOrder extends OpenTrade {
  market: IMarket;
}

export interface ILimitOrder extends OpenLimitOrder {
  market: IMarket;
}

export interface IClosedTrade extends ClosedTrade {
  market: IMarket;
}

export interface IPosition {
  market: IMarket;
  trader: string;
  pair_index: string;
  index: string;
  buy: boolean;
  leverage: string;
  open_price: string;
  tp: string;
  sl: string;
  borrowing_fee: string;
  rollover_fee: string;
  funding_rate: string;
  closing_fee: string;
  open_fee: string;
  close_time: string;
  open_time: string;
  volume: string;
  pnl: string;
  close_price: string;
  close_type: string;
  vault_fee: string;
}

export function OrderHistory({ markets }: { markets: IMarket[] }) {
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

  const [tabType, setTabType] = useState<BerpTabTypes>("positions");

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
    return openPositions?.map((position) => ({
      pairIndex: BigInt(position.market.pair_index),
      index: BigInt(position.index),
    }));
  }, [openPositions]);

  const closeOrdersPayload = useMemo(() => {
    return openOrders?.map((position) => ({
      pairIndex: BigInt(position.market.pair_index),
      index: BigInt(position.index),
    }));
  }, [openPositions]);

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
        vault_fee: "",
        borrowing_fee: formatUnits(BigInt(position.borrowing_fee ?? 0), 18),
        closing_fee: formatUnits(BigInt(position.closing_fee ?? 0), 18),
        funding_rate: formatUnits(BigInt(position.funding_rate ?? 0), 18),
        open_fee: formatUnits(BigInt(position.open_fee ?? 0), 18),
        volume: (
          Number(formatUnits(BigInt(position.position_size ?? 0), 18)) *
          Number(position.leverage)
        ).toString(),
        pnl: estPnl ? estPnl.toString() : "0",
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
    <div className="w-full">
      <OrderHistoryHeader
        closePositionsPayload={closePositionsPayload}
        closeOrdersPayload={closeOrdersPayload}
        {...{ headers, tabType, setTabType }}
      />
      <TotalAmount
        className="flex sm:hidden"
        markets={markets}
        tabType={tabType}
      />
      <OrderHistoryTable
        tab={tabType}
        openPositons={openPositions}
        openOrders={openOrders}
        allPositions={allPositions}
        history={closedPositions}
        markets={markets}
        mobile={mobile}
      />
      <TotalAmount
        className="hidden sm:flex"
        markets={markets}
        tabType={tabType}
      />
    </div>
  );
}
