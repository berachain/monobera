"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { formatUsd, formatter } from "@bera/berajs";
import { perpsName } from "@bera/config";
import { SimpleTable, getBannerCount, useBaseTable } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { calculatePercentDifference } from "~/utils/percentDifference";
import {
  MarketPrice,
  MarketPriceChange,
} from "~/app/markets/components/market-table-column";
import { usePollPrices } from "~/hooks/usePollPrices";
import { type IMarket } from "~/types/market";

interface InstrumentProps {
  markets: IMarket[];
  selectedMarket: IMarket;
  priceChange: number[];
}

const DYNAMIC_DROPDOWN_MOBILE_HEIGHTS: { [key: number]: string } = {
  0: "max-h-[calc(100vh-256px)]",
  1: "max-h-[calc(100vh-304px)]",
  2: "max-h-[calc(100vh-352px)]",
  3: "max-h-[calc(100vh-400px)]",
  4: "max-h-[calc(100vh-448px)]",
};

const DYNAMIC_DROPDOWN_DESKTOP_HEIGHTS: { [key: number]: string } = {
  0: "lg:max-h-[calc(100vh-194px)]",
  1: "lg:max-h-[calc(100vh-242px)]",
  2: "lg:max-h-[calc(100vh-290px)]",
  3: "lg:max-h-[calc(100vh-338px)]",
  4: "lg:max-h-[calc(100vh-386px)]",
};

const MarketPriceOverview = ({
  market,
  priceChange,
}: {
  market: IMarket;
  priceChange: number[];
}) => {
  const { marketPrices } = usePollPrices();
  const price = marketPrices[market?.pair_index ?? ""] ?? "0";
  const historicPrice = priceChange[Number(market?.pair_index) ?? 0];
  const difference = useMemo(() => {
    return calculatePercentDifference(historicPrice?.toString() ?? "0", price);
  }, [historicPrice, price]);
  return (
    <div>
      <div className="text-right text-lg font-semibold leading-7 text-foreground">
        {price !== undefined ? (
          formatUsd(price)
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

export const marketTableColumn: ColumnDef<IMarket>[] = [
  {
    header: "Market",
    cell: ({ row }) => (
      <div>
        <div className="flex items-center gap-2">
          <Image
            src={row.original?.imageUri ?? ""}
            alt={"selectedMarket"}
            width={24}
            height={24}
            className="rounded-full"
          />{" "}
          <div>
            <div className="mt-1 text-sm font-semibold leading-tight text-foreground">
              {row.original?.name}
            </div>
          </div>
        </div>
      </div>
    ),
    size: 150,
    minSize: 130,
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: "Price",
    cell: ({ row }) => <MarketPrice pairIndex={row.original.pair_index} />,
    accessorKey: "index_price",
    enableSorting: false,
    size: 150,
    minSize: 130,
  },
  {
    header: "24H",
    cell: ({ row }) => {
      return (
        <MarketPriceChange
          showAbsolutePrice={false}
          pairIndex={row.original.pair_index}
          dailyHistoricPrice={Number(row.original.dailyHistoricPrice)}
        />
      );
    },
    accessorKey: "dailyHistoricPrice",
    enableSorting: false,
    size: 150,
    minSize: 130,
  },
  {
    header: "Open Interest",
    cell: ({ row }) => {
      const formattedOIL = formatFromBaseUnit(
        row.original?.open_interest?.oi_long ?? "0",
        18,
      ).toString(10);

      const formattedOIS = formatFromBaseUnit(
        row.original?.open_interest?.oi_short ?? "0",
        18,
      ).toString(10);

      return (
        <div>
          <div className="text-sm font-medium ">
            ${formatter.format(Number(formattedOIL) + Number(formattedOIS))}
          </div>
        </div>
      );
    },
    accessorKey: "open_interest",
    enableSorting: false,
    size: 150,
    minSize: 130,
  },
  {
    header: "Volume",
    cell: ({ row }) => (
      <div className=" pr-4 font-medium">
        ${formatter.format(row.original.dailyVolume ?? 0)}
      </div>
    ),
    accessorKey: "dailyVolume",
    enableSorting: false,
    size: 150,
    minSize: 130,
  },
];

export function InstrumentDropdown({
  markets,
  selectedMarket,
  priceChange,
}: InstrumentProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const activeBanners = getBannerCount(perpsName, pathName);

  const marketsWithHistoricPrice = useMemo(() => {
    return markets?.map((market) => {
      const historicPrice = priceChange[Number(market.pair_index)];
      return {
        ...market,
        dailyHistoricPrice: historicPrice,
      };
    });
  }, [markets, priceChange]);

  const table = useBaseTable({
    data: marketsWithHistoricPrice,
    columns: marketTableColumn,
  });

  const handleRowClick = (row: any) => {
    router.push(`/berpetuals/${row.original.name}`);
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        setDropdownOpen(open);
      }}
    >
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-50 bg-background bg-opacity-75 blur-sm"
          onClick={() => setDropdownOpen(false)}
        />
      )}
      <DropdownMenuTrigger
        className={cn(
          "relative z-50 flex h-[63px] w-full cursor-pointer items-center justify-between rounded-md px-8 py-4 hover:bg-muted",
          dropdownOpen && "bg-muted",
        )}
      >
        <div className="flex items-center gap-2 font-semibold leading-7">
          <Image
            src={selectedMarket?.imageUri ?? ""}
            alt={"selectedMarket"}
            width={24}
            height={24}
            className="rounded-full"
          />
          {selectedMarket?.name}
        </div>
        <div className="select-none text-xs font-medium text-muted-foreground">
          {!dropdownOpen ? (
            <span className="select-none">
              All Markets <Icons.chevronDown className="inline-block h-3 w-3" />
            </span>
          ) : (
            <span className="select-none">
              Close <Icons.chevronUp className="inline-block h-3 w-3" />
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={`mx-2 my-1 p-0  ${DYNAMIC_DROPDOWN_MOBILE_HEIGHTS[activeBanners]} ${DYNAMIC_DROPDOWN_DESKTOP_HEIGHTS[activeBanners]}`}
      >
        <SimpleTable
          table={table}
          flexTable
          mutedBackgroundOnHead={false}
          onRowClick={handleRowClick}
          showToolbar={false}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
