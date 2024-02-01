import React from "react";
import { DataTableColumnHeader, bribeApyTooltipText } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

import { formatCommission } from "~/utils/formatCommission";

export const validator_table_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => row.original.validator,
    accessorKey: "validator",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="My Delegation" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[106px] items-center gap-1">
          {row.original.bgt_delegated}
        </div>
      );
    },
    // TODO: find a way to sort for my delegation
    accessorKey: "bgt_delegated",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Voting power"
        tooltip="Represents the influence in network governance based on amount delegated to this validator"
      />
    ),
    cell: ({ row }) => (
      <div className="flex w-24 flex-shrink-0 items-center whitespace-nowrap">
        {row.original.vp}
      </div>
    ),
    accessorKey: "vp",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.voting_power ?? 0;
      const b = rowB.original.voting_power ?? 0;
      if (a > b) return -1;
      if (a < b) return 1;
      return 0;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[91px] items-center gap-1">
          {formatCommission(row.original.commission)}%
        </div>
      );
    },
    accessorKey: "commission",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="vAPY"
        tooltip={bribeApyTooltipText()}
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[67px] items-center gap-1">
          {row.original.vapy}%
        </div>
      );
    },
    accessorKey: "vapy",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Most weighted gauge" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[141px] items-center">{row.original.mwg}</div>
      );
    },
    accessorKey: "mwg",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribes" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[136px] items-center justify-center gap-1">
          {row.original.bribes}
        </div>
      );
    },
    accessorKey: "bribes",
    enableSorting: false,
  },
];
