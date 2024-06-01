import React from "react";
import { Token } from "@bera/berajs";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIcon,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

type IncentiveList = Token & { amountLeft: string };

export const gauge_incentives_columns: ColumnDef<IncentiveList>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribe Breakdown" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-1">
          <TokenIcon address={row.original.address} size="sm" />
          <div>{row.original.symbol}</div>
        </div>
      );
    },
    accessorKey: "token",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Left" />
    ),
    cell: ({ row }) => (
      <FormattedNumber
        value={row.original.amountLeft}
        compact={false}
        symbol={row.original.symbol}
      />
    ),
    accessorKey: "incentiveAmount",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Add Incentives" />
    ),
    cell: ({ row }) => (
      <Button size="sm" className="w-24">
        Add
      </Button>
    ),
    accessorKey: "hide",
    enableSorting: false,
  },
];
