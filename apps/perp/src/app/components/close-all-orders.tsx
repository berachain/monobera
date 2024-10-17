import { useCallback, useMemo, type Dispatch } from "react";
import {
  TransactionActionType,
  tradingAbi,
  usePythUpdateFee,
} from "@bera/berajs";
import { tradingContractAddress } from "@bera/config";
import { Tooltip } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { encodeFunctionData, type Address } from "viem";

import { createCloseOrderPayload } from "~/utils/generateCloseOrderPayload";
import { useVaa } from "~/context/price-context";
import type {
  CloseOrderPayload,
  ILimitOrder,
  IOpenTrade,
} from "~/types/order-history";
import type { TableStateProps } from "~/types/table";

interface CloseAllOrdersProps {
  tableState: TableStateProps;
  setTableState: Dispatch<React.SetStateAction<TableStateProps>>;
  orders: IOpenTrade[] | ILimitOrder[];
  refetchMarketHistory: () => void;
  refetchOrders?: () => void;
  refetchPositions: () => void;
}

export const CloseAllOrders = ({
  tableState,
  setTableState,
  orders,
  refetchMarketHistory,
  refetchOrders,
  refetchPositions,
}: CloseAllOrdersProps) => {
  const vaa = useVaa();

  const closePositionsPayload = useMemo<CloseOrderPayload[]>(() => {
    return createCloseOrderPayload(orders, tableState.selection || {});
  }, [orders, tableState.selection]);

  const closeOrdersPayload = useMemo<CloseOrderPayload[]>(() => {
    return createCloseOrderPayload(orders, tableState.selection || {});
  }, [orders, tableState.selection]);

  const { data: pythUpdateFee } = usePythUpdateFee(
    Array(closeOrdersPayload.length).fill(vaa.current[0]),
    closePositionsPayload.map((pos) => pos?.pairIndex.toString()).join(),
  );

  const {
    isLoading: isClosePositionsLoading,
    write: writePositionsClose,
    ModalPortal: PositionsModal,
  } = useOctTxn({
    message: "Closing All Open Positions",
    actionType: TransactionActionType.CANCEL_ALL_ORDERS,
    onSuccess: () => {
      setTableState((prev) => ({
        ...prev,
        selection: {},
      }));
      refetchPositions();
      refetchMarketHistory();
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
      setTableState((prev) => ({
        ...prev,
        selection: {},
      }));
      refetchOrders?.();
      refetchMarketHistory();
    },
  });

  const selectionSize = Object.keys(tableState.selection ?? {}).length;

  const handleCloseAllPositions = useCallback(() => {
    const encodedData = closePositionsPayload.map((pos) => {
      return encodeFunctionData({
        abi: tradingAbi,
        functionName: "closeTradeMarket",
        args: [pos.index, vaa.current],
      });
    });

    writePositionsClose({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "multicall",
      params: [true, encodedData],
      value: pythUpdateFee,
    });
  }, [closePositionsPayload, vaa, writePositionsClose]);

  const handleCloseAllOrders = useCallback(() => {
    const encodedData = closeOrdersPayload.map((order) => {
      return encodeFunctionData({
        abi: tradingAbi,
        functionName: "cancelOpenLimitOrder",
        args: [order.index],
      });
    });
    writeOrdersClose({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "multicall",
      params: [true, encodedData],
    });
  }, [closeOrdersPayload, writeOrdersClose]);

  return (
    <div>
      {PositionsModal}
      {OrdersModal}
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
            onClick={handleCloseAllOrders}
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
  );
};
