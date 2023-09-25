import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { type ColumnDef } from "@tanstack/react-table";

import { PositionTitle } from "~/app/components/position-title";
import { type Position } from "~/hooks/usePositions";

export const market_table_column: ColumnDef<Position>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]">
        <PositionTitle position={row.original} />
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
      <div className="w-[88px]">{formatUsd(row.original.current_price)}</div>
    ),
    accessorKey: "current_price",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24H Change" />
    ),
    cell: ({ row }) => {
      const changerate = row.original.open_interest_long;
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
      <DataTableColumnHeader column={column} title="1h Funding" />
    ),
    cell: ({ row }) => {
      const changerate = row.original.open_interest_short;
      return (
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
      );
    },
    accessorKey: "open_interest_short",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open Interest" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[150px] flex-col gap-1">
          <div className="text-sm font-semibold leading-tight">
            {row.original.position_size} {row.original.assets}
          </div>
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {formatUsd(row.original.position_size * row.original.current_price)}
          </div>
        </div>
      );
    },
    accessorKey: "position_size",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h Volume" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] text-xs font-medium leading-tight text-muted-foreground">
        {formatUsd(
          row.original.position_size *
            row.original.current_price *
            row.original.leverage,
        )}
      </div>
    ),
    accessorKey: "leverage",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h Trades" />
    ),
    cell: ({ row }) => <div className="w-[100px]">{row.original.leverage}</div>,
    accessorKey: "leverage",
    enableSorting: true,
  },
];
