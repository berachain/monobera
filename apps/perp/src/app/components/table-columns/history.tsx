import React, { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import type { ColumnDef } from "@tanstack/react-table";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { PositionTitle } from "~/app/components/position-title";
import type { IMarketOrder, IOpenTrade } from "~/types/order-history";
import { MarketTradePNL } from "../market-trade-pnl";
import { PnlWithPercentage } from "../pnl-with-percentage";

export const historyColumns: ColumnDef<IMarketOrder>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Open time"
        className="min-w-[96px]"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(Number(row.original.timestamp_open) * 1000);

      return (
        <div>
          <div className="text-sm">{date.toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">
            {date.toLocaleTimeString()}
          </div>
        </div>
      );
    },
    accessorKey: "timestamp_open",
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
      const date = new Date(Number(row.original.timestamp_close) * 1000);
      return (
        <div>
          <div className="text-sm">
            {row.original.trade_open ? "-" : date.toLocaleDateString()}
          </div>
          <div className="text-xs text-muted-foreground">
            {row.original.trade_open ? "" : date.toLocaleTimeString()}
          </div>
        </div>
      );
    },
    accessorKey: "timestamp_close",
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
        {row.original.price === "" || row.original.trade_open
          ? "-"
          : formatUsd(
              formatFromBaseUnit(row.original.price ?? "0", 10).toString(10),
            )}
      </div>
    ),
    accessorKey: "price",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = Number(rowA.original.price);
      const b = Number(rowB.original.price);
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
      const volume = formatFromBaseUnit(
        row.original?.initial_pos_token ?? "0",
        18,
      ).times(row.original?.leverage ?? "0");

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
      return (
        <div>
          {formatUsd(
            formatFromBaseUnit(row.original?.position_size_honey ?? "0", 18)
              .times(row.original?.leverage ?? "0")
              .toString(10),
          )}
        </div>
      );
    },
    accessorKey: "position_size",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fees" />
    ),
    cell: ({ row }) => {
      const fees = formatFromBaseUnit(
        row.original?.rollover_fee ?? "0",
        18,
      ).plus(
        formatFromBaseUnit(row.original?.funding_fee ?? "0", 18).plus(
          formatFromBaseUnit(row.original?.closing_fee ?? "0", 18).plus(
            formatFromBaseUnit(row.original?.borrowing_fee ?? "0", 18).plus(
              formatFromBaseUnit(row.original?.open_fee ?? "0", 18),
            ),
          ),
        ),
      );
      return <div>{formatUsd(fees.toString(10))}</div>;
    },
    accessorKey: "fees",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PnL" />
    ),
    cell: ({ row }) => {
      if (row.original.pnl) {
        const positionSize = formatFromBaseUnit(
          row.original?.position_size_honey ?? "0",
          18,
        ).times(row.original?.leverage ?? "0");
        const pnl = formatFromBaseUnit(row.original.pnl, 18);
        return <PnlWithPercentage positionSize={positionSize} pnl={pnl} />;
      }
      return (
        <MarketTradePNL
          position={row.original}
          positionSize={row.original.initial_pos_token}
          closePrice={row.original.trade_open ? undefined : row.original.price}
          hoverState={false}
        />
      );
    },
    accessorKey: "pnl",
    enableSorting: false,
  },
];
