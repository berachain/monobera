import React from "react";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIcon,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type ActiveIncentive } from "@bera/berajs";

export const validatorIncentivesColumns: ColumnDef<ActiveIncentive>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
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
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      const amountLeft = row.original.amountLeft;
      const token = row.original.token;

      return (
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row text-foreground text-md">
            $<FormattedNumber value={"10000"} compact />
          </div>
          <div className="flex flex-row gap-1 text-muted-foreground text-md">
            <FormattedNumber value={amountLeft} symbol={token.symbol} />
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
        <div className="flex flex-row items-center gap-1">
          TODO: LIST VAULTS HERE
        </div>
      );
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
];
