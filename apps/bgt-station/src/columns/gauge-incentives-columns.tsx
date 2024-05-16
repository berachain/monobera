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

export const gauge_incentives_columns: ColumnDef<GlobalGaugeColumns>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribes Breakdown" />
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
      <DataTableColumnHeader column={column} title="Total Bribe Value" />
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
        title="Incentives"
        className="w-full items-center text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full justify-center">{row.original.hide}</div>
    ),
    accessorKey: "hide",
    enableSorting: true,
  },
];
