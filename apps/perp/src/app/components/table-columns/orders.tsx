import React from "react";
import { formatUsd } from "@bera/berajs";
import { DropdownFilter } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import type { ColumnDef } from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { TPSL_TOOLTIP_TEXT } from "~/utils/tooltip-text";
import { CloseOrderModal } from "~/app/components/close-order-modal";
import { PositionTitle } from "~/app/components/position-title";
import { UpdateLimitOrderModal } from "~/app/components/update-limit-order-modal";
import type { ILimitOrder } from "~/types/order-history";
import type { IMarket } from "~/types/market";

export const generateOrdersColumns = (
  markets: IMarket[],
): ColumnDef<ILimitOrder>[] => [
  {
    header: "Time",
    cell: ({ row }) => {
      const date = new Date(Number(row.original.timestamp_placed) * 1000);
      return (
        <div>
          <div className="text-sm font-semibold leading-tight text-foreground ">
            {date.toLocaleDateString()}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {date.toLocaleTimeString()}
          </div>
        </div>
      );
    },
    accessorKey: "timestamp_placed",
    enableSorting: true,
    minSize: 120,
    size: 120,
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
    header: "Position Size",
    cell: ({ row }) => {
      const positionSize = formatFromBaseUnit(
        row.original.position_size,
        18,
      ).times(row.original.leverage ?? "1");
      const openPrice = formatFromBaseUnit(row.original.min_price ?? "0", 10);
      const size = positionSize.div(openPrice).dp(4).toString(10);
      return (
        <div className="flex flex-col">
          <div className="text-sm font-semibold leading-tight text-foreground ">
            {size}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {formatUsd(positionSize.toString(10))}
          </div>
        </div>
      );
    },
    accessorKey: "position_size",
    minSize: 145,
    enableSorting: true,
  },
  {
    header: "Leverage",
    cell: ({ row }) => {
      return <div>{row.original.leverage}x</div>;
    },
    accessorKey: "leverage",
    enableSorting: false,
    minSize: 100,
    size: 100,
  },
  {
    header: "Execution Price",
    cell: ({ row }) => {
      const openPrice = formatFromBaseUnit(row.original.min_price, 10).toString(
        10,
      );
      return <div>{formatUsd(openPrice)}</div>;
    },
    accessorKey: "min_price",
    enableSorting: true,
    minSize: 160,
  },
  {
    header: "TP / SL",
    cell: ({ row }) => (
      <div className="relative w-full text-wrap">
        <span>
          {row.original.tp === "0"
            ? "∞"
            : formatUsd(formatFromBaseUnit(row.original.tp, 10).toString(10)) ??
              "-"}{" "}
        </span>
        /
        <span>
          {" "}
          {row.original.sl === "0"
            ? "∞"
            : formatUsd(formatFromBaseUnit(row.original.sl, 10).toString(10))}
        </span>
      </div>
    ),
    accessorKey: "tp_sl",
    enableSorting: false,
    minSize: 160,
    meta: {
      tooltip: TPSL_TOOLTIP_TEXT,
    },
  },
  {
    header: "Manage",
    cell: ({ row }) => (
      <div className="flex items-center justify-start gap-1">
        <UpdateLimitOrderModal
          type={"limit"}
          openOrder={row.original}
          trigger={
            <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
          }
        />

        <CloseOrderModal
          trigger={
            <Icons.close className="h-6 w-6 cursor-pointer text-destructive-foreground" />
          }
          openOrder={row.original}
        />
      </div>
    ),
    accessorKey: "manage",
    enableSorting: false,
    minSize: 100,
    size: 100,
  },
];
