import React from "react";
import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits } from "viem";

import { formatBigIntUsd } from "~/utils/formatBigIntUsd";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { PositionTitle } from "~/app/components/position-title";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { useCalculatePnl } from "~/hooks/useCalculatePnl";
import { type Position } from "~/hooks/usePositions";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import { IClosedTrade, ILimitOrder, IMarketOrder } from "./order-history";

const MarkPrice = ({ position }: { position: IMarketOrder }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(position.market.pair_index) ?? 0);

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

const PositionLiquidationPrice = ({ position }: { position: IMarketOrder }) => {
  // const { useMarketIndexPrice } = usePricesSocket();
  // const price = useMarketIndexPrice(Number(position.market.pair_index) ?? 0);

  const formattedPrice = Number(
    formatUnits(BigInt(position.open_price ?? 0n), 10),
  );

  const liqPrice = useCalculateLiqPrice({
    bfLong: position.market.pair_borrowing_fee?.bf_long,
    bfShort: position.market.pair_borrowing_fee?.bf_short,
    orderType: position.buy === true ? "long" : "short",
    price: formattedPrice,
    leverage: position.leverage,
  });

  return (
    <div>
      {liqPrice !== undefined ? (
        formatUsd(liqPrice)
      ) : (
        <Skeleton className="h-[28px] w-[80px]" />
      )}
    </div>
  );
};

const ActivePositionPNL = ({ position }: { position: IMarketOrder }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(position.market.pair_index) ?? 0);

  const pnl = useCalculatePnl({
    currentPrice: BigInt(price ?? 0),
    openPrice: BigInt(position.open_price),
    leverage: Number(position.leverage),
    levPosSize: BigInt(position.position_size),
    borrowingFee: BigInt(position.borrowing_fee),
    rolloverFee: BigInt(position.rollover_fee),
    fundingFee: BigInt(position.funding_rate),
    closingFee: BigInt(position.closing_fee),
    buy: position.buy,
  });

  return (
    <div>
      {pnl !== undefined ? pnl : <Skeleton className="h-[28px] w-[80px]" />}
    </div>
  );
};

export const positions_columns: ColumnDef<IMarketOrder>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market / Slide" />
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
      <DataTableColumnHeader column={column} title="Position Size" />
    ),
    cell: ({ row }) => {
      const positionSize = Number(
        formatUnits(BigInt(row.original.position_size), 18),
      );
      const openPrice = Number(
        formatUnits(BigInt(row.original.open_price), 10),
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
      return <div className="w-[60px]">{row.original.leverage}x</div>;
    },
    accessorKey: "leverage",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entry Price" />
    ),
    cell: ({ row }) => (
      <div>
        {formatUsd(Number(formatUnits(BigInt(row.original.open_price), 10)))}
      </div>
    ),
    accessorKey: "entry_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mark Price" />
    ),
    cell: ({ row }) => <MarkPrice position={row.original} />,
    accessorKey: "current_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Est. Liq. Price" />
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
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Funding" />
    ),
    cell: ({ row }) => <div></div>,
    accessorKey: "funding",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Take Profit / Stop Loss" />
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
      <DataTableColumnHeader column={column} title="Manage" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <UpdatePositionModal
          trigger={
            <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
          }
        />
        <ClosePositionModal
          trigger={
            <Icons.close className="h-6 w-6 cursor-pointer text-destructive-foreground" />
          }
          type={"market"}
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
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="text-xs font-medium leading-tight text-foreground"></div>
    ),

    accessorKey: "position_size",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div></div>,
    accessorKey: "entry_price",
    enableSorting: false,
  },

  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div>
        <div
          className={"text-sm font-semibold leading-5 text-foreground"}
        ></div>
        <div className="text-[10px] uppercase leading-[10px]">Honey</div>
      </div>
    ),
    accessorKey: "total",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={
          <div className="flex justify-end">
            <Button className="bg-destructive px-2 py-1 text-sm font-semibold leading-5 text-destructive-foreground">
              Cancel All Orders
            </Button>
          </div>
        }
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-1">
        <UpdatePositionModal
          trigger={
            <Icons.fileEdit className="h-4 w-4 cursor-pointer text-muted-foreground" />
          }
        />
        <ClosePositionModal
          trigger={
            <Icons.close className="h-6 w-6 cursor-pointer text-destructive-foreground" />
          }
          type="limit"
          openPosition={{} as any}
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
      <DataTableColumnHeader column={column} title="Market / Side" />
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
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      return (
        <div className=" text-sm font-medium uppercase text-muted-foreground">
          {"MARKET"}
        </div>
      );
    },
    accessorKey: "type",
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
      <DataTableColumnHeader column={column} title="Amount" />
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
      <DataTableColumnHeader column={column} title="Position Size" />
    ),
    cell: ({ row }) => {
      const volume = Number(row.original?.volume);
      const leverage = Number(row.original?.leverage);

      const price = volume * leverage;
      return <div>{formatUsd(price)}</div>;
    },
    accessorKey: "entry_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TP / SL" />
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
    accessorKey: "total",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PnL" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="text-[10px] uppercase leading-[10px]">Honey</div>
      </div>
    ),
    accessorKey: "total",
    enableSorting: true,
  },
];

export const pnl_columns: ColumnDef<IClosedTrade>[] = [
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
      <DataTableColumnHeader column={column} title="Entry Price" />
    ),
    cell: ({ row }) => <div></div>,
    accessorKey: "entry_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Exit Price" />
    ),
    cell: ({ row }) => <div></div>,
    accessorKey: "entry_price",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Size" />
    ),
    cell: ({ row }) => (
      <div className="text-xs font-medium leading-tight text-foreground"></div>
    ),

    accessorKey: "position_size",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="PnL" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-success-foreground">
          <div className="text-sm font-semibold leading-tight ">+</div>
          <div className="mt-1 font-medium leading-tight text-[px]">
            (6.69%)
          </div>
        </div>
      );
    },
    accessorKey: "pnl",
    enableSorting: true,
  },
];
