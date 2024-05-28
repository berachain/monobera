import React from "react";
import { type Validator } from "@bera/berajs";
import {
  DataTableColumnHeader,
  FormattedNumber,
  ValidatorIcon,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";
import { Address } from "viem";

import { ValidatorBribesPopover } from "~/components/bribes-tooltip";

export const user_incentives_columns: ColumnDef<Validator>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validators" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <ValidatorIcon
          address={row.original.coinbase as Address}
          className="h-8 w-8"
        />
        {row.original.name}{" "}
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
      return (
        <FormattedNumber
          value={Math.random() * 1000000}
          compact={false}
          compactThreshold={999_999_999_999}
          symbol="BGT"
        />
      );
    },
    accessorKey: "incentiveAmount",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="vAPY" />
    ),
    cell: ({ row }) => (
      <div className="">{(Math.random() * 100).toFixed(2)}%</div>
    ),
    accessorKey: "bgt-staked",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Most Weighted Gauges" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Icons.bgt className="h-4 w-4" />
        HONEY / bHONEY
      </div>
    ),
    accessorKey: "inflation",
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <ValidatorBribesPopover validator={row.original} />
          <Button size="sm" className="leading-5">
            Claim
          </Button>
        </div>
      );
    },
    accessorKey: "emissions",
    enableSorting: true,
  },
];
