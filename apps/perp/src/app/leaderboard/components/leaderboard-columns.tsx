import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

import { type Position } from "~/hooks/usePositions";

export const trading_history_column: ColumnDef<Position>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({}) => (
      <div className="w-[70px] text-xs">{new Date().toLocaleDateString()}</div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({}) => (
      <div className="w-[70px] text-xs">{new Date().toLocaleDateString()}</div>
    ),
    accessorKey: "market",
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
];
