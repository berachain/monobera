import { useState } from "react";
import { TRADING_ABI, TransactionActionType, formatUsd } from "@bera/berajs";
import { ActionButton } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { mutate } from "swr";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { type ILimitOrder } from "../berpetuals/components/order-history";

export function CloseOrderModal({
  trigger,
  disabled = false,
  openOrder,
  className = "",
}: {
  trigger: any;
  disabled?: boolean;
  openOrder: ILimitOrder;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { QUERY_KEY } = usePollOpenPositions();

  const positionSize =
    Number(formatUnits(BigInt(openOrder.position_size ?? 0), 18)) *
    Number(openOrder.leverage);
  const openPrice = Number(formatUnits(BigInt(openOrder.price ?? 0), 10));
  const size = positionSize / openPrice;

  const ticker = openOrder?.market?.name?.split("-")[0];

  const { isLoading, write } = useOctTxn({
    message: `Closing ${openOrder?.market?.name} ${
      openOrder?.buy === true ? "Long" : "Short"
    } Limit Order`,
    actionType: TransactionActionType.CANCEL_ORDER,
    onSuccess: () => {
      void mutate(QUERY_KEY);
      setOpen(false);
    },
  });

  const formattedPrice = Number(
    formatUnits(BigInt(openOrder?.price ?? 0n), 10),
  );
  const formattedCurrentPrice = Number(
    formatUnits(BigInt(openOrder.price ?? 0), 10),
  );

  const liqPrice = useCalculateLiqPrice({
    bfLong: formatUnits(
      BigInt(openOrder?.market.pair_borrowing_fee?.bf_long ?? 0n),
      18,
    ),
    bfShort: formatUnits(
      BigInt(openOrder?.market.pair_borrowing_fee?.bf_short ?? 0n),
      18,
    ),
    orderType: openOrder?.buy === true ? "long" : "short",
    price: formattedPrice,
    leverage: openOrder?.leverage,
  });

  return (
    <div className={className}>
      <div onClick={() => !disabled && setOpen(true)} className="h-full w-full">
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
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
                  {size.toFixed(4) ?? 0} {ticker}
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {formattedCurrentPrice !== undefined ? (
                    formatUsd(formattedCurrentPrice) + " / " + ticker
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
                  {formatBigIntUsd(openOrder?.price ?? 0, 10)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-row justify-between">
              <div className="text-sm text-muted-foreground">Take Profit</div>
              <div className="text-sm text-success-foreground">
                {Number(openOrder?.tp) === 0
                  ? "None"
                  : formatBigIntUsd(openOrder?.tp ?? 0, 10)}
              </div>
            </div>
            <div className="flex w-full flex-row justify-between">
              <div className="text-sm text-muted-foreground">Stop Loss</div>
              <div className="text-sm text-destructive-foreground">
                {Number(openOrder?.sl) === 0
                  ? "None"
                  : formatBigIntUsd(openOrder?.sl ?? 0, 10)}
              </div>
            </div>
          </div>
          <ActionButton>
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() => {
                write({
                  address: process.env
                    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                  abi: TRADING_ABI,
                  functionName: "cancelOpenLimitOrder",
                  params: [openOrder?.market?.pair_index, openOrder?.index],
                });
              }}
            >
              Cancel Limit Order
            </Button>
          </ActionButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
