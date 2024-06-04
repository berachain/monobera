import React from "react";
import { type Gauge } from "@bera/berajs";
import { DataTableColumnHeader, FormattedNumber } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import { BribesPopover } from "~/components/bribes-tooltip";
import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const global_gauge_weight_columns: ColumnDef<Gauge>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gauge Vaults" />
    ),
    cell: ({ row }) => (
      <GaugeHeaderWidget
        address={row.original.vaultAddress}
        className="w-[150px]"
      />
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
    cell: ({ row }) => (
      <FormattedNumber
        className="w-full justify-center"
        symbol="USD"
        compact={false}
        compactThreshold={999_999_999}
        value={690_490.6994}
      />
    ),
    accessorKey: "incentive-value",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT Staked"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <FormattedNumber
        className="w-full justify-start"
        symbol="BGT"
        compact={false}
        compactThreshold={999_999_999}
        value={69.42}
      />
    ),
    accessorKey: "bgt-staked",
    enableSorting: false,
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
      <FormattedNumber
        className="w-full justify-center"
        symbol="BGT"
        compact={false}
        compactThreshold={999_999_999}
        value={42069.42}
      />
    ),
    accessorKey: "bgt-inflation",
    enableSorting: false,
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
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Incentives"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-center gap-1">
        <BribesPopover bribes={row.original.vaultWhitelist.whitelistedTokens} />
        <Button
          size="sm"
          variant="ghost"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(
              `/incentivize?gauge=${row.original.vaultAddress}`,
              "_self",
            );
          }}
        >
          Add
        </Button>
      </div>
    ),
    accessorKey: "validators-emissions",
    enableSorting: false,
  },
];
