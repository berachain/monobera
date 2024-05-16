import React from "react";
import { formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

export interface GlobalGaugeColumns {
  gauge: React.ReactNode;
  incentiveAmount: number;
  incentivePercentage: number;
  tvl: number;
  hide: React.ReactNode;
}

export const user_incentives_columns: ColumnDef<GlobalGaugeColumns>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validators" />
    ),
    cell: ({ row }) => (
      <div className="w-[250px] truncate whitespace-nowrap text-left">
        {row.original.gauge}
      </div>
    ),
    accessorKey: "gauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Staked BGT" />
    ),
    cell: ({ row }) => {
      const incentiveAmount = row.original.incentiveAmount;
      const incentivePercentage = row.original.incentivePercentage;
      return (
        <div className="flex w-[120px] flex-row items-center">
          {" "}
          {formatter.format(incentiveAmount)} (
          {(incentivePercentage * 100).toFixed(2)}%)
        </div>
      );
    },
    accessorKey: "incentiveAmount",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="vAPY"
        className="w-full items-center text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full justify-center">{row.original.hide}</div>
    ),
    accessorKey: "bgt-staked",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Most Weighted Gauges"
        className="w-full items-center text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full justify-center">{row.original.hide}</div>
    ),
    accessorKey: "inflation",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Bribes"
        className="w-full items-center text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full justify-center">{row.original.hide}</div>
    ),
    accessorKey: "emissions",
    enableSorting: true,
  },
];
