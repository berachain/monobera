import React from "react";
import { type Gauge } from "@bera/berajs";
import { DataTableColumnHeader, TokenIconList } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

interface GaugeT extends Gauge {
  tokenList: any[];
}

export const global_gauge_weight_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gauge Vaults" />
    ),
    cell: ({ row }) => (
      <div className="flex-c,ol flex w-[150px] gap-2 whitespace-nowrap text-left">
        <div className="flex items-center gap-1 text-lg font-medium leading-6">
          <Icons.bexFav className="h-6 w-6" />
          BEX
        </div>
        <div className="flex items-center gap-1 text-xs leading-5">
          <TokenIconList tokenList={row.original.tokenList} size="md" />
          {row.original.name}
        </div>
      </div>
    ),
    accessorKey: "gauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Incentive Value"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[120px] flex-row items-center">
          $690,490.6994
        </div>
      );
    },
    accessorKey: "incentive-value",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Incentives / BGT Staked"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => <div className="flex w-full justify-center">$69.42</div>,
    accessorKey: "bgt-staked",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT Inflation Capture"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full justify-center">42,690.69 BGT</div>
    ),
    accessorKey: "bgt-inflation",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Validtors Pointing Emissions"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => <div className="flex w-full justify-center">ha</div>,
    accessorKey: "validators-emissions",
    enableSorting: true,
  },
];
