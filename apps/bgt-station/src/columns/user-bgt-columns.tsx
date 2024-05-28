import React from "react";
import { DataTableColumnHeader, FormattedNumber } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { Icons } from "@bera/ui/icons";
import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const user_bgt_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validators" />
    ),
    cell: ({ row }) => (
      <GaugeHeaderWidget gauge={row.original.address} className="w-[200px]" />
    ),
    accessorKey: "gauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="vAPY" />
    ),
    cell: ({ row }) => <div>{(Math.random() * 100).toFixed(2)}%</div>,
    accessorKey: "incentiveAmount",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT Rewards"
        className="items-center text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="py-1 px-2 flex gap-1 rounded-full text-success-foreground bg-success-foreground bg-opacity-10 w-fit text-sm font-medium items-center">
        <Icons.bgt className="h-6 w-6" />
        <FormattedNumber value={Math.random() * 100000} />
      </div>
    ),
    accessorKey: "bgt-staked",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Incentives"
        className="w-20 items-center text-center"
      />
    ),
    cell: ({ row }) => (
      <Button size="sm" className="leading-5">
        Claim BGT
      </Button>
    ),
    accessorKey: "inflation",
    enableSorting: true,
  },
];
