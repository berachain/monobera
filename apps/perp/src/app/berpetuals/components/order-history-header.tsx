import { useContext, useMemo } from "react";
import { cn } from "@bera/ui";

import { generateMarketOrders } from "~/utils/generateMarketOrders";
import { CloseAllOrders } from "~/app/components/close-all-orders";
import { TableContext, defaultTableState } from "~/context/table-context";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import { usePollOpenLimitOrders } from "~/hooks/usePollOpenLimitOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { IMarket } from "~/types/market";
import type { ILimitOrder, IOpenTrade } from "~/types/order-history";
import type { TableTabTypes } from "~/types/table";

export function OrderHistoryHeader({ markets }: { markets: IMarket[] }) {
  const { tableState, setTableState } = useContext(TableContext);

  const {
    data: openPositionsData,
    multiRefresh: refetchPositions,
    total: totalPositions,
  } = usePollOpenPositions(tableState);

  const openPositions = useMemo(
    () =>
      openPositionsData
        ? (generateMarketOrders(openPositionsData, markets) as IOpenTrade[])
        : [],
    [openPositionsData, markets],
  );

  const {
    data: openLimitOrdersData,
    multiRefresh: refetchOrders,
    total: totalOpenOrders,
  } = usePollOpenLimitOrders(tableState);

  const { multiRefresh: refetchMarketHistory } =
    usePollMarketOrders(tableState);
  const openOrders = useMemo(
    () => generateMarketOrders(openLimitOrdersData, markets) as ILimitOrder[],
    [openLimitOrdersData, markets],
  );

  const headers = [
    {
      title: "Positions",
      counts: totalPositions ?? 0,
      type: "positions",
    },
    {
      title: "Open Orders",
      counts: totalOpenOrders ?? 0,
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

  return (
    <div>
      <div className="flex min-h-[64px] w-full flex-col items-center justify-between rounded-t-md bg-muted p-2 py-4 sm:flex-row sm:px-6">
        <div className="mr-2 flex flex-1 gap-3 text-foreground sm:gap-6">
          {headers.map((header, index) => (
            <div
              onClick={() =>
                setTableState((prev) => ({
                  ...defaultTableState,
                  tabType: header.type as TableTabTypes,
                }))
              }
              key={index}
              className={cn(
                "flex cursor-pointer items-center gap-2",
                tableState.tabType === header.type
                  ? "text-sm font-semibold"
                  : "text-xs font-medium text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "text-xs hover:underline",
                  tableState.tabType === header.type
                    ? "font-semibold"
                    : "font-medium text-muted-foreground",
                )}
              >
                {header.title}
              </div>
              {header.counts && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-background sm:w-8">
                  {header.counts}
                </span>
              )}
            </div>
          ))}
        </div>
        {(tableState.tabType === "positions" ||
          tableState.tabType === "orders") && (
          <div className="mt-4 block w-full border-t border-border pt-4 sm:hidden" />
        )}

        <CloseAllOrders
          orders={
            tableState.tabType === "positions" ? openPositions : openOrders
          }
          tableState={tableState}
          setTableState={setTableState}
          refetchPositions={refetchPositions}
          refetchOrders={refetchOrders}
          refetchMarketHistory={refetchMarketHistory}
        />
      </div>
    </div>
  );
}
