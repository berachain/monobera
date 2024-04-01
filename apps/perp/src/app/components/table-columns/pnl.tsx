import React from "react";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { PositionTitle } from "~/app/components/position-title";
import type { IClosedTrade } from "~/types/order-history";
import { PnlWithPercentage } from "../pnl-with-percentage";

export const pnlColumns: ColumnDef<IClosedTrade>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Open time"
        className="min-w-[96px]"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(Number(row.original.open_time) * 1000);

      return (
        <div>
          <div className="text-sm">{date.toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">
            {date.toLocaleTimeString()}
          </div>
        </div>
      );
    },
    accessorKey: "open_time",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = new Date(Number(rowA.original.open_time) * 1000);
      const b = new Date(Number(rowB.original.open_time) * 1000);
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Close time"
        className="min-w-[98px]"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(Number(row.original.close_time) * 1000);

      return (
        <div>
          <div className="text-sm">{date.toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">
            {date.toLocaleTimeString()}
          </div>
        </div>
      );
    },
    accessorKey: "close_time",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = new Date(Number(rowA.original.close_time) * 1000);
      const b = new Date(Number(rowB.original.close_time) * 1000);
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => (
      <PositionTitle
        market={row.original.market}
        type={row.original.buy === true ? "Long" : "Short"}
        leverage={Number(row.original.leverage) ?? 2}
      />
    ),
    accessorKey: "assets",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Open Price"
        className="min-w-[72px]"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatUsd(
          formatFromBaseUnit(row.original.open_price ?? "0", 10).toString(10),
        )}
      </div>
    ),

    accessorKey: "amount",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Close Price"
        className="min-w-[74px]"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatUsd(
          formatFromBaseUnit(row.original.close_price ?? "0", 10).toString(10),
        )}
      </div>
    ),
    accessorKey: "total",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      const volume = BigNumber(row.original?.volume);

      const openPrice = formatFromBaseUnit(row.original.open_price ?? "0", 10);
      const size = volume.div(openPrice).dp(4).toString(10);

      return (
        <div>
          {size} {row.original.market.name.split("-")[0]}
        </div>
      );
    },
    accessorKey: "entry_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PnL" />
    ),
    cell: ({ row }) => {
      const positionSize = BigNumber(row.original.volume).div(
        row.original.leverage ?? "1",
      );
      const pnl = BigNumber(row.original.pnl);
      return <PnlWithPercentage positionSize={positionSize} pnl={pnl} />;
    },
    accessorKey: "pnl",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = Number(rowA.original.pnl);
      const b = Number(rowB.original.pnl);
      if (a < 0 && b < 0) {
        if (Math.abs(a) < Math.abs(b)) return 1;
        if (Math.abs(a) > Math.abs(b)) return -1;
      }
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
  },
];
