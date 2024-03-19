import React from "react";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIcon,
} from "@bera/shared-ui";
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
          <FormattedNumber
            value={row.original.totalLiquidity}
            compact={false}
          />
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          <FormattedNumber
            value={
              Number(row.original.totalLiquidity) *
              Number(row.original.formattedPriceInMarketReferenceCurrency)
            }
            compact={false}
            symbol="USD"
          />
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
    cell: ({ row }) => (
      <div className="flex flex-col pl-1 text-base">
        <FormattedNumber compact={false} value={row.original.totalDebt} />
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          <FormattedNumber
            compact={false}
            value={
              row.original.totalDebt *
              row.original.formattedPriceInMarketReferenceCurrency
            }
            symbol="USD"
          />
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
