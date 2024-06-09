import React from "react";
import { formatUsd } from "@bera/berajs";
import { DropdownFilter } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { PositionTitle } from "~/app/components/position-title";
import type { IClosedTrade } from "~/types/order-history";
import { PnlWithPercentage } from "../pnl-with-percentage";
import { IMarket } from "~/types/market";

export const generatePnlColumns = (
  markets: IMarket[],
): ColumnDef<IClosedTrade>[] => [
  {
    header: "Open time",
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
    minSize: 130,
    size: 130,
  },
  {
    header: "Close time",
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
    minSize: 130,
    size: 130,
  },
  {
    header: "Market / Action",
    cell: ({ row }) => (
      <PositionTitle
        market={row.original.market}
        type={row.original.buy === true ? "Long" : "Short"}
        leverage={Number(row.original.leverage) ?? 2}
      />
    ),
    accessorKey: "assets",
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      filter: (props: any) => {
        return (
          <DropdownFilter
            {...props}
            items={[
              { label: "All", value: "" },
              ...markets.map((market) => ({
                label: market.name,
                value: market.pair_index,
              })),
            ]}
          />
        );
      },
    },
    minSize: 160,
  },
  {
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className=" text-sm font-medium uppercase text-muted-foreground">
          {row.original.close_type || "-"}
        </div>
      );
    },
    accessorKey: "type",
    enableSorting: false,
    minSize: 120,
    size: 120,
  },
  {
    header: "Open Price",
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatUsd(
          formatFromBaseUnit(row.original.open_price ?? "0", 10).toString(10),
        )}
      </div>
    ),
    accessorKey: "amount",
    enableSorting: true,
  },
  {
    header: "Close Price",
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatUsd(
          formatFromBaseUnit(row.original.close_price ?? "0", 10).toString(10),
        )}
      </div>
    ),
    accessorKey: "total",
    enableSorting: true,
  },
  {
    header: "Size",
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
    enableSorting: true,
  },
  {
    header: "PnL",
    cell: ({ row }) => {
      const positionSize = BigNumber(row.original.volume).div(
        row.original.leverage ?? "1",
      );
      const pnl = BigNumber(row.original.pnl);
      return <PnlWithPercentage positionSize={positionSize} pnl={pnl} />;
    },
    accessorKey: "pnl",
    enableSorting: true,
  },
];
