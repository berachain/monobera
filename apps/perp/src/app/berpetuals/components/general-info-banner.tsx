"use client";

import { useEffect } from "react";
import { perpsName } from "@/../../packages/config/env";
import { formatUsd } from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "../page";

interface IGeneralInfoBanner {
  market: IMarket;
}
export function GeneralInfoBanner({ market }: IGeneralInfoBanner) {
  const { useMarketIndexPrice } = usePricesSocket();
  // const price = useMarketIndexPrice(Number(market.pair_index) ?? 0);
  const price = useMarketIndexPrice(Number(market.pair_index) ?? 0);

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

  const data = [
    {
      title: "24h Change",
      amount: "+0.77%",
    },
    {
      title: "24h Volume",
      amount: "$1.64M",
    },
    {
      title: "Open Interest (L)",
      amount: `${formatUsd(formattedLongOi)} / ∞`,
    },
    {
      title: "Open Interest (S)",
      amount: `${formatUsd(formattedShortOi)} / ∞`,
    },
    {
      title: "Borrowing (L)",
      amount: `${formattedBorrowingL}%`,
    },
    {
      title: "Borrowing (S)",
      amount: `${formattedBorrowingS}%`,
    },
  ];
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
          <div className="text-xs text-success-foreground">+326.69</div>
        </div>
        {data.map((item, index) => (
          <div
            className="hidden h-8 flex-shrink-0 border-l border-border px-2 text-[10px] xl:block"
            key={index}
          >
            {item.title}
            <div className="text-success-foreground">{item.amount}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-shrink-0 text-[10px] text-muted-foreground">
        <div className="flex h-8 cursor-pointer items-center border-r border-border p-3 hover:underline">
          Market Details
        </div>
        <div className="flex h-8 cursor-pointer items-center p-3 hover:underline">
          Berpetuals Tutorial
        </div>
      </div>
    </div>
  );
}
