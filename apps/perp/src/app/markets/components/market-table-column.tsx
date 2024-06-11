import { useMemo } from "react";
import Image from "next/image";
import { formatUsd, formatter } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";
import type { ColumnDef } from "@tanstack/react-table";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { calculatePercentDifference } from "~/utils/percentDifference";
import { usePollPrices } from "~/hooks/usePollPrices";
import type { IMarket } from "~/types/market";
import { formatBorrowFee } from "~/utils/formatBorrowFee";

const MarketPrice = ({ pairIndex }: { pairIndex: string }) => {
  const { marketPrices } = usePollPrices();
  const price = marketPrices[pairIndex ?? ""] ?? "0";

  return (
    <div className="w-[88px]">
      {" "}
      {price !== "0" ? (
        <span>{formatUsd(price)}</span>
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
  pairIndex: string;
  dailyHistoricPrice: number;
}) => {
  const { marketPrices } = usePollPrices();
  const price = marketPrices[pairIndex ?? ""] ?? "0";

  const difference = useMemo(() => {
    return calculatePercentDifference(
      dailyHistoricPrice?.toString() ?? "0",
      price,
    );
  }, [dailyHistoricPrice, price]);

  const priceDifference = useMemo(() => {
    return BigNumber(price)
      .minus(dailyHistoricPrice ?? 0)
      .toString(10);
  }, [dailyHistoricPrice, price]);

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
        {price !== "0" ? (
          <span>
            {!difference.isNaN() ? difference.dp(2).toString(10) : 0}%
          </span>
        ) : (
          <Skeleton className="h-[16px] w-[50px]" />
        )}
      </div>
      <div className="text-xs font-medium leading-tight text-muted-foreground">
        {price !== "0" ? (
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
    header: "Index Price",
    cell: ({ row }) => <MarketPrice pairIndex={row.original.pair_index} />,
    accessorKey: "index_price",
    enableSorting: false,
    size: 130,
    minSize: 130,
  },
  {
    header: "24h Change",
    cell: ({ row }) => {
      return (
        <Change
          pairIndex={row.original.pair_index}
          dailyHistoricPrice={Number(row.original.dailyHistoricPrice)}
        />
      );
    },
    accessorKey: "dailyHistoricPrice",
    enableSorting: false,
    size: 130,
    minSize: 130,
  },
  {
    header: "Borrow Fee",
    cell: ({ row }) => {
      return (
        <div>
          <div className="text-xs font-medium text-success-foreground">
            {formatBorrowFee(row.original?.pair_borrowing_fee?.bf_long, 4)}% (L)
          </div>
          <div className="text-xs font-medium text-destructive-foreground">
            {formatBorrowFee(row.original?.pair_borrowing_fee?.bf_short, 4)}%
            (S)
          </div>
        </div>
      );
    },
    accessorKey: "borrow_fee",
    enableSorting: false,
    size: 130,
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
    size: 130,
    minSize: 130,
  },
  {
    header: "24h Volume",
    cell: ({ row }) => (
      <div className="text-xs font-medium text-muted-foreground">
        {formatUsd(row.original.dailyVolume ?? 0)}
      </div>
    ),
    accessorKey: "dailyVolume",
    enableSorting: true,
    minSize: 130,
  },
  {
    header: "24h Trades",
    cell: ({ row }) => (
      <div className="text-xs font-medium text-muted-foreground">
        {row.original.dailyNumOfTrades ?? 0}
      </div>
    ),
    accessorKey: "dailyNumOfTrades",
    enableSorting: true,
    minSize: 130,
  },
];
