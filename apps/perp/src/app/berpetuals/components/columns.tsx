import React from "react";
import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import { PositionTitle } from "~/app/components/position-title";
import { type Position } from "~/hooks/usePositions";

export const positions_columns: ColumnDef<Position>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market / Slide" />
    ),
    cell: ({ row }) => <PositionTitle position={row.original} />,
    accessorKey: "assets",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position Size" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[88px]">
          <div className="text-sm font-semibold leading-tight text-foreground ">
            {formatUsd(row.original.position_size * row.original.current_price)}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {row.original.position_size} {row.original.assets}
          </div>
        </div>
      );
    },
    accessorKey: "position_size",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leverage" />
    ),
    cell: ({ row }) => {
      return <div className="w-[60px]">{row.original.leverage}x</div>;
    },
    accessorKey: "leverage",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entry Price" />
    ),
    cell: ({ row }) => <div>{formatUsd(row.original.unrealized_pnl)}</div>,
    accessorKey: "entry_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mark Price" />
    ),
    cell: ({ row }) => <div>{formatUsd(row.original.current_price)}</div>,
    accessorKey: "current_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Est. Liq. Price" />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-semibold leading-tight text-foreground">
        {formatUsd(row.original.liquidation_price)}
      </div>
    ),
    accessorKey: "est_liq_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Est. PnL" />
    ),
    cell: ({ row }) => (
      <div
        className={cn(
          "text-sm font-semibold leading-tight text-foreground",
          row.original.realized_pnl >= 0
            ? "text-success-foreground"
            : "text-destructive-foreground",
        )}
      >
        {row.original.realized_pnl > 0 && "+"}
        {formatUsd(row.original.realized_pnl)}
      </div>
    ),
    accessorKey: "est_pnl",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Funding" />
    ),
    cell: ({ row }) => <div>{formatUsd(row.original.funding_payment)}</div>,
    accessorKey: "funding",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Take Profit / Stop Loss" />
    ),
    cell: ({ row }) => (
      <div className="">
        <span className="text-success-foreground">
          {formatter.format(row.original.take_profit as number) ?? "-"}
        </span>
        /
        <span className="text-destructive-foreground">
          {formatter.format(row.original.stop_loss as number) ?? "-"}
        </span>
      </div>
    ),
    accessorKey: "tp_sl",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manage" />
    ),
    cell: ({}) => (
      <div className="flex items-center gap-1">
        <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
        <Icons.close className="h-6 w-6 cursor-pointer text-destructive-foreground" />
      </div>
    ),
    accessorKey: "manage",
    enableSorting: false,
  },
];
