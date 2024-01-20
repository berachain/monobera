import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { type ColumnDef } from "@tanstack/react-table";

import { EST_PNL_TOOLTIP_TEXT } from "~/app/berpetuals/const";
import { type Position } from "~/hooks/usePositions";

export const trading_history_column: ColumnDef<Position>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({}) => (
      <div className="w-[70px] text-xs">{new Date().toLocaleDateString()}</div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Index Price" />
    ),
    cell: ({ row }) => (
      <div className="w-[110px] text-xs">
        {row.original.assets}-{row.original.counter} /{" "}
        <span
          className={
            (cn("capitalize"),
            row.original.option_type === "long"
              ? "text-success-foreground"
              : "text-destructive-foreground")
          }
        >
          {" "}
          {row.original.option_type}
        </span>
      </div>
    ),
    accessorKey: "current_price",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({}) => <div className="flex w-[40px] flex-col gap-1">LIQ.</div>,
    accessorKey: "open_interest_long",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[150px] text-xs font-medium leading-tight">
          {formatUsd(row.original.position_size * row.original.current_price)} (
          {row.original.position_size} {row.original.assets})
        </div>
      );
    },
    accessorKey: "open_interest_short",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open Price" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-[80px]">{row.original.current_price}</div>;
    },
    accessorKey: "position_size",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Close Price" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-[80px]">{row.original.current_price}</div>;
    },
    accessorKey: "position_size",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TP/SL" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] text-sm font-semibold">
        <span className="text-success-foreground">
          {formatter.format(row.original.take_profit as number) ?? "-"}
        </span>
        /
        <span className="text-destructive-foreground">
          {formatter.format(row.original.stop_loss as number) ?? "-"}
        </span>
      </div>
    ),
    accessorKey: "leverage",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Collateral" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px]"> {row.original.position_size} Honey</div>
    ),
    accessorKey: "leverage",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PnL"
        tooltip={EST_PNL_TOOLTIP_TEXT}
      />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {formatUsd(row.original.liquidation_price)}
      </div>
    ),
    accessorKey: "leverage",
    enableSorting: true,
  },
];
