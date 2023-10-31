import React from "react";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { CloseOrderModal } from "~/app/components/close-order-modal";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { PositionTitle } from "~/app/components/position-title";
import { UpdateLimitOrderModal } from "~/app/components/update-limit-order-modal";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { useCalculatePnl } from "~/hooks/useCalculatePnl";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import type { IClosedTrade, ILimitOrder, IMarketOrder } from "./order-history";

const MarkPrice = ({ position }: { position: IMarketOrder }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(position.market?.pair_index) ?? 0);

  return (
    <div>
      {price !== undefined ? (
        formatUsd(Number(formatUnits(price, 10)))
      ) : (
        <Skeleton className="h-[28px] w-[80px]" />
      )}
    </div>
  );
};

export const PositionLiquidationPrice = ({
  position,
  className,
}: {
  position: IMarketOrder;
  className?: string;
}) => {
  const formattedPrice = Number(
    formatUnits(BigInt(position.open_price ?? 0n), 10),
  );

  const liqPrice = useCalculateLiqPrice({
    bfLong: position.market?.pair_borrowing_fee?.bf_long,
    bfShort: position.market?.pair_borrowing_fee?.bf_short,
    orderType: position.buy === true ? "long" : "short",
    price: formattedPrice,
    leverage: position.leverage,
  });

  return (
    <div className={cn("", className)}>
      {liqPrice !== undefined ? (
        formatUsd(liqPrice)
      ) : (
        <Skeleton className={cn("h-[28px] w-[80px]", className)} />
      )}
    </div>
  );
};

export const ActivePositionPNL = ({
  position,
  className,
}: {
  position: IMarketOrder;
  className?: string;
}) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(position.market?.pair_index) ?? 0);
  const positionSize =
    Number(formatUnits(BigInt(position.position_size), 18)) *
    Number(position.leverage);
  const openPrice = Number(formatUnits(BigInt(position.open_price), 10));

  const size = positionSize / openPrice;

  const fees =
    BigInt(position.rollover_fee) +
    BigInt(position.funding_rate) +
    BigInt(position.closing_fee) +
    BigInt(position.borrowing_fee);

  const pnl = useCalculatePnl({
    currentPrice: BigInt(price ?? 0),
    openPrice: BigInt(position.open_price ?? 0),
    size: size,
    fees: Number(formatUnits(fees, 18)),
    leverage: Number(position.leverage ?? 2),
    buy: position.buy,
  });

  return (
    <div className={cn("", className)}>
      {pnl !== undefined ? (
        <span
          className={cn(
            "",
            pnl > 0 ? "text-success-foreground" : "text-destructive-foreground",
          )}
        >
          {formatUsd(pnl)}
        </span>
      ) : (
        <Skeleton className={cn("h-[28px] w-[80px]", className)} />
      )}
    </div>
  );
};

export const positions_columns: ColumnDef<IMarketOrder>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Market / Slide"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => (
      <PositionTitle
        market={row.original.market}
        type={row.original.buy === true ? "Long" : "Short"}
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
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => {
      const positionSize =
        Number(formatUnits(BigInt(row.original.position_size ?? 0), 18)) *
        Number(row.original.leverage);
      const openPrice = Number(
        formatUnits(BigInt(row.original.open_price ?? 0), 10),
      );
      const size = positionSize / openPrice;
      return (
        <div className="w-[88px]">
          <div className="text-sm font-semibold leading-tight text-foreground ">
            {size.toFixed(4)}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {formatUsd(positionSize)}
          </div>
        </div>
      );
    },
    accessorKey: "position_size",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leverage" />
    ),
    cell: ({ row }) => {
      return <div className="w-[60px]">{row.original.leverage ?? 2}x</div>;
    },
    accessorKey: "leverage",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Entry Price"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => (
      <div>
        {formatUsd(
          Number(formatUnits(BigInt(row.original.open_price ?? 0), 10)),
        )}
      </div>
    ),
    accessorKey: "open_price",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Mark Price"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => <MarkPrice position={row.original} />,
    accessorKey: "current_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Est. Liq. Price"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => <PositionLiquidationPrice position={row.original} />,
    accessorKey: "est_liq_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Est. PnL" />
    ),
    // cell: ({ row }) => (
    //   <div
    //     className={cn(
    //       "text-sm font-semibold leading-tight text-foreground",
    //       row.original.realized_pnl >= 0
    //         ? "text-success-foreground"
    //         : "text-destructive-foreground",
    //     )}
    //   >
    //     {row.original.realized_pnl > 0 && "+"}
    //     {formatUsd(row.original.realized_pnl)}
    //   </div>
    // ),
    cell: ({ row }) => <ActivePositionPNL position={row.original} />,
    accessorKey: "est_pnl",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Funding" />
    ),
    cell: ({ row }) => {
      return <div>{formatBigIntUsd(row.original.borrowing_fee, 18)}</div>;
    },
    accessorKey: "funding",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="TP / SL"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => (
      <div className="">
        <span className="text-success-foreground">
          {row.original.tp === "0"
            ? "∞"
            : formatUsd(
                Number(formatUnits(BigInt(row.original.tp ?? 0), 10)),
              ) ?? "-"}{" "}
        </span>
        /
        <span className="text-destructive-foreground">
          {" "}
          {row.original.sl === "0"
            ? "∞"
            : formatUsd(Number(formatUnits(BigInt(row.original.sl ?? 0), 10)))}
        </span>
      </div>
    ),
    accessorKey: "tp_sl",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manage" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <UpdatePositionModal
          type={"market"}
          openPosition={row.original}
          trigger={
            <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
          }
        />
        <ClosePositionModal
          trigger={
            <Icons.close className="h-6 w-6 cursor-pointer text-destructive-foreground" />
          }
          openPosition={row.original}
        />
      </div>
    ),
    accessorKey: "manage",
    enableSorting: false,
  },
];

