import React from "react";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader, HoverCard } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import type { ColumnDef } from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { TPSL_TOOLTIP_TEXT } from "~/utils/tooltip-text";
import { CloseOrderModal } from "~/app/components/close-order-modal";
import { PositionTitle } from "~/app/components/position-title";
import { UpdateLimitOrderModal } from "~/app/components/update-limit-order-modal";
import type { ILimitOrder } from "~/types/order-history";

export const ordersColumns: ColumnDef<ILimitOrder>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Time"
        className="min-w-[62px]"
      />
    ),
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
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Market / Action"
        className="min-w-[102px]"
      />
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
        title="Position Size"
        className="min-w-[86px]"
      />
    ),
    cell: ({ row }) => {
      const positionSize = formatFromBaseUnit(
        row.original.position_size,
        18,
      ).times(row.original.leverage ?? "1");
      const openPrice = formatFromBaseUnit(row.original.price ?? "0", 10);
      const size = positionSize.div(openPrice).dp(4).toString(10);
      return (
        <>
          <div className="text-sm font-semibold leading-tight text-foreground ">
            {size}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {formatUsd(positionSize.toString(10))}
          </div>
        </>
      );
    },

    accessorKey: "position_size",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Leverage"
        className="min-w-[60px]"
      />
    ),
    cell: ({ row }) => {
      return <div>{row.original.leverage}x</div>;
    },
    accessorKey: "leverage",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Execution Price"
        className="min-w-[130px]"
      />
    ),
    cell: ({ row }) => {
      const openPrice = formatFromBaseUnit(row.original.price, 10).toString(10);
      return <div>{formatUsd(openPrice)}</div>;
    },
    accessorKey: "price",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="TP / SL"
        tooltip={TPSL_TOOLTIP_TEXT}
        className="min-w-[72px]"
      />
    ),
    cell: ({ row }) => (
      <div className="">
        <span className="text-nowrap">
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
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={"Manage"} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
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
  },
];
