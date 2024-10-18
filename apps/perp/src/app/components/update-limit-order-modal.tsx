import { useCallback, useContext, useEffect, useState } from "react";
import {
  TransactionActionType,
  formatUsd,
  tradingAbi,
  usePrevious,
  usePythUpdateFee,
} from "@bera/berajs";
import { tradingContractAddress } from "@bera/config";
import { useOctTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { parseUnits as ethersParseUnits } from "ethers";
import { parseUnits } from "viem";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { usePriceData, useVaa } from "~/context/price-context";
import { TableContext } from "~/context/table-context";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePollOpenLimitOrders } from "~/hooks/usePollOpenLimitOrders";
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
  const prices = usePriceData();
  const vaa = useVaa();
  const { data: pythUpdateFee } = usePythUpdateFee(
    vaa.current,
    openOrder?.market?.pair_index,
  );
  const [open, setOpen] = useState<boolean>(false);
  const prevOpen = usePrevious(open);
  const [tp, setTp] = useState<string>(
    formatFromBaseUnit(openOrder?.tp, 10).toString(10),
  );
  const [sl, setSl] = useState<string>(
    formatFromBaseUnit(openOrder?.sl, 10).toString(10),
  );
  const { tableState } = useContext(TableContext);
  const { multiRefresh: refetchOrders } = usePollOpenLimitOrders(tableState);

  const formattedPrice = formatFromBaseUnit(
    openOrder.min_price ?? "0",
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
  const openPrice = formatFromBaseUnit(openOrder?.min_price ?? "0", 10);
  const size = positionSize.div(openPrice).dp(4).toString(10);

  const ticker = openOrder?.market?.name?.split("-")[0];

  const [executionPrice, setExecutionPrice] = useState<string>(formattedPrice);
  const { isLoading, write, ModalPortal } = useOctTxn({
    message: "Updating Open Limit Order",
    actionType: TransactionActionType.EDIT_PERPS_ORDER,
    onSuccess: () => {
      refetchOrders();
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

  const liqPrice = useCalculateLiqPrice({
    orderType: openOrder?.buy === true ? "long" : "short",
    price: formatFromBaseUnit(openOrder?.min_price ?? "0", 10).toString(10),
    leverage: openOrder?.leverage,
  });

  const handleUpdateLimitOrder = useCallback(async () => {
    if (openOrder === undefined) return;
    await write({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "updateOpenLimitOrder",
      params: [
        BigInt(openOrder?.index),
        parseUnits(`${executionPrice}`, 10),
        ethersParseUnits(
          tp === "" || tp === "NaN" ? "0" : BigNumber(tp).dp(10).toString(10),
          10,
        ),
        ethersParseUnits(
          sl === "" || sl === "NaN" ? "0" : BigNumber(sl).dp(10).toString(10),
          10,
        ),
        vaa.current,
      ],
      value: pythUpdateFee,
    });
  }, [openOrder, write, tp, sl, executionPrice, prices]);

  return (
    <div className={className}>
      {ModalPortal}
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
          <Button disabled={isLoading} onClick={handleUpdateLimitOrder}>
            Update Limit Order
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
