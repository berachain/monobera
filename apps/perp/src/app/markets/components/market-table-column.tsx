import { useMemo } from "react";
import Image from "next/image";
import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { calculatePercentDifference } from "~/utils/percentDifference";
import { type IMarket } from "~/app/berpetuals/page";
import { usePricesSocket } from "~/hooks/usePricesSocket";

const MarketPrice = ({ pairIndex }: { pairIndex: number }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(pairIndex);
  return (
    <div className="w-[88px]">
      {" "}
      {price !== undefined ? (
        <span>{formatBigIntUsd(price, 10)}</span>
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
  const price = useMarketIndexPrice(pairIndex);
  const formattedPrice = Number(formatUnits(BigInt(price ?? 0), 10));

  const difference = useMemo(() => {
    return calculatePercentDifference(dailyHistoricPrice ?? 0, formattedPrice);
  }, [dailyHistoricPrice, formattedPrice]);

  const priceDifference = useMemo(() => {
    return formattedPrice - (dailyHistoricPrice ?? 0);
  }, [dailyHistoricPrice, formattedPrice]);

  return (
    <div className="flex w-[88px] flex-col gap-1">
      <div
        className={cn(
          "text-sm font-semibold leading-tight",
          difference >= 0
            ? "text-success-foreground"
            : "text-destructive-foreground",
        )}
      >
        {price !== undefined ? (
          <span>
            {!Number.isNaN(difference) ? Number(difference).toFixed(4) : 0}%
          </span>
        ) : (
          <Skeleton className="h-[16px] w-[50px]" />
        )}
      </div>
      <div className="text-xs font-medium leading-tight text-muted-foreground">
        {price !== undefined ? (
          <span>
            {!Number.isNaN(difference) ? formatUsd(priceDifference) : "$0"}
          </span>
        ) : (
          <Skeleton className="h-[16px] w-[80px]" />
        )}
      </div>
    </div>
  );
};

export const market_table_column: ColumnDef<IMarket>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        <div className={cn("flex w-[112px] items-center gap-2", "")}>
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
      const formattedBorrowingL = formatUnits(
        BigInt(row.original?.pair_borrowing_fee?.bf_long ?? "0"),
        18,
      );
      const formattedBorrowingS = formatUnits(
        BigInt(row.original?.pair_borrowing_fee?.bf_short ?? "0"),
        18,
      );
      return (
        <div>
          <div className="text-xs font-medium text-success-foreground">
            {Number(formattedBorrowingL).toFixed(4)}% (L)
          </div>
          <div className="text-xs font-medium text-destructive-foreground">
            {Number(formattedBorrowingS).toFixed(4)}% (S)
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
      const formattedOIL = formatUnits(
        BigInt(row.original.open_interest?.oi_long ?? "0"),
        18,
      );
      const formattedOIS = formatUnits(
        BigInt(row.original.open_interest?.oi_short ?? "0"),
        18,
      );
      return (
        <div>
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
    cell: () => (
      <div className="w-[100px] text-xs font-medium text-muted-foreground">
        {formatUsd(1000)}
      </div>
    ),
    accessorKey: "leverage",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h Trades" />
    ),
    cell: () => (
      <div className="w-[100px] text-xs font-medium text-muted-foreground">
        69
      </div>
    ),
    accessorKey: "24h_trades",
    enableSorting: true,
  },
];
