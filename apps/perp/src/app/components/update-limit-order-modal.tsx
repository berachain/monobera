import { useState } from "react";
import { TRADING_ABI, TransactionActionType, formatUsd } from "@bera/berajs";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";
import { Skeleton } from "@bera/ui/skeleton";
import { parseUnits as ethersParseUnits } from "ethers";
import { mutate } from "swr";
import { formatUnits, parseUnits } from "viem";
import { type Address } from "wagmi";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { type ILimitOrder } from "../berpetuals/components/order-history";
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
  const [tp, setTp] = useState<string>(
    formatUnits(BigInt(openOrder?.tp) ?? 0, 10),
  );
  const [sl, setSl] = useState<string>(
    formatUnits(BigInt(openOrder?.sl) ?? 0, 10),
  );
  const { QUERY_KEY } = usePollOpenPositions();

  const formattedCurrentPrice = Number(
    formatUnits(BigInt(openOrder.price ?? 0), 10),
  );

  const positionSize =
    Number(formatUnits(BigInt(openOrder?.position_size ?? 0), 18)) *
    Number(openOrder.leverage);
  const openPrice = Number(formatUnits(BigInt(openOrder?.price ?? 0), 10));
  const size = positionSize / openPrice;

  const ticker = openOrder?.market?.name?.split("-")[0];

  const [executionPrice, setExecutionPrice] = useState<number>(
    formattedCurrentPrice,
  );
  const { isLoading, write } = useOctTxn({
    message: "Updating Open Limit Order",
    actionType: TransactionActionType.EDIT_PERPS_ORDER,
    onSuccess: () => {
      void mutate(QUERY_KEY);
      setOpen(false);
    },
  });

  const formattedPrice = Number(
    formatUnits(BigInt(openOrder?.price ?? 0n), 10),
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

  const payload = [
    openOrder?.market.pair_index,
    openOrder?.index,
    parseUnits(`${executionPrice}`, 10),
    ethersParseUnits(tp, 10),
    ethersParseUnits(sl, 10),
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
                  {size.toFixed(4) ?? 0} {ticker}
                </div>
                <div className="text-xs font-medium leading-5 text-muted-foreground">
                  {formattedCurrentPrice !== undefined ? (
                    `${formatUsd(formattedCurrentPrice)} / ${ticker}`
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
          <div className=" text-xs font-medium">
            Execution Price{" "}
            <Input
              value={executionPrice}
              type="number"
              className=" mt-2 h-8 w-full rounded-lg bg-background text-xs lg:w-[102px]"
              onChange={(e) => setExecutionPrice(Number(e.target.value))}
            />
          </div>

          <TPSL
            leverage={Number(openOrder?.leverage) ?? 2}
            tp={tp}
            sl={sl}
            formattedPrice={executionPrice}
            liqPrice={liqPrice}
            long={openOrder?.buy === true}
            tpslOnChange={(value) => {
              setTp(value.tp);
              setSl(value.sl);
            }}
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
