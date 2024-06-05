import React from "react";
import { type Gauge } from "@bera/berajs";
import { DataTableColumnHeader, FormattedNumber } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";

import { BribesPopover } from "~/components/bribes-tooltip";
import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const validatorGaugeColumns: ColumnDef<Gauge>[] = [
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
        symbol="USD"
        compact={false}
        compactThreshold={999_999_999}
        value={row.original.activeIncentivesInHoney}
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
        value={row.original.amountStaked}
      />
    ),
    accessorKey: "bgt-staked",
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
      <div className="flex items-center gap-1">
        <BribesPopover incentives={row.original.activeIncentives} />
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
    accessorKey: "incentives",
    enableSorting: false,
  },
];
