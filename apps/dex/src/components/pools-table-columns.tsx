"use client";

import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader, TokenIconList } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import { getAbsoluteUrl } from "~/utils/vercel-utils";

export const columns: ColumnDef<Pool>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tokens",
    header: () => <></>,
    cell: ({ row }) => {
      return (
        <div className="ml-2 flex flex-row justify-start">
          <TokenIconList
            tokenList={row.original.tokens.map((t) => t.address)}
            size={24}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "rewards",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="BGT Rewards" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[160px] items-center">
          {" "}
          <Badge className="flex flex-row items-center gap-1 bg-amber-100 text-xs font-medium text-amber-800 hover:bg-amber-100">
            {row.original.bgtApy}% BGT
          </Badge>
        </div>
      );
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
  {
    accessorKey: "btns",
    header: () => <></>,
    cell: ({ row }) => {
      const address = row.original.pool;

      return (
        <div className="flex flex-row items-center gap-1">
          <Icons.minusSquare
            className="h-5 w-5 text-muted-foreground"
            onClick={() =>
              window.open(`${getAbsoluteUrl()}/pool/${address}/withdraw`)
            }
          />
          <Icons.plusSquare
            className="h-5 w-5 text-muted-foreground"
            onClick={() =>
              window.open(`${getAbsoluteUrl()}/pool/${address}/add-liquidity`)
            }
          />
        </div>
      );
    },
  },
];
