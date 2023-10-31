"use client";

import { useState } from "react";
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

import { usePricesSocket } from "~/hooks/usePricesSocket";
import { type IMarket } from "../page";

interface InstrumentProps {
  markets: IMarket[];
  selectedMarket: IMarket;
}

const MarketPriceOverview = ({ market }: { market: IMarket }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(market.pair_index) ?? 0);
  return (
    <div>
      <div className="text-lg font-semibold leading-7 text-foreground ">
        {price !== undefined ? (
          formatUsd(Number(formatUnits(price, 10)))
        ) : (
          <Skeleton className="h-[24px] w-[80px]" />
        )}
      </div>
      <p className="text-right">+0.69%</p>
    </div>
  );
};
export function InstrumentDropdown({
  markets,
  selectedMarket,
}: InstrumentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
      <DropdownMenuTrigger
        className={cn(
          "flex h-[65px] w-full cursor-pointer items-center justify-between border-b border-border px-8 py-4 hover:bg-muted lg:border-r",
          dropdownOpen && "bg-muted",
        )}
      >
        <div className="flex items-center gap-2 font-semibold leading-7">
          {dropdownOpen ? (
            <>Choose Market</>
          ) : (
            <>
              {/* <Avatar className="h-6 w-6">
                <AvatarImage
                  src={selectedMarket.imageUri}
                  className="rounded-full"
                />
                <AvatarFallback>{selectedMarket.name}</AvatarFallback>
              </Avatar> */}

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
      <DropdownMenuContent className="-mt-1 w-screen rounded-none border-border bg-background p-0 lg:w-[400px] lg:border-r ">
        <div className=" bg-muted px-4 py-2 ">
          <SearchInput
            className="w-full rounded rounded-none border-none bg-muted"
            placeholder="Search Markets"
          />
        </div>
        <div className="flex h-screen flex-col gap-1 overflow-y-scroll border-t border-border">
          {markets.map((market, index) => (
            <Link href={`/berpetuals/${market.name}`} key={market.name}>
              <DropdownMenuItem
                key={index}
                className=" flex h-[60px] flex-row items-center justify-between px-4 hover:bg-muted"
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
                <MarketPriceOverview market={market} />
                {/* <div className="font-medium">
                $69
                <div
                  className={cn(
                    "text-right text-xs",
                    instrument.change24H < 0
                      ? "text-destructive-foreground"
                      : "text-success-foreground",
                  )}
                >
                  {instrument.change24H > 0 && "+"} {instrument.change24H}%
                </div>
              </div> */}
              </DropdownMenuItem>
            </Link>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
