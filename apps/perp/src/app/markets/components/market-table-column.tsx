import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

import { type IMarket } from "~/app/berpetuals/page";
import { PositionTitle } from "~/app/components/position-title";
import { usePricesSocket } from "~/hooks/usePricesSocket";

const MarketPrice = ({ pairIndex }: { pairIndex: number }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(pairIndex);
  return <div className="w-[88px]">{price && formatUsd(price)}</div>;
};
export const market_table_column: ColumnDef<IMarket>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        <PositionTitle market={row.original} />
      </div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Index Price" />
    ),
    cell: ({ row }) => {
      <MarketPrice pairIndex={Number(row.original.pairIndex)} />;
    },
    accessorKey: "current_price",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24H Change" />
    ),
    cell: () => {
      const changerate = 0.69;
      const changeAmoumt = parseFloat((Math.random() * 500).toFixed(2));
      return (
        <div className="flex w-[88px] flex-col gap-1">
          <div
            className={cn(
              "text-sm font-semibold leading-tight",
              changerate >= 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {(changerate * 100).toFixed(2)}%
          </div>
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {formatUsd(changeAmoumt)}
          </div>
        </div>
      );
    },
    accessorKey: "open_interest_long",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borrow Fee" />
    ),
    cell: ({ row }) => {
      const formattedBorrowingL = formatUnits(
        BigInt(row.original.pairBorrowingFee?.bfLong ?? "0"),
        18,
      );
      const formattedBorrowingS = formatUnits(
        BigInt(row.original.pairBorrowingFee?.bfShort ?? "0"),
        18,
      );
      return (
        <div>
          <div className="text-xs font-medium text-muted-foreground">
            {formattedBorrowingL}% (L)
          </div>
          <div className="text-xs font-medium text-muted-foreground">
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
      const formattedOIL = formatUnits(
        BigInt(row.original.openInterest?.oiShort ?? "0"),
        18,
      );
      const formattedOIS = formatUnits(
        BigInt(row.original.openInterest?.oiShort ?? "0"),
        18,
      );
      return (
        <div>
          <div className="text-xs font-medium text-muted-foreground">
            {formatter.format(Number(formattedOIL))} (L)
          </div>
          <div className="text-xs font-medium text-muted-foreground">
            {formatter.format(Number(formattedOIS))} (L)
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
