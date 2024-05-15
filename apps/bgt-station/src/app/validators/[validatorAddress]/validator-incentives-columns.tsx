import React from "react";
import {
  DataTableColumnHeader,
  FormattedNumber,
  IconList,
  TokenIcon,
  Tooltip,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { AggregatedBribe } from "~/hooks/useAggregatedBribes";
import { Vault } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";

export const validatorIncentivesColumns: ColumnDef<AggregatedBribe>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribe Token" />
    ),
    cell: ({ row }) => {
      const token = row.original.token;
      return (
        <div className="flex flex-row items-center gap-1">
          <TokenIcon address={token.address} />
          {token.symbol}{" "}
        </div>
      );
    },
    accessorKey: "token.symbol",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Left" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row gap-1 text-muted-foreground text-md">
            <FormattedNumber
              value={row.original.bribeTotalAmountLeft}
              symbol={row.original.token.symbol}
            />
          </div>
        </div>
      );
    },
    accessorKey: "bribeTotalAmountLeft",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Per Proposal" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row gap-1 text-muted-foreground text-md">
            <FormattedNumber
              value={row.original.amountPerProposal}
              symbol={row.original.token.symbol}
            />
          </div>
        </div>
      );
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sources" />
    ),
    cell: ({ row }) => {
      const token = row.original.token;
      return (
        <div className="flex flex-row items-center gap-1 border rounded-sm p-1 w-fit">
          <IconList
            iconList={row.original.sourceVaults.map((v: Vault) => v.imageUri)}
            size={20}
            showCount={3}
          />
          <Icons.arrowRight className="h-4 w-4" />
        </div>
      );
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
];
