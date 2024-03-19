import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { formatUnits } from "viem";
import { ClosePositionModal } from "../../components/close-position-modal";
import { usePollOpenOrders } from "~/hooks/usePollOpenOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import {
  type ChartingLibraryWidgetOptions,
  type ResolutionString,
} from "../../../../public/static/charting_library/charting_library";
import { type IMarket } from "../page";
import type { ChartProps } from "./TVChartContainer";
import { type BerpTabTypes } from "./order-wrapper";
import {
  type RowSelectionState,
  type PaginationState,
} from "@tanstack/react-table";
import { CloseOrderModal } from "~/app/components/close-order-modal";
import { ILimitOrder, IMarketOrder } from "./order-history";
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
  showOrderLines,
}: {
  markets: IMarket[];
  marketName: string;
  selection: RowSelectionState;
  pagination: PaginationState;
  setSelection: (selection: RowSelectionState) => void;
  tabType: BerpTabTypes;
  showOrderLines: boolean;
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
            const positionSize =
              Number(formatUnits(BigInt(position.position_size ?? 0), 18)) *
              Number(position.leverage);
            const openPrice = Number(
              formatUnits(BigInt(position.open_price ?? 0), 10),
            );
            const size = positionSize / openPrice;
            const pos = {
              price: Number(formatUnits(BigInt(position.open_price ?? 0), 10)),
              type: position.buy ? "Long Position" : "Short Position",
              positionSize: size.toFixed(4),
              onHighlight: () => setSelection({ [index]: true }),
              onClose: () => {
                setPosition(position);
                setPositionOpenState(true);
              },
            } as OrderLine;
            if (selection[index]) {
              pos.tp = Number(formatUnits(BigInt(position.tp ?? 0), 10));
              pos.sl = Number(formatUnits(BigInt(position.sl ?? 0), 10));
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
            const positionSize =
              Number(formatUnits(BigInt(order.position_size ?? 0), 18)) *
              Number(order.leverage);
            const openPrice = Number(formatUnits(BigInt(order.price ?? 0), 10));
            const size = positionSize / openPrice;
            const limit = {
              price: Number(formatUnits(BigInt(order.price ?? 0), 10)),
              type: order.buy ? "Long Limit" : "Short Limit",
              positionSize: size.toFixed(4),
              onHighlight: () => setSelection({ [index]: true }),
              onClose: () => {
                setOrder(order);
                setOrderOpenState(true);
              },
            } as OrderLine;
            if (selection[index]) {
              limit.tp = Number(formatUnits(BigInt(order.tp ?? 0), 10));
              limit.sl = Number(formatUnits(BigInt(order.sl ?? 0), 10));
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

  console.log("checking", isMounted, chartReady);

  return (
    <div className="h-full w-full grid">
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
          showOrderLines={showOrderLines}
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

  // return (
  //   <div className="h-full w-full">
  //       {isMounted ? (
  //         <>
  //         {position && (
  //           <ClosePositionModal
  //             controlledOpen={positionOpenState}
  //             openPosition={position}
  //             onOpenChange={setPositionOpenState}
  //           />
  //         )}
  //         {order && (
  //           <CloseOrderModal
  //             controlledOpen={orderOpenState}
  //             openOrder={order}
  //             onOpenChange={setOrderOpenState}
  //           />
  //         )}
  //         <TVChartContainer
  //           {...defaultWidgetProps}
  //           showOrderLines={showOrderLines}
  //           orderLines={orderLines}
  //           chartReady={chartReady}
  //           setChartReady={setChartReady}
  //         />
  //       </>
  //       ) : (
  //           <LoadingContainer />
  //         )}
  //   </div>
  // );
}
