import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  type PaginationState,
  type RowSelectionState,
} from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { CloseOrderModal } from "~/app/components/close-order-modal";
import { usePollOpenOrders } from "~/hooks/usePollOpenOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { type IMarket } from "~/types/market";
import { ILimitOrder, IMarketOrder } from "~/types/order-history";
import { type TableTabTypes } from "~/types/table-tab-types";
import {
  type ChartingLibraryWidgetOptions,
  type ResolutionString,
} from "../../../../public/static/charting_library/charting_library";
import { ClosePositionModal } from "../../components/close-position-modal";
import type { ChartProps } from "./TVChartContainer";
import { LoadingContainer } from "./loading-container";

export type OrderLine = {
  type: string;
  price: number;
  positionSize: string;
  onClose: () => void;
  onHighlight: () => void;
  tp?: number;
  sl?: number;
};

const TVChartContainer = dynamic(
  () =>
    import("./TVChartContainer").then(
      (mod) => mod.TVChartContainer as React.ComponentType<ChartProps>,
    ),
  {
    ssr: false,
  },
);

export function OrderChart({
  markets,
  marketName,
  selection,
  setSelection,
  pagination,
  tabType,
}: {
  markets: IMarket[];
  marketName: string;
  selection: RowSelectionState;
  pagination: PaginationState;
  setSelection: (selection: RowSelectionState) => void;
  tabType: TableTabTypes;
}) {
  const { useMarketOpenPositions } = usePollOpenPositions();
  const { useMarketOpenOrders } = usePollOpenOrders();

  const openPositions = useMarketOpenPositions(markets);
  const openOrders = useMarketOpenOrders(markets);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [positionOpenState, setPositionOpenState] = useState(false);
  const [orderOpenState, setOrderOpenState] = useState(false);
  const [position, setPosition] = useState<IMarketOrder>();
  const [order, setOrder] = useState<ILimitOrder>();
  const [chartReady, setChartReady] = useState(false);

  const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
    symbol: marketName,
    interval: "15" as ResolutionString,
    library_path: "/static/charting_library/",
    locale: "en",
    charts_storage_url: "https://saveload.tradingview.com",
    charts_storage_api_version: "1.1",
    client_id: "tradingview.com",
    user_id: "public_user_id",
    fullscreen: false,
    autosize: true,
  };

  const humanizedPositions = useMemo(() => {
    return openPositions
      ? openPositions.reduce<OrderLine[]>((acc, position, index) => {
          if (
            selection &&
            (Object.keys(selection).length === 0 || selection[index]) &&
            index >= pagination.pageIndex * pagination.pageSize &&
            index < (pagination.pageIndex + 1) * pagination.pageSize &&
            position?.market?.name === marketName
          ) {
            const positionSize = formatFromBaseUnit(
              position.position_size,
              18,
            ).times(position.leverage ?? "1");
            const openPrice = formatFromBaseUnit(position.open_price, 10);
            const size = positionSize.div(openPrice).dp(4).toString(10);

            const pos = {
              price: Number(openPrice.toString(10)),
              type: position.buy ? "Long Position" : "Short Position",
              positionSize: size,
              onHighlight: () => setSelection({ [index]: true }),
              onClose: () => {
                setPosition(position);
                setPositionOpenState(true);
              },
            } as OrderLine;
            if (selection[index]) {
              pos.tp = Number(
                formatFromBaseUnit(position.tp ?? "0", 10).toString(10),
              );
              pos.sl = Number(
                formatFromBaseUnit(position.sl ?? "0", 10).toString(10),
              );
            }
            acc.push(pos);
          }
          return acc;
        }, [])
      : [];
  }, [openPositions, tabType, selection]);

  const humanizedOrders = useMemo(() => {
    return openOrders && tabType === "orders"
      ? openOrders.reduce<OrderLine[]>((acc, order, index) => {
          if (
            selection &&
            (Object.keys(selection).length === 0 || selection[index]) &&
            index >= pagination.pageIndex * pagination.pageSize &&
            index < (pagination.pageIndex + 1) * pagination.pageSize &&
            order?.market?.name === marketName
          ) {
            const positionSize = formatFromBaseUnit(
              order.position_size,
              18,
            ).times(order.leverage ?? "1");
            const openPrice = formatFromBaseUnit(order.price, 10);
            const size = positionSize.div(openPrice).dp(4).toString(10);

            const limit = {
              price: Number(openPrice),
              type: order.buy ? "Long Limit" : "Short Limit",
              positionSize: size,
              onHighlight: () => setSelection({ [index]: true }),
              onClose: () => {
                setOrder(order);
                setOrderOpenState(true);
              },
            } as OrderLine;
            if (selection[index]) {
              limit.tp = Number(
                formatFromBaseUnit(order.tp ?? "0", 10).toString(10),
              );
              limit.sl = Number(
                formatFromBaseUnit(order.sl ?? "0", 10).toString(10),
              );
            }
            acc.push(limit);
          }
          return acc;
        }, [])
      : [];
  }, [openOrders, tabType, selection, marketName]);

  const orderLines = useMemo(() => {
    if (tabType === "positions") {
      return humanizedPositions;
    }
    if (tabType === "orders") {
      return humanizedOrders;
    }
    return [];
  }, [tabType, humanizedOrders, humanizedPositions]);

  return (
    <div className="grid h-full w-full">
      <div className="h-full w-full" style={{ gridArea: "1 / 1" }}>
        {position && (
          <ClosePositionModal
            controlledOpen={positionOpenState}
            openPosition={position}
            onOpenChange={setPositionOpenState}
          />
        )}
        {order && (
          <CloseOrderModal
            controlledOpen={orderOpenState}
            openOrder={order}
            onOpenChange={setOrderOpenState}
          />
        )}
        <TVChartContainer
          {...defaultWidgetProps}
          orderLines={orderLines}
          chartReady={chartReady}
          setChartReady={setChartReady}
        />
      </div>
      {!(chartReady && isMounted) && (
        <LoadingContainer style={{ gridArea: "1 / 1" }} />
      )}
    </div>
  );
}
