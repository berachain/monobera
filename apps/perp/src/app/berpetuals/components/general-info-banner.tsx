"use client";

import { useEffect, useMemo, useState } from "react";
import { perpsName } from "@/../../packages/config/env";
import { formatUsd } from "@bera/berajs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import { calculatePercentDifference } from "~/utils/percentDifference";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "../page";

interface IGeneralInfoBanner {
  market: IMarket;
  priceChange: number[];
}
export function GeneralInfoBanner({ market, priceChange }: IGeneralInfoBanner) {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(market.pair_index) ?? 0);
  const [open, setOpen] = useState(false);

  const formattedPrice = Number(formatUnits(BigInt(price ?? 0), 10));
  const historicPrice = priceChange[Number(market.pair_index)];

  const difference = useMemo(() => {
    return calculatePercentDifference(historicPrice ?? 0, formattedPrice);
  }, [historicPrice, formattedPrice]);

  const priceDifference = useMemo(() => {
    return formattedPrice - (historicPrice ?? 0);
  }, [historicPrice, formattedPrice]);
  useEffect(() => {
    document.title =
      price === undefined
        ? `${market.name} | ${perpsName}`
        : `${formatUsd(Number(formatUnits(price, 10)))} | ${
            market.name
          } | ${perpsName}`;
  }, [price]);

  const formattedLongOi = formatUnits(
    BigInt(market.open_interest?.oi_long ?? "0"),
    18,
  );
  const formattedShortOi = formatUnits(
    BigInt(market.open_interest?.oi_short ?? "0"),
    18,
  );

  const formattedBorrowingL = formatUnits(
    BigInt(market.pair_borrowing_fee?.bf_long ?? "0"),
    18,
  );
  const formattedBorrowingS = formatUnits(
    BigInt(market.pair_borrowing_fee?.bf_short ?? "0"),
    18,
  );

  return (
    <div className="flex h-[65px] w-full items-center justify-between border-b border-border px-4">
      <div className="flex items-center text-muted-foreground">
        <div className="mr-4">
          <div className="text-xl font-semibold leading-7 text-muted-foreground">
            {price !== undefined ? (
              formatUsd(Number(formatUnits(price, 10)))
            ) : (
              <Skeleton className="h-[28px] w-[80px]" />
            )}
          </div>
          <div className="text-sm">
            {price !== undefined ? (
              <div
                className={
                  priceDifference > 0
                    ? "text-success-foreground"
                    : "text-destructive-foreground"
                }
              >
                {formatUsd(priceDifference)}
              </div>
            ) : (
              <Skeleton className="mt-1 h-[16px] w-[40px]" />
            )}
          </div>
        </div>
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs xl:block">
          24h Change
          {price !== undefined ? (
            <div
              className={
                difference > 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground"
              }
            >
              {Number(difference).toFixed(2)}%
            </div>
          ) : (
            <Skeleton className="h-[16px] w-[40px]" />
          )}
        </div>
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs xl:block">
          24h Volume
          <div className="text-muted-foreground">
            {formatUsd(market.dailyVolume ?? 0)}
          </div>
        </div>
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs xl:block">
          Open Interest (L)
          <div className="text-success-foreground">
            {formatUsd(formattedLongOi)}
          </div>
        </div>
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs xl:block">
          Open Interest (S)
          <div className="text-destructive-foreground">
            {formatUsd(formattedShortOi)}
          </div>
        </div>
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs xl:block">
          Borrow Fee (L)
          <div className="text-success-foreground">
            {Number(formattedBorrowingL).toFixed(6)}%
          </div>
        </div>
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs xl:block">
          Borrow Fee (S)
          <div className="text-destructive-foreground">
            {Number(formattedBorrowingS).toFixed(6)}%
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 text-[10px] text-muted-foreground">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="flex h-8 cursor-pointer items-center p-3 hover:underline">
              Market Details
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle className="mb-3">Market Details</DialogTitle>
            </DialogHeader>
            <div className="flex w-full flex-col gap-2">
              <div className="flex w-full flex-row justify-between text-xs">
                <div className="text-xs font-medium text-muted-foreground">
                  24H Change
                </div>
                <div>
                  {price !== undefined ? (
                    <div
                      className={
                        difference > 0
                          ? "text-success-foreground"
                          : "text-destructive-foreground"
                      }
                    >
                      {Number(difference).toFixed(2)}%
                    </div>
                  ) : (
                    <Skeleton className="h-[16px] w-[40px]" />
                  )}
                </div>
              </div>
              <div className="flex w-full flex-row justify-between text-xs">
                <div className="text-xs font-medium text-muted-foreground">
                  24H Volume
                </div>
                <div className="text-muted-foreground">
                  {formatUsd(market.dailyVolume ?? 0)}
                </div>
              </div>
              <div className="flex w-full flex-row justify-between text-xs">
                <div className="text-xs font-medium text-muted-foreground">
                  Open Interest (L)
                </div>
                <div className="text-success-foreground">
                  {formatUsd(formattedLongOi)}
                </div>
              </div>
              <div className="flex w-full flex-row justify-between text-xs">
                <div className="text-xs font-medium text-muted-foreground">
                  Open Interest (S)
                </div>
                <div className="text-destructive-foreground">
                  {formatUsd(formattedShortOi)}
                </div>
              </div>
              <div className="flex w-full flex-row justify-between text-xs">
                <div className="text-xs font-medium text-muted-foreground">
                  Borrowing Fee (L)
                </div>
                <div className="text-success-foreground">
                  {Number(formattedBorrowingL).toFixed(6)}%
                </div>
              </div>
              <div className="flex w-full flex-row justify-between text-xs">
                <div className="text-xs font-medium text-muted-foreground">
                  Borrowing Fee (S)
                </div>
                <div className="text-destructive-foreground">
                  {Number(formattedBorrowingS).toFixed(6)}%
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
