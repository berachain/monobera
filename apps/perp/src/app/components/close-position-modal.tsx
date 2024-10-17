import { useCallback, useContext, useEffect, useState } from "react";
import {
  TransactionActionType,
  formatUsd,
  tradingAbi,
  usePythUpdateFee,
} from "@bera/berajs";
import { tradingContractAddress } from "@bera/config";
import { ActionButton } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { usePriceData, useVaa } from "~/context/price-context";
import { TableContext } from "~/context/table-context";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollPrices } from "~/hooks/usePollPrices";
import type { IOpenTrade } from "~/types/order-history";
import { MarketTradePNL } from "./market-trade-pnl";

export function ClosePositionModal({
  trigger,
  disabled = false,
  openPosition,
  className = "",
  controlledOpen,
  onOpenChange,
}: {
  trigger?: any;
  disabled?: boolean;
  openPosition: IOpenTrade;
  className?: string;
  controlledOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
}) {
  const prices = usePriceData();
  const vaa = useVaa();
  const { data: pythUpdateFee } = usePythUpdateFee(
    vaa.current,
    openPosition?.market?.pair_index,
  );
  const [open, setOpen] = useState<boolean>(false);
  const { tableState } = useContext(TableContext);
  const { multiRefresh: refetchPositions } = usePollOpenPositions(tableState);
  const { multiRefresh: refetchMarketHistory } =
    usePollMarketOrders(tableState);

  useEffect(() => {
    if (controlledOpen && controlledOpen !== open) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen, open]);

  const handleOpenChange = (state: boolean) => {
    onOpenChange?.(state);
    setOpen(state);
  };

  const { marketPrices } = usePollPrices();
  const price = marketPrices[openPosition?.market?.pair_index ?? ""] ?? "0";

  const positionSize = formatFromBaseUnit(
    openPosition.position_size ?? "0",
    18,
  ).times(openPosition.leverage ?? "1");
  const openPrice = formatFromBaseUnit(openPosition.open_price ?? "0", 10);
  const size = positionSize.div(openPrice).dp(4).toString(10);

  const ticker = openPosition?.market?.name?.split("-")[0];

  const { isLoading, isSubmitting, write, ModalPortal } = useOctTxn({
    message: `Closing ${openPosition?.market?.name ?? ""} ${
      openPosition?.buy === true ? "Long" : "Short"
    } position`,
    actionType: TransactionActionType.CANCEL_ORDER,
    onSuccess: () => {
      refetchPositions();
      refetchMarketHistory();
      handleOpenChange(false);
    },
  });

  const handleClosePosition = useCallback(() => {
    write({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "closeTradeMarket",
      params: [BigInt(openPosition?.index), vaa.current],
      value: pythUpdateFee,
    });
  }, [prices, openPosition, write, pythUpdateFee]);

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
                  {size ?? 0} {ticker}
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {price !== "0" ? (
                    `${formatUsd(price)} / ${ticker}`
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
                  {openPosition?.liq_price !== "0" ? (
                    formatUsd(
                      formatFromBaseUnit(openPosition?.liq_price, 10).toString(
                        10,
                      ),
                    )
                  ) : (
                    <Skeleton className={"h-[28px] w-[80px]"} />
                  )}
                </div>
              </div>
              <div>
                <div className="text-right text-xs leading-[10px] text-muted-foreground">
                  Executed at
                </div>
                <div className=" text-right text-sm  font-semibold leading-5 text-foreground">
                  {formatUsd(openPrice.toString(10) ?? 0)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-fit justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="text-xs text-muted-foreground">
                UnRealized PnL
              </div>
              <MarketTradePNL
                position={openPosition}
                positionSize={openPosition.position_size}
              />
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
              disabled={isLoading || isSubmitting}
              onClick={handleClosePosition}
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
