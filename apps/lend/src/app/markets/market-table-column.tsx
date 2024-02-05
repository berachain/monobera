import React from "react";
import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader, TokenIcon } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";

import InfoButton from "~/components/info-button";

export const market_table_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        {row.original.token ? (
          <TokenIcon
            address={row.original.address}
            size="lg"
            key={row.original.address}
          />
        ) : (
          <Skeleton className="h-6 w-6" />
        )}
        {row.original.token.name}
      </div>
    ),
    accessorKey: "token",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Supplied" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col pl-1">
        <div className="font-base text-base font-medium">
          {formatter.format(row.original.totalLiquidity)}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          {formatUsd(
            Number(row.original.totalLiquidity) *
              Number(row.original.formattedPriceInMarketReferenceCurrency),
          )}
        </div>
      </div>
    ),
    accessorKey: "totalLiquidity",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply APY" />
    ),
    cell: ({ row }) => (
      <div className="text-base text-success-foreground">
        {(Number(row.original.supplyAPY) * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "supplyAPY",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Borrowed" />
    ),
    cell: () => (
      <div className="flex flex-col pl-1 text-base">
        {/* {formatter.format(Number(row.original.totalDebt))} */} ~~
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          {/* $ ~~ */}
          {/* {formatter.format(
            row.original.totalDebt *
              row.original.formattedPriceInMarketReferenceCurrency,
          )} */}
        </div>
      </div>
    ),
    accessorKey: "totalBorrowed",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borrow APY Variable" />
    ),
    cell: () => (
      <div className="pl-4 text-base text-success-foreground">
        {/* {(Number(formatEther(row.original.variableBorrowAPY)) * 100).toFixed(2)}
        % */}
        ~~
      </div>
    ),
    accessorKey: "currentVariableBorrowRate",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <InfoButton address={row.original.underlyingAsset} />,
    accessorKey: "details",
    enableSorting: false,
  },
];
