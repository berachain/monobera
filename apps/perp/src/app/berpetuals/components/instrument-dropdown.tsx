"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatUsd } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import { calculatePercentDifference } from "~/utils/percentDifference";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "../page";

interface InstrumentProps {
  markets: IMarket[];
  selectedMarket: IMarket;
  priceChange: number[];
}

const MarketPriceOverview = ({
  market,
  priceChange,
}: {
  market: IMarket;
  priceChange: number[];
}) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(market.pair_index) ?? 0);

  const formattedPrice = Number(formatUnits(BigInt(price ?? 0), 10));
  const historicPrice = priceChange[Number(market.pair_index)];
  const difference = useMemo(() => {
    return calculatePercentDifference(historicPrice ?? 0, formattedPrice);
  }, [historicPrice, formattedPrice]);
  return (
    <div>
      <div className="text-lg font-semibold leading-7 text-foreground ">
        {price !== undefined ? (
          formatUsd(Number(formatUnits(price, 10)))
        ) : (
          <Skeleton className="h-[24px] w-[80px]" />
        )}
      </div>
      <div className="text-right">
        {price !== undefined ? (
          <div
            className={
              difference > 0
                ? "text-success-foreground"
                : "text-destructive-foreground"
            }
          >
            {Number(difference).toFixed(4)}%
          </div>
        ) : (
          <Skeleton className="h-[16px] w-[40px]" />
        )}
      </div>
    </div>
  );
};
export function InstrumentDropdown({
  markets,
  selectedMarket,
  priceChange,
}: InstrumentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-[63px] w-full cursor-pointer items-center justify-between px-8 py-4 hover:bg-muted rounded-md",
          dropdownOpen && "bg-muted",
        )}
      >
        <div className="flex items-center gap-2 font-semibold leading-7">
          {dropdownOpen ? (
            <>Choose Market</>
          ) : (
            <>
              <Image
                src={selectedMarket.imageUri ?? ""}
                alt={"selectedMarket"}
                width={24}
                height={24}
                className="rounded-full"
              />
              {selectedMarket.name}
            </>
          )}
        </div>
        <div className="text-xs font-medium text-muted-foreground">
          {!dropdownOpen ? (
            <>
              All Markets <Icons.chevronDown className="inline-block h-3 w-3" />
            </>
          ) : (
            <>
              Close <Icons.chevronUp className="inline-block h-3 w-3" />
            </>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col h-[calc(100vh-256px)] lg:h-[calc(100vh-194px)] w-[calc(100vw-24px)] border-border bg-background p-0 lg:w-[400px] border rounded-md my-1 mx-2">
        <div className="w-full bg-muted px-4 py-2 ">
          <SearchInput
            className="w-full border-none bg-muted"
            placeholder="Search Markets"
          />
        </div>
        <div className="w-full flex flex-col gap-1 overflow-y-auto border-t border-border pt-1">
          {[...markets].map((market, index) => (
            <Link
              href={`/berpetuals/${market.name}`}
              key={market.name}
              className="shadow-[0_24px_3px_-24px_rgba(255,255,255,0.3)] pb-1 px-1"
            >
              <DropdownMenuItem
                key={index}
                className="flex flex-row w-full  h-[60px] items-center justify-between px-4 hover:bg-muted"
                // onClick={() => setInstrument(instrument)}
              >
                <div className="flex items-center gap-2 font-medium">
                  <Image
                    src={market.imageUri ?? ""}
                    alt={"selectedMarket"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div>{market.name}</div>
                </div>
                <MarketPriceOverview
                  market={market}
                  priceChange={priceChange}
                />
              </DropdownMenuItem>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
