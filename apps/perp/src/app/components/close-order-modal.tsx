import { useCallback, useContext, useEffect, useState } from "react";
import { TransactionActionType, formatUsd, tradingAbi } from "@bera/berajs";
import { tradingContractAddress } from "@bera/config";
import { ActionButton } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { type Address } from "viem";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { TableContext } from "~/context/table-context";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePollOpenLimitOrders } from "~/hooks/usePollOpenLimitOrders";
import type { ILimitOrder } from "~/types/order-history";

export function CloseOrderModal({
  trigger,
  disabled = false,
  openOrder,
  className = "",
  controlledOpen,
  onOpenChange,
}: {
  trigger?: any;
  disabled?: boolean;
  openOrder: ILimitOrder;
  className?: string;
  controlledOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { tableState } = useContext(TableContext);
  const { multiRefresh: refetchOrders } = usePollOpenLimitOrders(tableState);

  useEffect(() => {
    if (controlledOpen && controlledOpen !== open) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen, open]);

  const handleOpenChange = (state: boolean) => {
    onOpenChange?.(state);
    setOpen(state);
  };

  const positionSize = formatFromBaseUnit(
    openOrder.position_size ?? "0",
    18,
  ).times(openOrder.leverage ?? "1");
  const openPrice = formatFromBaseUnit(openOrder.min_price ?? "0", 10);
  const size = positionSize.div(openPrice).dp(4).toString(10);

  const ticker = openOrder?.market?.name?.split("-")[0];

  const { isLoading, isSubmitting, write, ModalPortal } = useOctTxn({
    message: `Closing ${openOrder?.market?.name ?? ""} ${
      openOrder?.buy === true ? "Long" : "Short"
    } Limit Order`,
    actionType: TransactionActionType.CANCEL_ORDER,
    onSuccess: () => {
      refetchOrders();
      handleOpenChange(false);
    },
  });

  const formattedTp = formatFromBaseUnit(openOrder.tp ?? "0", 10).toString(10);
  const formattedSl = formatFromBaseUnit(openOrder.sl ?? "0", 10).toString(10);
  const formattedPrice = formatFromBaseUnit(
    openOrder.min_price ?? "0",
    10,
  ).toString(10);

  const liqPrice = useCalculateLiqPrice({
    orderType: openOrder?.buy === true ? "long" : "short",
    price: openPrice.toString(10),
    leverage: openOrder?.leverage,
  });

  const handleCancelLimitOrder = useCallback(async () => {
    write({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "cancelOpenLimitOrder",
      params: [BigInt(openOrder?.index)],
    });
  }, [openOrder, write]);

  return (
    <div className={className}>
      {ModalPortal}
      <div
        onClick={() => !disabled && handleOpenChange(true)}
        className="h-full w-full"
      >
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-fit">
          <div className="text-lg font-semibold leading-7">
            Cancel Limit Order
          </div>
          <div className="flex h-[108px] justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={openOrder?.market?.imageUri} />
                  <AvatarFallback>btc</AvatarFallback>
                </Avatar>
                {openOrder?.market?.name} /
                <span
                  className={cn(
                    "",
                    openOrder?.buy === true
                      ? "text-success-foreground"
                      : "text-destructive-foreground",
                  )}
                >
                  {openOrder?.buy === true ? "Limit-Long" : "Limit-Short"}
                </span>
                {" / "}
                {openOrder.leverage}x
              </div>
              <div>
                <div className="text-lg font-semibold leading-7 text-muted-foreground">
                  {size ?? "0"} {ticker}
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {formattedPrice ? (
                    `${formatUsd(formattedPrice)} / ${ticker}`
                  ) : (
                    <Skeleton className="h-[28px] w-[80px]" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="text-right  text-[10px] leading-[10px] text-muted-foreground">
                  Liquidation Price
                </div>
                <div className=" text-right text-sm font-semibold leading-5 text-destructive-foreground">
                  {formatUsd(liqPrice ?? 0)}
                </div>
              </div>
              <div>
                <div className="text-right text-[10px] leading-[10px] text-muted-foreground">
                  Current Execution Price
                </div>
                <div className=" text-right text-sm font-semibold leading-5 text-foreground">
                  {formatUsd(formattedPrice ?? 0)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-row justify-between">
              <div className="text-sm text-muted-foreground">Take Profit</div>
              <div className="text-sm text-success-foreground">
                {formattedTp === "0" ? "None" : formatUsd(formattedTp)}
              </div>
            </div>
            <div className="flex w-full flex-row justify-between">
              <div className="text-sm text-muted-foreground">Stop Loss</div>
              <div className="text-sm text-destructive-foreground">
                {formattedSl === "0" ? "None" : formatUsd(formattedSl)}
              </div>
            </div>
          </div>
          <ActionButton>
            <Button
              className="w-full"
              disabled={isLoading || isSubmitting}
              onClick={handleCancelLimitOrder}
            >
              Cancel Limit Order
            </Button>
          </ActionButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
