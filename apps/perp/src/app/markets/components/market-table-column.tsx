import { useMemo } from "react";
import Image from "next/image";
import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";
import type { ColumnDef } from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { calculatePercentDifference } from "~/utils/percentDifference";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import type { IMarket } from "~/types/market";

const MarketPrice = ({ pairIndex }: { pairIndex: number }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(pairIndex);

  return (
    <div className="w-[88px]">
      {" "}
      {price !== undefined ? (
        <span>
          {formatUsd(formatFromBaseUnit(price ?? "0", 10).toString(10))}
        </span>
      ) : (
        <Skeleton className="h-[16px] w-[80px]" />
      )}
    </div>
  );
};

const Change = ({
  pairIndex,
  dailyHistoricPrice,
}: {
  pairIndex: number;
  dailyHistoricPrice: number;
}) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(pairIndex ?? 0);
  const priceBN = useMemo(() => formatFromBaseUnit(price ?? 0, 10), [price]); // BigNumber
  const formattedPrice = useMemo(() => priceBN.toString(10) ?? "0", [priceBN]); // string
  const difference = useMemo(() => {
    return calculatePercentDifference(
      dailyHistoricPrice?.toString() ?? "0",
      formattedPrice,
    );
  }, [dailyHistoricPrice, formattedPrice]);

  const priceDifference = useMemo(() => {
    return priceBN.minus(dailyHistoricPrice ?? 0).toString(10);
  }, [dailyHistoricPrice, priceBN]);

  return (
    <div className="flex w-[88px] flex-col gap-1">
      <div
        className={cn(
          "text-sm font-semibold leading-tight",
          difference.gte(0)
            ? "text-success-foreground"
            : "text-destructive-foreground",
        )}
      >
        {price !== undefined ? (
          <span>
            {!difference.isNaN() ? difference.dp(2).toString(10) : 0}%
          </span>
        ) : (
          <Skeleton className="h-[16px] w-[50px]" />
        )}
      </div>
      <div className="text-xs font-medium leading-tight text-muted-foreground">
        {price !== undefined ? (
          <span>{!difference.isNaN() ? formatUsd(priceDifference) : "$0"}</span>
        ) : (
          <Skeleton className="h-[16px] w-[80px]" />
        )}
      </div>
    </div>
  );
};

export const marketTableColumn: ColumnDef<IMarket>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[120px]">
        <div className={cn("flex min-w-[120px] items-center gap-2", "")}>
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
            <div className="mt-1 text-sm font-medium leading-tight">
              {row.original?.tokenName}
            </div>
          </div>
        </div>
      </div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Index Price" />
    ),
    cell: ({ row }) => (
      <MarketPrice pairIndex={Number(row.original.pair_index)} />
    ),
    accessorKey: "index_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24H Change" />
    ),
    cell: ({ row }) => {
      return (
        <Change
          pairIndex={Number(row.original.pair_index)}
          dailyHistoricPrice={Number(row.original.dailyHistoricPrice)}
        />
      );
    },
    accessorKey: "dailyHistoricPrice",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borrow Fee" />
    ),
    cell: ({ row }) => {
      const formattedBorrowingL = formatFromBaseUnit(
        row.original?.pair_borrowing_fee?.bf_long,
        18,
      )
        .dp(4)
        .toString(10);
      const formattedBorrowingS = formatFromBaseUnit(
        row.original?.pair_borrowing_fee?.bf_short,
        18,
      )
        .dp(4)
        .toString(10);
      return (
        <div className="min-w-[90px]">
          <div className="text-xs font-medium text-success-foreground">
            {formattedBorrowingL}% (L)
          </div>
          <div className="text-xs font-medium text-destructive-foreground">
            {formattedBorrowingS}% (S)
          </div>
        </div>
      );
    },
    accessorKey: "borrow_fee",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open Interest" />
    ),
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
        <div className="min-w-[95px]">
          <div className="text-xs font-medium text-success-foreground">
            {formatter.format(Number(formattedOIL))} (L)
          </div>
          <div className="text-xs font-medium text-destructive-foreground">
            {formatter.format(Number(formattedOIS))} (S)
          </div>
        </div>
      );
    },
    accessorKey: "open_interest",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h Volume" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[110px] text-xs font-medium text-muted-foreground">
        {formatUsd(row.original.dailyVolume ?? 0)}
      </div>
    ),
    accessorKey: "dailyVolume",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h Trades" />
    ),
    cell: ({ row }) => (
      <div className="min-w-[105px] text-xs font-medium text-muted-foreground">
        {row.original.dailyNumOfTrades ?? 0}
      </div>
    ),
    accessorKey: "dailyNumOfTrades",
    enableSorting: true,
    sortingFn: (a, b) =>
      Number(a.original.dailyNumOfTrades ?? "0") -
      Number(b.original.dailyNumOfTrades ?? "0"),
  },
];
