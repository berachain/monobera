import React from "react";
import { ActiveIncentive, useTokenHoneyPrice } from "@bera/berajs";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIcon,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";


export const gauge_incentives_columns: ColumnDef<ActiveIncentive>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribe Breakdown" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center gap-1">
          <TokenIcon address={row.original.token.address} />
          <div>{row.original.token.symbol}</div>
        </div>
      );
    },
    accessorKey: "token",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Incentive Rate Per BGT" />
    ),
    cell: ({ row }) => (
      <FormattedNumber
        value={row.original.incentiveRate}
        compact={false}
        symbol={row.original.token.symbol}
      />
    ),
    accessorKey: "incentiveRate",
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
        symbol={row.original.token.symbol}
      />
    ),
    accessorKey: "incentiveAmount",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="USD Amount Left" />
    ),
    cell: ({ row }) => {
      const { data: price } = useTokenHoneyPrice({
        tokenAddress: row.original.token.address,
      });
      return (
        <FormattedNumber
          value={Number(price ?? "0") * row.original.amountLeft}
          compact={false}
          symbol={"USD"}
        />
      );
    },
    accessorKey: "incentiveAmountUSD",
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
