import React from "react";
import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import { ClosePositionModal } from "~/app/components/close-position-modal";
import { PositionTitle } from "~/app/components/position-title";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
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
        <UpdatePositionModal
          trigger={
            <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
          }
        />
        <ClosePositionModal
          trigger={
            <Icons.close className="h-6 w-6 cursor-pointer text-destructive-foreground" />
          }
        />
      </div>
    ),
    accessorKey: "manage",
    enableSorting: false,
  },
];

export const orders_columns: ColumnDef<Position>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({}) => {
      const date = new Date();
      return (
        <div>
          <div className="text-sm font-semibold leading-tight text-foreground ">
            {date.toLocaleDateString()}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {date.toLocaleTimeString()}
          </div>
        </div>
      );
    },
    accessorKey: "time",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({}) => (
      <div className=" text-xs font-medium uppercase text-muted-foreground">
        LIMIT
      </div>
    ),
    accessorKey: "type",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market / Action" />
    ),
    cell: ({ row }) => <PositionTitle position={row.original} />,
    accessorKey: "assets",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="text-xs font-medium leading-tight text-foreground">
        {row.original.position_size} {row.original.assets}
      </div>
    ),

    accessorKey: "position_size",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{formatUsd(row.original.unrealized_pnl)}</div>,
    accessorKey: "entry_price",
    enableSorting: false,
  },

  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div>
        <div className={"text-sm font-semibold leading-5 text-foreground"}>
          {row.original.realized_pnl} <br />
        </div>
        <div className="text-[10px] uppercase leading-[10px]">Honey</div>
      </div>
    ),
    accessorKey: "total",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Filled" />
    ),
    cell: ({ row }) => (
      <div>
        <div className={"text-sm font-semibold leading-5 text-foreground"}>
          {row.original.position_size} {row.original.assets}
        </div>
        <div className="text-[10px] leading-[10px]">(0.00%)</div>
      </div>
    ),
    accessorKey: "filled",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="UnFilled" />
    ),
    cell: ({ row }) => (
      <div className={"text-sm font-semibold leading-5 text-foreground"}>
        {row.original.position_size} {row.original.assets}
      </div>
    ),
    accessorKey: "unfilled",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={
          <div className="flex justify-end">
            <Button className="bg-destructive px-2 py-1 text-sm font-semibold leading-5 text-destructive-foreground">
              Cancel All Orders
            </Button>
          </div>
        }
      />
    ),
    cell: ({}) => (
      <div className="flex items-center justify-end gap-1">
        <UpdatePositionModal
          trigger={
            <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
          }
        />
        <ClosePositionModal
          trigger={
            <Icons.close className="h-6 w-6 cursor-pointer text-destructive-foreground" />
          }
        />
      </div>
    ),
    accessorKey: "manage",
    enableSorting: false,
  },
];
