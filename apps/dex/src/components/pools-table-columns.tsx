"use client";

import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader, TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Pool>[] = [
  {
    accessorKey: "tokens",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Composition" />
    ),
    cell: ({ row }) => (
      <div className="ml-2 flex flex-row justify-start">
        {row.getValue("tokens").map((token: any, i: number) => (
          <TokenIcon
            key={token.address}
            token={token}
            className={cn(" border-2 border-border", i !== 0 && "ml-[-15px]")}
          />
        ))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "poolName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("poolName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "rewards",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BGT Rewards" />
    ),
    cell: ({ row }) => {
      return <div className="flex w-[100px] items-center">BGT REWARDS</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dailyVolume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volume(24h)" />
    ),
    cell: ({ row }) => {
      console.log(row);
      const dailyVolume = formatUsd(row.original.dailyVolume || 0);
      return <div className="flex items-center">{dailyVolume}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TVL" />
    ),
    cell: ({ row }) => {
      const totalValue = formatUsd(row.original.totalValue || 0);
      return <div className="flex items-center">{totalValue}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
