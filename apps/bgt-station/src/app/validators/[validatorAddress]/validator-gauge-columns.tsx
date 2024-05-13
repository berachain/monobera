import React from "react";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIcon,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type CuttingBoardWeight } from "@bera/berajs";

export const validatorGaugeColumns: ColumnDef<CuttingBoardWeight>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      //   const token = row.original.token;
      return <div className="flex flex-row items-center gap-1">1</div>;
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      return <div className="flex flex-col items-start gap-1">1</div>;
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sources" />
    ),
    cell: ({ row }) => {
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
