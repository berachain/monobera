import { formatUsd } from "@bera/berajs";
import { DropdownFilter } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { EST_PNL_TOOLTIP_TEXT, TPSL_TOOLTIP_TEXT } from "~/utils/tooltip-text";
import { PositionTitle } from "~/app/components/position-title";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { usePollPrices } from "~/hooks/usePollPrices";
import type { IMarket } from "~/types/market";
import type { IOpenTrade } from "~/types/order-history";
import { MarketTradePNL } from "../market-trade-pnl";

const MarkPrice = ({ position }: { position: IOpenTrade }) => {
  const { marketPrices } = usePollPrices();
  const price = marketPrices[position?.market?.pair_index ?? ""] ?? "0";

  return (
    <div>
      {price !== "0" ? (
        formatUsd(price)
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
  position: IOpenTrade;
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

export const generatePositionColumns = (
  markets: IMarket[],
  setUpdateOpen: (state: boolean | IOpenTrade) => void,
  setDeleteOpen: (state: boolean | IOpenTrade) => void,
) => {
  const positionsColumns: ColumnDef<IOpenTrade>[] = [
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
        const openPrice = formatFromBaseUnit(row.original.open_price, 10);
        const size = positionSize.div(openPrice).dp(4);

        return (
          <div className="">
            <div className="text-sm font-semibold leading-tight text-foreground ">
              {size.isFinite() ? size.toString(10) : "-"}
            </div>
            <div className="mt-1 text-xs font-medium leading-tight text-muted-foreground">
              {formatUsd(positionSize.toString(10))}
            </div>
          </div>
        );
      },
      accessorKey: "position_size",
      minSize: 145,
      size: 145,
      enableSorting: true,
    },
    {
      header: "Entry Price",
      cell: ({ row }) => (
        <div>
          {formatUsd(
            formatFromBaseUnit(row.original.open_price, 10).toString(10),
          )}
        </div>
      ),
      accessorKey: "open_price",
      enableSorting: true,
      minSize: 140,
      size: 140,
    },
    {
      header: "Mark Price",
      cell: ({ row }) => <MarkPrice position={row.original} />,
      accessorKey: "current_price",
      enableSorting: false,
      minSize: 140,
      size: 140,
    },
    {
      header: "Est. Liq. Price",
      cell: ({ row }) => (
        <PositionLiquidationPrice position={row.original} markets={markets} />
      ),
      accessorKey: "liq_price",
      enableSorting: false,
      minSize: 140,
      size: 140,
    },
    {
      header: "TP / SL",
      cell: ({ row }) => (
        <div className="relative w-full text-wrap">
          <span>
            {row.original.tp === "0"
              ? "∞"
              : row.original.tp
                ? formatUsd(
                    formatFromBaseUnit(row.original.tp, 10).toString(10),
                  )
                : "-"}{" "}
          </span>
          /
          <span>
            {" "}
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
      minSize: 160,
      meta: {
        tooltip: TPSL_TOOLTIP_TEXT,
      },
    },
    {
      header: "Est. PnL",
      cell: ({ row }) => (
        <MarketTradePNL
          position={row.original}
          positionSize={row.original.position_size}
        />
      ),
      accessorKey: "est_pnl",
      enableSorting: false,
      meta: {
        tooltip: EST_PNL_TOOLTIP_TEXT,
      },
    },
    {
      header: "Borrow Fee",
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
      header: "Manage",
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
      minSize: 100,
      size: 100,
    },
  ];
  return positionsColumns;
};
