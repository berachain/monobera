import React from "react";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import type { ColumnDef } from "@tanstack/react-table";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { PositionTitle } from "~/app/components/position-title";
import type { IPosition } from "~/types/order-history";
import { PnlWithPercentage } from "../pnl-with-percentage";

export const historyColumns: ColumnDef<IPosition>[] = [
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
          <div className="text-sm">
            {row.original.close_time ? date.toLocaleDateString() : "-"}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.close_time ? date.toLocaleTimeString() : ""}
          </div>
        </div>
      );
    },
    accessorKey: "close_time",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Market / Side"
        className="min-w-[90px]"
      />
    ),
    cell: ({ row }) => (
      <PositionTitle
        market={row.original.market}
        type={row.original.buy === true ? "Long" : "Short"}
        leverage={Number(row.original.leverage) ?? 2}
      />
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
        className="min-w-[32px]"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className=" text-sm font-medium uppercase text-muted-foreground">
          {row.original.close_type || "-"}
        </div>
      );
    },
    accessorKey: "type",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Open Price"
        className="min-w-[100px]"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatUsd(
          formatFromBaseUnit(row.original.open_price ?? "0", 10).toString(10),
        )}
      </div>
    ),

    accessorKey: "open_price",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = Number(rowA.original.open_price);
      const b = Number(rowB.original.open_price);
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
  },

  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Close Price"
        className="min-w-[102px]"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {row.original.close_price === ""
          ? "-"
          : formatUsd(
              formatFromBaseUnit(row.original.close_price ?? "0", 10).toString(
                10,
              ),
            )}
      </div>
    ),
    accessorKey: "close_price",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = Number(rowA.original.close_price);
      const b = Number(rowB.original.close_price);
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const volume = BigNumber(row.original?.volume);

      const openPrice = formatFromBaseUnit(row.original?.open_price ?? "0", 10);
      const size = volume.div(openPrice).dp(4).toString(10);
      return (
        <div>
          {size} {row.original.market.name.split("-")[0]}
        </div>
      );
    },
    accessorKey: "amount",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Position Size"
        className="min-w-[86px]"
      />
    ),
    cell: ({ row }) => {
      return <div>{formatUsd(row.original?.volume ?? "0")}</div>;
    },
    accessorKey: "position_size",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fees" />
    ),
    cell: ({ row }) => {
      const fees =
        Number(row.original.rollover_fee ?? 0) +
        Number(row.original.funding_rate ?? 0) +
        Number(row.original.closing_fee ?? 0) +
        Number(row.original.borrowing_fee ?? 0) +
        Number(row.original.open_fee ?? 0);
      return <div>{formatUsd(fees)}</div>;
    },
    accessorKey: "fees",
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
      const pnl = BigNumber(row.original.pnl).minus(row.original.open_fee);
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
