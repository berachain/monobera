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
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { calculatePercentDifference } from "~/utils/percentDifference";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "~/types/market";

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
  const priceBN = useMemo(() => formatFromBaseUnit(price ?? 0, 10), [price]); // BigNumber
  const formattedPrice = useMemo(() => priceBN.toString(10) ?? "0", [priceBN]); // string
  const historicPrice = priceChange[Number(market.pair_index)];
  const difference = useMemo(() => {
    return calculatePercentDifference(
      historicPrice?.toString() ?? "0",
      formattedPrice,
    );
  }, [historicPrice, formattedPrice]);
  return (
    <div>
      <div className="text-lg font-semibold leading-7 text-foreground ">
        {price !== undefined ? (
          formatUsd(formattedPrice)
        ) : (
          <Skeleton className="h-[24px] w-[80px]" />
        )}
      </div>
      <div className="text-right">
        {price !== undefined ? (
          <div
            className={
              difference.gt(0)
                ? "text-success-foreground"
                : "text-destructive-foreground"
            }
          >
            {difference.dp(4).toString(10)}%
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
  const [searchValue, setSearchValue] = useState("");

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        setDropdownOpen(open);
        setSearchValue("");
      }}
    >
      <DropdownMenuTrigger
        className={cn(
          "flex h-[63px] w-full cursor-pointer items-center justify-between rounded-md px-8 py-4 hover:bg-muted",
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
      <DropdownMenuContent className="mx-2 my-1 flex h-[calc(100vh-256px)] w-[calc(100vw-16px)] flex-col rounded-md border border-border bg-background p-0 lg:h-[calc(100vh-194px)] lg:w-[400px]">
        <div className="w-full bg-muted px-4 py-2 ">
          <SearchInput
            className="w-full border-none bg-muted"
            placeholder="Search Markets"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col gap-1 overflow-y-auto border-t border-border pt-1">
          {[...markets].reduce<React.ReactNode[]>((acc, market, index) => {
            if (market.name.toLowerCase().includes(searchValue.toLowerCase())) {
              const link = (
                <Link
                  href={`/berpetuals/${market.name}`}
                  key={market.name}
                  className="px-1 pb-1 shadow-[0_24px_3px_-24px_rgba(255,255,255,0.3)]"
                >
                  <div
                    key={index}
                    onChange={(e) => e.preventDefault()}
                    className="flex h-[60px] w-full  flex-row items-center justify-between px-4 hover:bg-muted"
                  >
                    <div className="flex items-center gap-2 font-medium">
                      <Image
                        src={market.imageUri ?? ""}
                        alt={"selectedMarket"}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span>{market.name}</span>
                    </div>
                    <MarketPriceOverview
                      market={market}
                      priceChange={priceChange}
                    />
                  </div>
                </Link>
              );
              acc.push(link);
            }
            return acc;
          }, [])}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
