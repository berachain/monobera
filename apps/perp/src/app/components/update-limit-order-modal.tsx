import { useCallback, useEffect, useState } from "react";
import { TRADING_ABI, TransactionActionType, formatUsd } from "@bera/berajs";
import { usePrevious } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { parseUnits as ethersParseUnits } from "ethers";
import { mutate } from "swr";
import { parseUnits, type Address } from "viem";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { ILimitOrder } from "~/types/order-history";
import { TPSL } from "../berpetuals/components/tpsl";

export function UpdateLimitOrderModal({
  trigger,
  openOrder,
  className = "",
}: {
  trigger: any;
  type: "market" | "limit";
  disabled?: boolean;
  openOrder: ILimitOrder;
  className?: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const prevOpen = usePrevious(open);
  const [tp, setTp] = useState<string>(
    formatFromBaseUnit(openOrder?.tp, 10).toString(10),
  );
  const [sl, setSl] = useState<string>(
    formatFromBaseUnit(openOrder?.sl, 10).toString(10),
  );
  const { QUERY_KEY } = usePollOpenPositions();

  const formattedPrice = formatFromBaseUnit(
    openOrder.price ?? "0",
    10,
  ).toString(10);

  useEffect(() => {
    setTp(formatFromBaseUnit(openOrder?.tp, 10).toString(10));
    setSl(
      openOrder?.sl === "0"
        ? ""
        : formatFromBaseUnit(openOrder?.sl, 10).toString(10),
    );
  }, [openOrder.tp, openOrder.sl]);

  const positionSize = formatFromBaseUnit(
    openOrder.position_size ?? "0",
    18,
  ).times(openOrder.leverage ?? "1");
  const openPrice = formatFromBaseUnit(openOrder?.price ?? "0", 10);
  const size = positionSize.div(openPrice).dp(4).toString(10);

  const ticker = openOrder?.market?.name?.split("-")[0];

  const [executionPrice, setExecutionPrice] = useState<string>(formattedPrice);
  const { isLoading, write } = useOctTxn({
    message: "Updating Open Limit Order",
    actionType: TransactionActionType.EDIT_PERPS_ORDER,
    onSuccess: () => {
      void mutate(QUERY_KEY);
      setOpen(false);
    },
  });

  useEffect(() => {
    if (!open && prevOpen !== open) {
      setTp(formatFromBaseUnit(openOrder?.tp, 10).toString(10));
      setSl(
        openOrder?.sl === "0"
          ? ""
          : formatFromBaseUnit(openOrder?.sl, 10).toString(10),
      );
      setExecutionPrice(formattedPrice);
    }
  }, [open, prevOpen, openOrder, formattedPrice]);

  const handleTPSLChange = useCallback(
    (value: string, key: string) =>
      key === "tp" ? setTp(value) : setSl(value),
    [setTp, setSl],
  );

  const formattedBfLong = formatFromBaseUnit(
    openOrder?.market.pair_borrowing_fee?.bf_long ?? "0",
    18,
  ).toString(10);
  const formattedBfShort = formatFromBaseUnit(
    openOrder?.market.pair_borrowing_fee?.bf_short ?? "0",
    18,
  ).toString(10);

  const liqPrice = useCalculateLiqPrice({
    bfLong: formattedBfLong,
    bfShort: formattedBfShort,
    orderType: openOrder?.buy === true ? "long" : "short",
    price: openOrder?.price ?? "0",
    leverage: openOrder?.leverage,
  });

  const payload = [
    openOrder?.market.pair_index,
    openOrder?.index,
    parseUnits(`${executionPrice}`, 10),
    ethersParseUnits(
      tp === "" || tp === "NaN" ? "0" : BigNumber(tp).dp(10).toString(10),
      10,
    ),
    ethersParseUnits(
      sl === "" || sl === "NaN" ? "0" : BigNumber(sl).dp(10).toString(10),
      10,
    ),
  ];

  return (
    <div className={className}>
      <div onClick={() => setOpen(true)} className="h-full w-full">
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-fit">
          <div className="text-lg font-semibold leading-7">
            Update Limit Order
          </div>

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
                  {formattedPrice !== undefined ? (
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
                  {formatUsd(formattedPrice)}
                </div>
              </div>
            </div>
          </div>
          <div className=" text-xs font-medium">
            Execution Price{" "}
            <Input
              value={executionPrice}
              type="number"
              className=" mt-2 h-8 w-full rounded-lg bg-background text-xs lg:w-[102px]"
              min={0}
              onKeyDown={(e) =>
                (e.key === "-" || e.key === "e" || e.key === "E") &&
                e.preventDefault()
              }
              onChange={(e: { target: { value: string } }) =>
                setExecutionPrice(e.target.value)
              }
            />
          </div>

          <TPSL
            leverage={openOrder?.leverage ?? 2}
            tp={tp}
            sl={sl}
            formattedPrice={executionPrice}
            liqPrice={liqPrice}
            long={openOrder?.buy === true}
            tpslOnChange={handleTPSLChange}
          />
          <Button
            disabled={isLoading}
            onClick={() => {
              write({
                address: process.env
                  .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address,
                abi: TRADING_ABI,
                functionName: "updateOpenLimitOrder",
                params: payload,
              });
            }}
          >
            Update Limit Order
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
