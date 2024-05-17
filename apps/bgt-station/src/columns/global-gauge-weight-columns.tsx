import React from "react";
import { type Gauge } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const global_gauge_weight_columns: ColumnDef<Gauge>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gauge Vaults" />
    ),
    cell: ({ row }) => (
      <GaugeHeaderWidget gauge={row.original.address} className="w-[150px]" />
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
