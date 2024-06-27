import { useCallback, useContext, useMemo } from "react";
import {
  TransactionActionType,
  tradingAbi,
  usePythUpdateFee,
} from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { RowSelectionState } from "@tanstack/react-table";
import { encodeFunctionData, type Address } from "viem";

import { generateEncodedPythPrices } from "~/utils/formatPyth";
import { generateMarketOrders } from "~/utils/generateMarketOrders";
import { usePriceData } from "~/context/price-context";
import { TableContext, defaultTableState } from "~/context/table-context";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import { usePollOpenLimitOrders } from "~/hooks/usePollOpenLimitOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { IMarket } from "~/types/market";
import type {
  CloseOrderPayload,
  ILimitOrder,
  IOpenTrade,
} from "~/types/order-history";
import type { TableTabTypes } from "~/types/table";

export function OrderHistoryHeader({ markets }: { markets: IMarket[] }) {
  const { tableState, setTableState } = useContext(TableContext);

  const {
    data: openPositionsData,
    refresh: refetchPositions,
    total: totalPositions,
  } = usePollOpenPositions(tableState);

  const openPositions = useMemo(
    () => generateMarketOrders(openPositionsData, markets) as IOpenTrade[],
    [openPositionsData, markets],
  );

  const {
    data: openLimitOrdersData,
    refresh: refetchOrders,
    total: totalOpenOrders,
  } = usePollOpenLimitOrders(tableState);

  const { refresh: refetchMarketHistory } = usePollMarketOrders(tableState);
  const openOrders = useMemo(
    () => generateMarketOrders(openLimitOrdersData, markets) as ILimitOrder[],
    [openLimitOrdersData, markets],
  );

  const prices = usePriceData();

  const openPositionsEncodedData = openPositions.reduce<string[]>(
    (acc, pos) => {
      return [
        ...acc,
        ...(generateEncodedPythPrices(prices, pos?.pair_index) ?? []),
      ];
    },
    [],
  );

  const { data: pythUpdateFee } = usePythUpdateFee(
    openPositionsEncodedData,
    openPositions.map((pos) => pos?.pair_index.toString()).join(),
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

  const createCloseOrderPayload = (
    positions: IOpenTrade[] | ILimitOrder[],
    tableStateSelection: RowSelectionState,
  ): CloseOrderPayload[] => {
    return (
      positions?.reduce<CloseOrderPayload[]>((acc, position, index) => {
        const shouldInclude =
          tableStateSelection && Object.keys(tableStateSelection).length !== 0
            ? tableStateSelection[index] === true
            : true;

        if (shouldInclude) {
          acc.push({
            pairIndex: BigInt(position.market?.pair_index ?? 0),
            index: BigInt(position?.index ?? 0),
          });
        }
        return acc;
      }, []) || []
    );
  };

  const closePositionsPayload = useMemo<CloseOrderPayload[]>(() => {
    return createCloseOrderPayload(openPositions, tableState.selection || {});
  }, [openPositions, tableState.selection]);

  const closeOrdersPayload = useMemo<CloseOrderPayload[]>(() => {
    return createCloseOrderPayload(openOrders, tableState.selection || {});
  }, [openOrders, tableState.selection]);

  const {
    isLoading: isClosePositionsLoading,
    write: writePositionsClose,
    ModalPortal: PositionsModal,
  } = useOctTxn({
    message: "Closing All Open Positions",
    actionType: TransactionActionType.CANCEL_ALL_ORDERS,
    onSuccess: () => {
      refetchPositions();
      refetchMarketHistory();
      setTableState((prev) => ({
        ...prev,
        selection: {},
      }));
    },
  });
  const {
    isLoading: isCloseLimitOrdersLoading,
    write: writeOrdersClose,
    ModalPortal: OrdersModal,
  } = useOctTxn({
    message: "Closing All Open Orders",
    actionType: TransactionActionType.CANCEL_ALL_ORDERS,
    onSuccess: () => {
      refetchOrders();
      setTableState((prev) => ({
        ...prev,
        selection: {},
      }));
    },
  });

  const selectionSize = Object.keys(tableState.selection ?? {}).length;

  const handleCloseAllPositions = useCallback(() => {
    const encodedData = closePositionsPayload.map((pos) => {
      return encodeFunctionData({
        abi: tradingAbi,
        functionName: "closeTradeMarket",
        args: [
          pos.index,
          generateEncodedPythPrices(prices, pos.pairIndex.toString()),
        ],
      });
    });
    writePositionsClose({
      address: process.env.NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
      abi: tradingAbi,
      functionName: "multicall",
      params: [true, encodedData],
      value: pythUpdateFee,
    });
  }, [closePositionsPayload, prices, writePositionsClose]);

  return (
    <div>
      {PositionsModal}
      {OrdersModal}
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
        {tableState.tabType === "positions" && (
          <div className="flex flex-grow-0">
            <Button
              className="h-full w-fit min-w-0 cursor-pointer rounded-sm bg-destructive px-2 py-1 text-center text-sm font-semibold text-destructive-foreground hover:opacity-80"
              disabled={
                isClosePositionsLoading || closePositionsPayload?.length === 0
              }
              onClick={handleCloseAllPositions}
            >
              {`🌋 Close ${selectionSize ? selectionSize : "All"} Position${
                selectionSize && selectionSize === 1 ? "" : "s"
              }`}
              <Tooltip
                className="ml-1"
                text="Can close a maximum of 10 positions at a time"
              />
            </Button>
          </div>
        )}

        {tableState.tabType === "orders" && (
          <div className="flex flex-grow-0">
            <Button
              className="h-full w-full min-w-44 cursor-pointer rounded-sm bg-destructive px-2 py-1 text-center text-sm font-semibold text-destructive-foreground hover:opacity-80 md:w-fit md:min-w-0"
              disabled={
                isCloseLimitOrdersLoading || closeOrdersPayload?.length === 0
              }
              onClick={() => {
                const encodedOrdersData = closeOrdersPayload.map((order) => {
                  return encodeFunctionData({
                    abi: tradingAbi,
                    functionName: "cancelOpenLimitOrder",
                    args: [order.index],
                  });
                });
                writeOrdersClose({
                  address: process.env
                    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                  abi: tradingAbi,
                  functionName: "multicall",
                  params: [true, encodedOrdersData],
                });
              }}
            >
              {`🌋 Close ${selectionSize ? selectionSize : "All"} Order${
                selectionSize && selectionSize === 1 ? "" : "s"
              }`}
              <Tooltip
                className="ml-1"
                text="Can close a maximum of 10 orders at a time"
              />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
