import React, { use, useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader, HoverState } from "@bera/shared-ui";
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
import {
  EST_PNL_TOOLTIP_TEXT,
  TPSL_TOOLTIP_TEXT,
} from "../../../utils/tooltip-text";
import type { IMarket } from "../page";
import type { IClosedTrade, ILimitOrder, IMarketOrder } from "./order-history";
import { PnLRowHoverState } from "./pnl-row-hover-state";

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
  markets,
}: {
  position: IMarketOrder;
  className?: string;
  markets: IMarket[];
}) => {
  const formattedPrice = Number(
    formatUnits(BigInt(position.open_price ?? 0n), 10),
  );

  const positionMarket = markets?.find(
    (market) => Number(market.pair_index) === Number(position.pair_index),
  );
  const formattedBfLong = formatUnits(
    BigInt(positionMarket?.pair_borrowing_fee?.bf_long ?? "0"),
    18,
  );
  const formattedBfShort = formatUnits(
    BigInt(positionMarket?.pair_borrowing_fee?.bf_short ?? "0"),
    18,
  );

  const liqPrice = useCalculateLiqPrice({
    bfLong: formattedBfLong,
    bfShort: formattedBfShort,
    orderType: position.buy === true ? "long" : "short",
    price: formattedPrice,
    leverage: position.leverage,
  });

  return (
    <div className={cn("", className)}>
      {Number(position.liq_price) !== 0 ? (
        formatBigIntUsd(position.liq_price, 10)
      ) : liqPrice !== undefined ? (
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
  const pnl = useCalculatePnl({
    currentPrice: price,
    openPosition: position,
  });

  const percentage = useMemo(() => {
    if (!pnl || !position) return 0;
    const positionSize = Number(
      formatUnits(BigInt(position.position_size ?? 0), 18),
    );
    const currentSize = positionSize + pnl;
    const percentage = ((currentSize - positionSize) / positionSize) * 100;
    return percentage;
  }, [pnl, position]);

  const initialCollateral = Number(
    formatUnits(BigInt(position.position_size ?? 0), 18),
  );

  const borrowFee = Number(
    formatUnits(BigInt(position.borrowing_fee ?? 0), 18),
  );
  const closeFee = Number(formatUnits(BigInt(position.closing_fee ?? 0), 18));
  return (
    <div className={cn("", className)}>
      {pnl !== undefined ? (
        <div
          className={cn(
            "z-1000 group relative flex flex-col items-start",
            pnl > 0 ? "text-success-foreground" : "text-destructive-foreground",
          )}
        >
          {formatUsd(pnl)}

          <div className="text-xs">({percentage.toFixed(2)}%)</div>
          <HoverState>
            <PnLRowHoverState
              initialCollateral={initialCollateral}
              pnl={pnl}
              borrowFee={borrowFee}
              closeFee={closeFee}
            />
          </HoverState>
        </div>
      ) : (
        <Skeleton className={cn("h-[28px] w-[80px]", className)} />
      )}
    </div>
  );
};

export const PnlWithPercentage = ({
  positionSize,
  pnl,
}: {
  positionSize: number | undefined;
  pnl: number | undefined;
}) => {
  const percentage = useMemo(() => {
    if (!positionSize || !pnl) return 0;
    const currentSize = positionSize + Number(pnl);
    const percentage = ((currentSize - positionSize) / positionSize) * 100;
    return percentage;
  }, [positionSize, pnl]);
  return (
    <div className="items-start text-sm font-medium leading-tight ">
      <span
        className={cn(
          "flex flex-col items-start",
          Number(pnl) > 0
            ? "text-success-foreground"
            : "text-destructive-foreground",
        )}
      >
        {formatUsd(pnl ?? 0)}
        <div className="text-xs">({percentage.toFixed(2)}%)</div>
      </span>
    </div>
  );
};

export const getPositionColumns = (markets: IMarket[]) => {
  const positions_columns: ColumnDef<IMarketOrder>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Market / Slide"
          className="w-fit"
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
          className="w-fit"
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
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Entry Price"
          className="w-fit"
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
          className="w-fit"
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
          className="w-fit"
        />
      ),
      cell: ({ row }) => (
        <PositionLiquidationPrice position={row.original} markets={markets} />
      ),
      accessorKey: "liq_price",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="TP / SL"
          className="w-fit"
          tooltip={TPSL_TOOLTIP_TEXT}
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
              : formatUsd(
                  Number(formatUnits(BigInt(row.original.sl ?? 0), 10)),
                )}
          </span>
        </div>
      ),
      accessorKey: "tp_sl",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Est. PnL"
          className="w-fit"
          tooltip={EST_PNL_TOOLTIP_TEXT}
        />
      ),
      cell: ({ row }) => <ActivePositionPNL position={row.original} />,
      accessorKey: "est_pnl",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Funding" />
      ),
      cell: ({ row }) => {
        return <div>{formatBigIntUsd(row.original.funding_rate, 18)}</div>;
      },
      accessorKey: "funding",
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
  return positions_columns;
};
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
        className="min-w-[120px]"
      />
    ),
    cell: ({ row }) => {
      const positionSize =
        Number(formatUnits(BigInt(row.original.position_size), 18)) *
        Number(row.original.leverage);
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
    enableSorting: false,
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
      <DataTableColumnHeader
        column={column}
        title="TP / SL"
        tooltip={TPSL_TOOLTIP_TEXT}
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
        leverage={Number(row.original.leverage) ?? 2}
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
        tooltip={TPSL_TOOLTIP_TEXT}
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
    enableSorting: false,
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
        Number(row.original.vault_fee);
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
      // const percentage = useMemo(() => {
      //   if (!row) return 0;
      //   const positionSize = Number(row.original.volume);
      //   const currentSize = positionSize + Number(row.original.pnl);
      //   const percentage = ((currentSize - positionSize) / positionSize) * 100;
      //   return percentage;
      // }, [row]);
      return (
        <PnlWithPercentage
          positionSize={
            Number(row.original.volume) / Number(row.original.leverage)
          }
          pnl={Number(row.original.pnl)}
        />
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
    sortingFn: (rowA, rowB) => {
      const a = new Date(Number(rowA.original.open_time));
      const b = new Date(Number(rowB.original.open_time));
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    },
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
    sortingFn: (rowA, rowB) => {
      const a = new Date(Number(rowA.original.close_time));
      const b = new Date(Number(rowB.original.close_time));
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
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
    enableSorting: false,
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
        <PnlWithPercentage
          positionSize={
            Number(row.original.volume) / Number(row.original.leverage)
          }
          pnl={Number(row.original.pnl)}
        />
      );
    },
    accessorKey: "pnl",
    enableSorting: true,
  },
];
