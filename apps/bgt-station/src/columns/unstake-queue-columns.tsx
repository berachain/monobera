import React from "react";
import { formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

export interface UnbondingQueueColumns {
  validator: JSX.Element;
  unbondingAmount: bigint;
  timeRemaining: string;
}

export const unstake_queue_columns: ColumnDef<UnbondingQueueColumns>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[150px] text-left">{row.original.validator}</div>
      );
    },
    accessorKey: "validator",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estimated Redemption" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[100px]">
          {formatter.format(
            Number(formatUnits(row.original.unbondingAmount, 18)),
          )}{" "}
          BGT
        </div>
      );
    },
    accessorKey: "unbondingAmount",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Un-stake in" />
    ),
    cell: ({ row }) => {
      return <div className="w-[120px]">{row.original.timeRemaining}</div>;
    },
    accessorKey: "timeRemaining",
    enableSorting: true,
  },
];
