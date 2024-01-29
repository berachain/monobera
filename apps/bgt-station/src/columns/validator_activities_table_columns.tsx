import React from "react";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

export const recent_votes_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposal" />
    ),
    cell: ({ row }) => {
      return <div className="w-[350px]">{row.original.proposal}</div>;
    },
    accessorKey: "proposal",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Address" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-[88px] gap-1">{row.original.address}</div>;
    },
    accessorKey: "address",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stance" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[60px] items-center">{row.original.stance}</div>
      );
    },
    accessorKey: "stance",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time submitted" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[160px] items-center">
          {new Date(row.original.time).toUTCString()}
        </div>
      );
    },
    accessorKey: "time",
    enableSorting: true,
  },
];

export const delegators_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delegator address" />
    ),
    cell: ({ row }) => row.original.delegator_address,
    accessorKey: "delegator_address",
    enableSorting: false,
  },

  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT amount"
        className="flex justify-end"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-full flex-shrink-0 justify-end whitespace-nowrap text-right">
          {row.original.bgt_amount}
        </div>
      );
    },
    accessorKey: "bgt_amount",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.bgt ?? 0;
      const b = rowB.original.bgt ?? 0;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
  },
];