export const orders_columns: ColumnDef<ILimitOrder>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({}) => {
      const date = new Date();
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
    accessorKey: "time",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({}) => (
      <div className=" text-xs font-medium uppercase text-muted-foreground">
        LIMIT
      </div>
    ),
    accessorKey: "type",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market / Action" />
    ),
    cell: ({ row }) => (
      <PositionTitle
        market={row.original.market}
        type={row.original.buy === true ? "Long" : "Short"}
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
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => {
      const positionSize = Number(
        formatUnits(BigInt(row.original.position_size), 18),
      );
      const openPrice = Number(formatUnits(BigInt(row.original.price), 10));
      const size = positionSize / openPrice;
      return (
        <div className="w-[88px]">
          <div className="text-sm font-semibold leading-tight text-foreground ">
            {size.toFixed(4)}
          </div>
          <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
            {formatUsd(positionSize)}
          </div>
        </div>
      );
    },

    accessorKey: "position_size",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leverage" />
    ),
    cell: ({ row }) => {
      return <div className="w-[60px]">{row.original.leverage}x</div>;
    },
    accessorKey: "leverage",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Execution Price"
        className="min-w-[140px]"
      />
    ),
    cell: ({ row }) => {
      const openPrice = Number(formatUnits(BigInt(row.original.price), 10));
      return <div>{formatUsd(openPrice)}</div>;
    },
    accessorKey: "price",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TP/ SL" />
    ),
    cell: ({ row }) => (
      <div className="">
        <span className="text-success-foreground">
          {row.original.tp === "0"
            ? "∞"
            : formatUsd(Number(formatUnits(BigInt(row.original.tp), 10))) ??
              "-"}{" "}
        </span>
        /
        <span className="text-destructive-foreground">
          {" "}
          {row.original.sl === "0"
            ? "∞"
            : formatUsd(Number(formatUnits(BigInt(row.original.sl), 10)))}
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

export const history_columns: ColumnDef<IClosedTrade>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Open time"
        className="min-w-[120px]"
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
        className="min-w-[120px]"
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
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Market / Side"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => (
      <PositionTitle
        market={row.original.market}
        type={row.original.buy === true ? "Long" : "Short"}
      />
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className=" text-sm font-medium uppercase text-muted-foreground">
          {row.original.close_type}
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
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatBigIntUsd(row.original.open_price, 10)}
      </div>
    ),

    accessorKey: "open_price",
    enableSorting: true,
  },

  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Close Price"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatBigIntUsd(row.original.close_price, 10)}
      </div>
    ),
    accessorKey: "close_price",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const volume = Number(row.original?.volume);

      const openPrice = Number(
        formatUnits(BigInt(row.original.open_price ?? 0), 10),
      );
      const size = volume / openPrice;
      return (
        <div>
          {size.toFixed(4)} {row.original.market.name.split("-")[0]}
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
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => {
      const volume = Number(row.original?.volume);

      const price = volume;
      return <div>{formatUsd(price)}</div>;
    },
    accessorKey: "position_size",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="TP / SL"
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => (
      <div className="">
        <span className="text-success-foreground">
          {row.original.tp === "0"
            ? "∞"
            : formatUsd(Number(formatUnits(BigInt(row.original.tp), 10))) ??
              "-"}{" "}
        </span>
        /
        <span className="text-destructive-foreground">
          {" "}
          {row.original.sl === "0"
            ? "∞"
            : formatUsd(Number(formatUnits(BigInt(row.original.sl), 10)))}
        </span>
      </div>
    ),
    accessorKey: "total",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fees" />
    ),
    cell: ({ row }) => {
      const fees =
        Number(row.original.rollover_fee) +
        Number(row.original.funding_rate) +
        Number(row.original.closing_fee) +
        Number(row.original.borrowing_fee) +
        Number(row.original.vault_fee) +
        Number(row.original.staking_fee);
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
      return (
        <div className="text-sm font-medium leading-tight ">
          <span
            className={cn(
              "",
              Number(row.original.pnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(row.original.pnl)}
          </span>
        </div>
      );
    },
    accessorKey: "pnl",
    enableSorting: true,
  },
];

export const pnl_columns: ColumnDef<IClosedTrade>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open time" />
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
    accessorKey: "time",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Close time" />
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
    accessorKey: "time",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => (
      <PositionTitle
        market={row.original.market}
        type={row.original.buy === true ? "Long" : "Short"}
      />
    ),
    accessorKey: "assets",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open Price" />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatBigIntUsd(row.original.open_price, 10)}
      </div>
    ),

    accessorKey: "amount",
    enableSorting: false,
  },

  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Close Price" />
    ),
    cell: ({ row }) => (
      <div className="text-sm font-medium leading-tight text-foreground">
        {formatBigIntUsd(row.original.close_price, 10)}
      </div>
    ),
    accessorKey: "total",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => {
      const volume = Number(row.original?.volume);
      const leverage = Number(row.original?.leverage);

      const openPrice = Number(
        formatUnits(BigInt(row.original.open_price ?? 0), 10),
      );
      const size = (volume * leverage) / openPrice;
      return (
        <div>
          {size.toFixed(4)} {row.original.market.name.split("-")[0]}
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
      return (
        <div className="text-sm font-medium leading-tight ">
          <span
            className={cn(
              "",
              Number(row.original.pnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
            )}
          >
            {formatUsd(row.original.pnl)}
          </span>
        </div>
      );
    },
    accessorKey: "pnl",
    enableSorting: true,
  },
];
