import React, { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader, Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { EST_PNL_TOOLTIP_TEXT, TPSL_TOOLTIP_TEXT } from "~/utils/tooltip-text";
import { PositionTitle } from "~/app/components/position-title";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { useCalculatePnl } from "~/hooks/useCalculatePnl";
import { usePricesSocket } from "~/hooks/usePricesSocket";
import type { IMarket } from "~/types/market";
import type { IMarketOrder } from "~/types/order-history";
import { PnLRowHoverState } from "../../berpetuals/components/pnl-row-hover-state";

const MarkPrice = ({ position }: { position: IMarketOrder }) => {
  const { useMarketIndexPrice } = usePricesSocket();
  const price = useMarketIndexPrice(Number(position.market?.pair_index) ?? 0);

  return (
    <div>
      {price !== undefined ? (
        formatUsd(formatFromBaseUnit(price, 10).toString(10))
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
  const formattedPrice = formatFromBaseUnit(
    position.open_price ?? "0",
    10,
  ).toString(10);

  const positionMarket = markets?.find(
    (market) => Number(market.pair_index) === Number(position.pair_index),
  );
  const formattedBfLong = formatFromBaseUnit(
    positionMarket?.pair_borrowing_fee?.bf_long ?? "0",
    18,
  ).toString(10);
  const formattedBfShort = formatFromBaseUnit(
    positionMarket?.pair_borrowing_fee?.bf_short ?? "0",
    18,
  ).toString(10);

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
        formatUsd(formatFromBaseUnit(position.liq_price, 10).toString(10))
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
  wrapped,
}: {
  position: IMarketOrder;
  className?: string;
  wrapped?: boolean;
}) => {
  const { useMarketIndexPrice } = usePricesSocket();

  const price = useMarketIndexPrice(Number(position.market?.pair_index) ?? 0);
  const pnl = useCalculatePnl({
    currentPrice: price,
    openPosition: position,
  });

  const percentage = useMemo(() => {
    if (!pnl || !position) return "0";
    const positionSizeBN = formatFromBaseUnit(position.position_size, 18);
    const currentSize = positionSizeBN.plus(pnl);
    const percentage = currentSize
      .minus(positionSizeBN)
      .div(positionSizeBN)
      .times(100);
    return percentage.dp(2).toString(10);
  }, [pnl, position]);

  const initialCollateral = formatFromBaseUnit(position.position_size, 18)
    .plus(formatFromBaseUnit(position.open_fee, 18))
    .toString(10);
  const borrowFee = formatFromBaseUnit(position.borrowing_fee, 18).toString(10);
  const closeFee = formatFromBaseUnit(position.closing_fee, 18).toString(10);
  const openFee = formatFromBaseUnit(position.open_fee, 18).toString(10);

  return (
    <div className={cn("", className)}>
      {pnl !== undefined ? (
        <div>
          <div
            className={cn(
              " flex flex-col items-start",
              Number(pnl) > 0
                ? "text-success-foreground"
                : "text-destructive-foreground",
              wrapped && "flex-row gap-1",
            )}
          >
            <Tooltip
              toolTripTrigger={
                <div className="cursor-help underline decoration-dashed">
                  {formatUsd(pnl)}
                </div>
              }
              children={
                <PnLRowHoverState
                  initialCollateral={initialCollateral}
                  pnlAfterFees={pnl}
                  borrowFee={borrowFee}
                  closeFee={closeFee}
                  openFee={openFee}
                />
              }
            />
            {wrapped && <div className="text-xs"> | </div>}
            <div className="text-xs">({percentage}%)</div>
          </div>
        </div>
      ) : (
        <Skeleton className={cn("h-[28px] w-[80px]", className)} />
      )}
    </div>
  );
};

export const generatePositionColumns = (
  markets: IMarket[],
  setUpdateOpen: (state: boolean | IMarketOrder) => void,
  setDeleteOpen: (state: boolean | IMarketOrder) => void,
) => {
  const positionsColumns: ColumnDef<IMarketOrder>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Market / Slide"
          className="min-w-[94px]"
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
        const openPrice = formatFromBaseUnit(row.original.open_price, 10);
        const size = positionSize.div(openPrice).dp(4).toString(10);
        return (
          <div className="w-[88px]">
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
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Entry Price"
          className="min-w-[100px]"
        />
      ),
      cell: ({ row }) => (
        <div>
          {formatUsd(
            formatFromBaseUnit(row.original.open_price, 10).toString(10),
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
          className="min-w-[72px]"
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
          className="min-w-[90px]"
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
          className="min-w-[76px]"
          tooltip={TPSL_TOOLTIP_TEXT}
        />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <div className="flex flex-nowrap">
            <span>
              {row.original.tp === "0"
                ? "∞"
                : row.original.tp
                  ? formatUsd(
                      formatFromBaseUnit(row.original.tp, 10).toString(10),
                    )
                  : "-"}
            </span>
            <span className="ml-1">/</span>
          </div>
          <span>
            {row.original.sl === "0"
              ? "∞"
              : row.original.sl
                ? formatUsd(
                    formatFromBaseUnit(row.original.sl, 10).toString(10),
                  )
                : "-"}
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
          className="min-w-[78px]"
          tooltip={EST_PNL_TOOLTIP_TEXT}
        />
      ),
      cell: ({ row }) => <ActivePositionPNL position={row.original} />,
      accessorKey: "est_pnl",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Borrow Fee"
          className="min-w-[76px]"
        />
      ),
      cell: ({ row }) => {
        return (
          <div>
            {formatUsd(
              formatFromBaseUnit(row.original.borrowing_fee, 18).toString(10),
            )}
          </div>
        );
      },
      accessorKey: "borrow_fee",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Manage"
          className="min-w-[56px]"
        />
      ),
      cell: ({ row }) => (
        <div className="align-center flex">
          <Icons.fileEdit
            className="mt-1 h-4 w-4 cursor-pointer text-muted-foreground"
            onClick={() => setUpdateOpen(row.original)}
          />
          <Icons.close
            className="h-6 w-6 cursor-pointer text-destructive-foreground"
            onClick={() => setDeleteOpen(row.original)}
          />
        </div>
      ),
      accessorKey: "manage",
      enableSorting: false,
    },
  ];
  return positionsColumns;
};
