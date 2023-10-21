import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

import { type OrderType } from "../type";

export function PlaceOrder({
  form,
  price,
  openingFee,
  bfLong,
  bfShort,
}: {
  form: OrderType;
  price: number;
  openingFee: number;
  bfLong: number;
  bfShort: number;
}) {
  const dailyBfLong = bfLong * 24;
  const dailyBfShort = bfShort * 24;

  const estTakeProfit = useMemo(() => {
    const tp = (1 + (form.tp ?? 0) / 100) * price;
    return tp;
  }, [form.tp, price]);

  const estStopLoss = useMemo(() => {
    const sl = (1 - (form.sl ?? 0) / 100) * price;
    return sl;
  }, [form.sl, price]);

  const calculateLiqPrice = (): number => {
    const formattedBorrowingL = Number(formatUnits(BigInt(bfLong ?? "0"), 18));
    const formattedBorrowingS = Number(formatUnits(BigInt(bfShort ?? "0"), 18));
    const long = form.orderType === "long";
    const openPrice = price ?? 0;
    const leverage = form.leverage ?? 2;

    const liqPriceDistance =
      (openPrice *
        ((90 - (long ? formattedBorrowingL : formattedBorrowingS)) / 100)) /
      leverage;

    const liqPrice = long
      ? openPrice - liqPriceDistance
      : openPrice + liqPriceDistance;

    return liqPrice > 0 ? Math.floor(liqPrice) : 0;
  };

  return (
    <div className="flex w-full flex-col gap-1 rounded-xl border border-border bg-muted px-4 py-3 text-xs font-medium leading-5 text-muted-foreground">
      {form.optionType === "market" ? (
        <div className="flex w-full justify-between">
          <div>EST. EXECUTION PRICE</div>
          <div className="text-foreground">{formatUsd(price)}</div>
        </div>
      ) : (
        <div className="flex w-full justify-between">
          <div>LIMIT ORDER PRICE</div>
          <div className="text-foreground">{formatUsd(price)}</div>
        </div>
      )}
      <div className="flex w-full justify-between">
        <div>EST. LIQ. PRICE</div>
        <div className="text-foreground">{formatUsd(calculateLiqPrice())}</div>
      </div>
      <div className="flex w-full justify-between">
        <div>LEVERAGE</div>
        <div className="text-foreground">{form.leverage}x</div>
      </div>
      <div className="flex w-full justify-between">
        <div>EST. TAKE PROFIT</div>
        <div className="text-foreground">
          {form.tp === 0 ? "None" : `${formatUsd(estTakeProfit)}`}{" "}
          {form.sl !== 0 && (
            <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>EST. STOP LOSS</div>
        <div className="text-foreground">
          {form.sl === 0 ? "None" : `${formatUsd(estStopLoss)}`}{" "}
          {form.sl !== 0 && (
            <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>POSITION SIZE</div>
        <div className="text-foreground">
          {formatUsd((form.amount ?? 0) * (form.leverage ?? 1))}{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>OPENING FEES</div>
        <div className="text-foreground">
          {openingFee.toFixed(2)}%{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>DAILY (24H) BORROW FEE</div>
        <div className="text-foreground">
          {form.orderType === "long"
            ? dailyBfLong.toFixed(2)
            : dailyBfShort.toFixed(2)}
          %{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <Button
        className={cn(
          "mt-4 capitalize hover:opacity-80",
          form.orderType === "long"
            ? "bg-success text-success-foreground"
            : "bg-destructive text-destructive-foreground",
        )}
      >
        Place {form.optionType} {form.orderType} order
      </Button>
    </div>
  );
}
