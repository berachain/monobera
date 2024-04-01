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
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { calculatePercentDifference } from "~/utils/percentDifference";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "~/types/market";

interface IGeneralInfoBanner {
  market: IMarket;
  priceChange: number[];
}
export function GeneralInfoBanner({ market, priceChange }: IGeneralInfoBanner) {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(market.pair_index) ?? 0);
  const [open, setOpen] = useState(false);

  const formattedPriceBN = formatFromBaseUnit(price, 10);
  const historicPrice = priceChange[Number(market.pair_index)];
  const historicPriceBN = BigNumber(historicPrice ?? 0);

  const difference = useMemo(() => {
    return calculatePercentDifference(
      historicPrice?.toString() ?? "0",
      formattedPriceBN.toString(10),
    );
  }, [historicPrice, formattedPriceBN]);

  const priceDifference = useMemo(() => {
    return formattedPriceBN.minus(historicPrice ?? "0");
  }, [historicPrice, formattedPriceBN]);

  useEffect(() => {
    document.title =
      price === undefined
        ? `${market.name} | ${perpsName}`
        : `${formatFromBaseUnit(price, 10).toString(10)} | ${
            market.name
          } | ${perpsName}`;
  }, [price]);

  const formattedLongOi = formatFromBaseUnit(
    market.open_interest?.oi_long ?? "0",
    18,
  ).toString(10);
  const formattedShortOi = formatFromBaseUnit(
    market.open_interest?.oi_short ?? "0",
    18,
  ).toString(10);
  const formattedBorrowingL = formatFromBaseUnit(
    market.pair_borrowing_fee?.bf_long ?? "0",
    18,
  )
    .dp(6)
    .toString(10);
  const formattedBorrowingS = formatFromBaseUnit(
    market.pair_borrowing_fee?.bf_short ?? "0",
    18,
  )
    .dp(6)
    .toString(10);

  return (
    <div className="m-2 flex h-[65px] w-[calc(100%-16px)] items-center justify-between rounded-md border border-border px-4">
      <div className="flex items-center text-muted-foreground">
        <div className="mr-2">
          <div className="text-xl font-semibold leading-7 text-muted-foreground">
            {price !== undefined ? (
              formatUsd(formatFromBaseUnit(price, 10).toString(10))
            ) : (
              <Skeleton className="h-[28px] w-[80px]" />
            )}
          </div>
          <div className="text-sm">
            {price !== undefined ? (
              <div
                className={
                  priceDifference.gt(0)
                    ? "text-success-foreground"
                    : "text-destructive-foreground"
                }
              >
                {formatUsd(priceDifference.toString(10))}
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
                difference.gt(0)
                  ? "text-success-foreground"
                  : "text-destructive-foreground"
              }
            >
              {difference.dp(2).toString(10)}%
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
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs 2xl:block">
          Borrow Fee (L)
          <div className="text-success-foreground">{formattedBorrowingL}%</div>
        </div>
        <div className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-xs 2xl:block">
          Borrow Fee (S)
          <div className="text-destructive-foreground">
            {formattedBorrowingS}%
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 text-[10px] text-muted-foreground">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="flex h-8 cursor-pointer items-center text-[12px] hover:underline">
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
                        difference.gt(0)
                          ? "text-success-foreground"
                          : "text-destructive-foreground"
                      }
                    >
                      {difference.dp(2).toString()}%
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
                  {formattedBorrowingL}%
                </div>
              </div>
              <div className="flex w-full flex-row justify-between text-xs">
                <div className="text-xs font-medium text-muted-foreground">
                  Borrowing Fee (S)
                </div>
                <div className="text-destructive-foreground">
                  {formattedBorrowingS}%
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
