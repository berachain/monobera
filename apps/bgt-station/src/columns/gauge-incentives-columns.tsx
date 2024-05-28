import React from "react";
import { DataTableColumnHeader, FormattedNumber } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

export const gauge_incentives_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribe Breakdown" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-1">{row.original}</div>
      );
    },
    accessorKey: "token",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Left" />
    ),
    cell: ({ row }) => (
      <FormattedNumber
        value={Math.random() * 1000000}
        compact={false}
        symbol="BERA"
      />
    ),
    accessorKey: "incentiveAmount",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Incentives" />
    ),
    cell: ({ row }) => (
      <Button size="sm" className="w-24">
        Add
      </Button>
    ),
    accessorKey: "hide",
    enableSorting: true,
  },
];
