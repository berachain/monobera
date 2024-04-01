import { TRADING_ABI, TransactionActionType } from "@bera/berajs";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Switch } from "@bera/ui/switch";
import { RowSelectionState } from "@tanstack/react-table";
import { mutate } from "swr";
import { encodeFunctionData, type Address } from "viem";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { CloseOrderPayload } from "~/types/order-history";
import type { TableTabTypes } from "~/types/table-tab-types";

export function OrderHistoryHeader({
  headers,
  tabType,
  setTabType,
  closePositionsPayload,
  closeOrdersPayload,
  selection,
}: {
  headers: {
    title: string;
    counts?: number;
    type: string;
  }[];
  tabType: TableTabTypes;
  setTabType: (type: TableTabTypes) => void;
  closePositionsPayload: CloseOrderPayload[];
  closeOrdersPayload: CloseOrderPayload[];
  selection: RowSelectionState;
}) {
  const { QUERY_KEY } = usePollOpenPositions();

  const { isLoading: isClosePositionsLoading, write: writePositionsClose } =
    useOctTxn({
      message: "Closing All Open Positions",
      actionType: TransactionActionType.CANCEL_ALL_ORDERS,
      onSuccess: () => {
        void mutate(QUERY_KEY);
      },
    });
  const { isLoading: isCloseLimitOrdersLoading, write: writeOrdersClose } =
    useOctTxn({
      message: "Closing All Open Orders",
      actionType: TransactionActionType.CANCEL_ALL_ORDERS,
      onSuccess: () => {
        void mutate(QUERY_KEY);
      },
    });

  const selectionSize = Object.keys(selection).length;

  return (
    <div>
      <div className="flex min-h-[64px] w-full flex-col items-center justify-between rounded-t-md bg-muted px-6 py-4 sm:flex-row">
        <div className="mr-4 flex flex-1 gap-10 text-foreground">
          {headers.map((header, index) => (
            <div
              onClick={() => setTabType(header.type as TableTabTypes)}
              key={index}
              className={cn(
                "flex cursor-pointer items-center gap-2",
                tabType === header.type
                  ? "text-sm font-semibold"
                  : "text-xs font-medium text-muted-foreground",
              )}
            >
              <div
                className={cn(
                  "hover:underline",
                  tabType === header.type
                    ? "text-sm font-semibold"
                    : "text-xs font-medium text-muted-foreground",
                )}
              >
                {header.title}
              </div>
              {header.counts && (
                <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-background">
                  {header.counts}
                </span>
              )}
            </div>
          ))}
        </div>
        {(tabType === "positions" || tabType === "orders") && (
          <div className="mt-4 block w-full border-t border-border pt-4 sm:hidden" />
        )}
        {tabType === "positions" && (
          <div className="flex flex-grow-0">
            {/* <div className="float-right flex-grow-0 justify-center mr-4 items-center hidden lg:flex">
              <span className="text-xs font-medium flex-grow-0">{`${
                showOrderLines ? "Hide" : "Show"
              } Order Lines`}</span>
              <Switch
                className="data-[state=checked]:bg-success-foreground ml-2"
                id="show-orders"
                checked={showOrderLines}
                onCheckedChange={(checked) => setShowOrderLines(checked)}
              />
            </div> */}
            <Button
              className="h-full w-fit min-w-0 cursor-pointer rounded-sm bg-destructive px-2 py-1 text-center text-sm font-semibold text-destructive-foreground hover:opacity-80"
              disabled={
                isClosePositionsLoading || closePositionsPayload?.length === 0
              }
              onClick={() => {
                const encodedData = closePositionsPayload.map((pos) => {
                  return encodeFunctionData({
                    abi: TRADING_ABI,
                    functionName: "closeTradeMarket",
                    args: [pos.pairIndex, pos.index],
                  });
                });
                writePositionsClose({
                  address: process.env
                    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                  abi: TRADING_ABI,
                  functionName: "tryAggregate",
                  params: [true, encodedData],
                });
              }}
            >
              {`🌋 Close ${selectionSize ? selectionSize : "All"} Position${
                selectionSize && selectionSize === 1 ? "" : "s"
              }`}
            </Button>
          </div>
        )}

        {tabType === "orders" && (
          <div className="flex flex-grow-0">
            <Button
              className="h-full w-full min-w-44 cursor-pointer rounded-sm bg-destructive px-2 py-1 text-center text-sm font-semibold text-destructive-foreground hover:opacity-80 md:w-fit md:min-w-0"
              disabled={
                isCloseLimitOrdersLoading || closeOrdersPayload?.length === 0
              }
              onClick={() => {
                const encodedData = closeOrdersPayload.map((order) => {
                  return encodeFunctionData({
                    abi: TRADING_ABI,
                    functionName: "cancelOpenLimitOrder",
                    args: [order.pairIndex, order.index],
                  });
                });
                writeOrdersClose({
                  address: process.env
                    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                  abi: TRADING_ABI,
                  functionName: "tryAggregate",
                  params: [true, encodedData],
                });
              }}
            >
              {`🌋 Close ${selectionSize ? selectionSize : "All"} Order${
                selectionSize && selectionSize === 1 ? "" : "s"
              }`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
