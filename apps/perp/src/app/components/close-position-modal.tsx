import { useState } from "react";
import { TRADING_ABI, TransactionActionType, formatUsd } from "@bera/berajs";
import { ActionButton } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { ActivePositionPNL } from "../berpetuals/components/columns";
import { type IMarketOrder } from "../berpetuals/components/order-history";

export function ClosePositionModal({
  trigger,
  disabled = false,
  openPosition,
  className = "",
}: {
  trigger: any;
  disabled?: boolean;
  openPosition: IMarketOrder;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const { refetch } = usePollOpenPositions();

  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(
    Number(openPosition?.market?.pair_index ?? 0),
  );
  const positionSize =
    Number(formatUnits(BigInt(openPosition.position_size ?? 0), 18)) *
    Number(openPosition.leverage);
  const openPrice = Number(
    formatUnits(BigInt(openPosition.open_price ?? 0), 10),
  );
  const size = positionSize / openPrice;

  const ticker = openPosition?.market?.name?.split("-")[0];

  const { isLoading, write } = useOctTxn({
    message: `Closing ${openPosition?.market?.name} ${
      openPosition?.buy === true ? "Long" : "Short"
    } position`,
    actionType: TransactionActionType.CANCEL_ORDER,
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const formattedPrice = Number(
    formatUnits(BigInt(openPosition?.open_price ?? 0n), 10),
  );

  const liqPrice = useCalculateLiqPrice({
    bfLong: openPosition?.market.pair_borrowing_fee?.bf_long,
    bfShort: openPosition?.market.pair_borrowing_fee?.bf_short,
    orderType: openPosition?.buy === true ? "long" : "short",
    price: formattedPrice,
    leverage: openPosition?.leverage,
  });

  return (
    <div className={className}>
      <div onClick={() => !disabled && setOpen(true)} className="h-full w-full">
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[342px]">
          <div className="text-lg font-semibold leading-7">Close Position</div>

          <div className="flex h-fit justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                <Avatar className="h-4 w-4">
                  <AvatarImage src={openPosition?.market?.imageUri} />
                  <AvatarFallback>btc</AvatarFallback>
                </Avatar>
                {openPosition?.market?.name} /
                <span
                  className={cn(
                    "",
                    openPosition?.buy === true
                      ? "text-success-foreground"
                      : "text-destructive-foreground",
                  )}
                >
                  {openPosition?.buy === true ? "Long" : "Short"}
                </span>
              </div>
              <div>
                <div className="text-lg font-semibold leading-7 text-muted-foreground">
                  {size.toFixed(4) ?? 0} {ticker}
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {price !== undefined ? (
                    formatBigIntUsd(price, 10) + " / " + ticker
                  ) : (
                    <Skeleton className="h-[28px] w-[80px]" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex h-full flex-col justify-between gap-2">
              <div>
                <div className="text-right  text-xs leading-[10px] text-muted-foreground">
                  Liquidation Price
                </div>
                <div className=" text-right  text-sm  font-semibold leading-5 text-foreground">
                  {formatUsd(liqPrice ?? 0)}
                </div>
              </div>
              <div>
                <div className="text-right text-xs leading-[10px] text-muted-foreground">
                  Executed at
                </div>
                <div className=" text-right text-sm  font-semibold leading-5 text-foreground">
                  {formatBigIntUsd(openPosition?.open_price ?? 0, 10)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-[70px] justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="text-xs text-muted-foreground">
                UnRealized PnL
              </div>
              <ActivePositionPNL position={openPosition} />
            </div>
            <div className="flex h-full flex-col justify-between">
              <div className="text-right text-xs text-muted-foreground ">
                Leverage
              </div>
              <div className=" text-right text-sm font-semibold text-foreground ">
                {openPosition?.leverage}x
              </div>
            </div>
          </div>
          <ActionButton>
            <Button
              disabled={isLoading}
              onClick={() => {
                write({
                  address: process.env
                    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                  abi: TRADING_ABI,
                  functionName: "closeTradeMarket",
                  params: [
                    openPosition?.market?.pair_index,
                    openPosition?.index,
                  ],
                });
              }}
              className="w-full bg-destructive text-destructive-foreground"
            >
              Close Position
            </Button>
          </ActionButton>
        </DialogContent>
      </Dialog>
    </div>
  );
}
