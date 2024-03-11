"use client";

import { TRADING_ABI, TransactionActionType } from "@bera/berajs";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { mutate } from "swr";
import { type Address } from "viem";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";

export type BerpTabTypes = "positions" | "orders" | "history" | "pnl";

export function OrderHistoryHeader({
  headers,
  tabType,
  setTabType,
  closePositionsPayload,
  closeOrdersPayload,
}: {
  headers: {
    title: string;
    counts?: number;
    type: string;
  }[];
  tabType: BerpTabTypes;
  setTabType: (type: BerpTabTypes) => void;
  closePositionsPayload: any[];
  closeOrdersPayload: any[];
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

  return (
    <div>
      <div className="sm: flex h-[70px] h-fit w-full flex-col items-center justify-between border-y border-border bg-muted px-6 py-4 sm:flex-row">
        <div className=" flex gap-10 text-foreground">
          {headers.map((header, index) => (
            <div
              onClick={() => setTabType(header.type as BerpTabTypes)}
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
          <Button
            className="h-full w-full cursor-pointer rounded-sm bg-destructive px-2 py-1 text-center text-sm font-semibold text-destructive-foreground hover:opacity-80 sm:w-fit"
            disabled={
              isClosePositionsLoading || closePositionsPayload?.length === 0
            }
            onClick={() => {
              writePositionsClose({
                address: process.env
                  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                abi: TRADING_ABI,
                functionName: "closeTradesMarket",
                params: [closePositionsPayload],
              });
            }}
          >
            🌋 Close All Positions
          </Button>
        )}

        {tabType === "orders" && (
          <Button
            className="h-full w-full cursor-pointer rounded-md bg-destructive px-2 py-1 text-center text-sm font-semibold text-destructive-foreground hover:opacity-80 sm:w-fit"
            disabled={
              isCloseLimitOrdersLoading || closeOrdersPayload?.length === 0
            }
            onClick={() => {
              writeOrdersClose({
                address: process.env
                  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                abi: TRADING_ABI,
                functionName: "cancelOpenLimitOrders",
                params: [closeOrdersPayload],
              });
            }}
          >
            🌋 Close All Orders
          </Button>
        )}
      </div>
    </div>
  );
}
