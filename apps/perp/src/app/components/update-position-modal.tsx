import { useCallback, useEffect, useState } from "react";
import { tradingAbi, TransactionActionType, formatUsd } from "@bera/berajs";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { parseUnits } from "ethers";
import { mutate } from "swr";
import { type Address } from "viem";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import type { IMarketOrder } from "~/types/order-history";
import { TPSL } from "../berpetuals/components/tpsl";
import { ActivePositionPNL } from "./table-columns/positions";

export function UpdatePositionModal({
  trigger,
  openPosition,
  className = "",
  controlledOpen,
  onOpenChange,
}: {
  trigger?: any;
  disabled?: boolean;
  openPosition: IMarketOrder;
  className?: string;
  controlledOpen?: boolean;
  onOpenChange?: (state: boolean) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [tp, setTp] = useState<string>(
    formatFromBaseUnit(openPosition?.tp, 10).toString(10),
  );

  const [sl, setSl] = useState<string>(
    formatFromBaseUnit(openPosition?.sl, 10).toString(10),
  );
  const { QUERY_KEY } = usePollOpenPositions();

  useEffect(() => {
    setTp(formatFromBaseUnit(openPosition?.tp, 10).toString(10));
    setSl(
      openPosition?.sl === "0"
        ? ""
        : formatFromBaseUnit(openPosition?.sl, 10).toString(10),
    );
  }, [openPosition.tp, openPosition.sl]);

  useEffect(() => {
    if (controlledOpen && controlledOpen !== open) {
      setOpen(controlledOpen);
    }
  }, [controlledOpen, open]);

  const handleOpenChange = (state: boolean) => {
    onOpenChange?.(state);
    setOpen(state);
  };

  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(
    Number(openPosition?.market?.pair_index ?? 0),
  );
  const formattedPrice = formatFromBaseUnit(price ?? "0", 10).toString(10);

  const positionSize = formatFromBaseUnit(
    openPosition.position_size ?? "0",
    18,
  ).times(openPosition.leverage ?? "1");
  const openPrice = formatFromBaseUnit(openPosition?.open_price ?? "0", 10);
  const size = positionSize.div(openPrice).dp(4).toString(10);

  const ticker = openPosition?.market?.name?.split("-")[0];

  const { isLoading: isUpdateTPLoading, write: updateTpWrite } = useOctTxn({
    message: "Updating Take Profit Price",
    actionType: TransactionActionType.EDIT_PERPS_ORDER,
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  const { isLoading: isUpdateSLLoading, write: updateSlWrite } = useOctTxn({
    message: "Updating Stop Loss Price",
    actionType: TransactionActionType.EDIT_PERPS_ORDER,
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  const handleTPSLChange = useCallback(
    (value: string, key: string) =>
      key === "tp" ? setTp(value) : setSl(value),
    [setTp, setSl],
  );

  const updateTpParams = [
    openPosition?.market?.pair_index,
    openPosition?.index,
    parseUnits(
      tp === "" || tp === "NaN" ? "0" : BigNumber(tp).dp(10).toString(10),
      10,
    ),
  ];

  const updateSlParams = [
    openPosition?.market?.pair_index,
    openPosition?.index,
    parseUnits(
      sl === "" || sl === "NaN" ? "0" : BigNumber(sl).dp(10).toString(10),
      10,
    ),
  ];

  const liqPrice = formatFromBaseUnit(
    openPosition?.liq_price ?? "0",
    10,
  ).toString(10);

  return (
    <div className={className}>
      <div onClick={() => handleOpenChange(true)} className="h-full w-full">
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-fit">
          <div className="text-lg font-semibold leading-7">Update Position</div>

          <div className="px-1 text-sm font-medium leading-5 text-muted-foreground">
            Adjust your{" "}
            <span className="text-destructive-foreground">StopLoss</span> &/Or{" "}
            <span className="text-success-foreground">TakeProfit</span>, you can
            update one or both values.
          </div>

          <div className="flex h-[108px] justify-between rounded-lg border border-border bg-muted p-4">
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
                  {size ?? "0"} {ticker}
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {price !== undefined ? (
                    `${formattedPrice} / ${ticker}`
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
                <div className="text-right text-sm font-semibold leading-5 text-destructive-foreground">
                  {Number(openPosition?.liq_price) !== 0 ? (
                    formatUsd(liqPrice)
                  ) : (
                    <Skeleton className={"h-[28px] w-[80px]"} />
                  )}
                </div>
              </div>
              <div>
                <div className="text-right text-[10px] leading-[10px] text-muted-foreground">
                  Executed at
                </div>
                <div className=" text-right  text-sm font-semibold leading-5 text-foreground">
                  {formatUsd(openPrice.toString(10))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-fit justify-between rounded-lg border border-border bg-muted p-4">
            <div className="flex h-full flex-col justify-between">
              <div className="text-[10px] text-muted-foreground">
                UnRealized PnL
              </div>
              <ActivePositionPNL position={openPosition} />
            </div>
            <div className="flex h-full flex-col justify-between">
              <div className="text-[10px] text-muted-foreground">Leverage</div>
              <div className=" text-sm font-semibold text-foreground">
                {openPosition?.leverage}x
              </div>
            </div>
          </div>
          <TPSL
            leverage={openPosition?.leverage ?? 2}
            tp={tp}
            sl={sl}
            formattedPrice={openPrice.toString(10)}
            isUpdate
            liqPrice={openPosition.liq_price !== "0" ? liqPrice : undefined}
            long={openPosition?.buy}
            isSlSubmitLoading={isUpdateSLLoading}
            isTpSubmitLoading={isUpdateTPLoading}
            onTpChangeSubmit={() => {
              updateTpWrite({
                address: process.env
                  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                abi: tradingAbi,
                functionName: "updateTp",
                params: updateTpParams,
              });
            }}
            onSlChangeSubmit={() => {
              updateSlWrite({
                address: process.env
                  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                abi: tradingAbi,
                functionName: "updateSl",
                params: updateSlParams,
              });
            }}
            tpslOnChange={handleTPSLChange}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
