import React from "react";
import { formatter } from "@bera/berajs";
import { DataTableColumnHeader, TokenIcon } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

import InfoButton from "~/components/info-button";
import BorrowBtn from "~/components/modals/borrow-button";
import RepayBtn from "~/components/modals/repay-button";
import SupplyBtn from "~/components/modals/supply-button";
import WithdrawBtn from "~/components/modals/withdraw-button";

export const user_supply_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        <TokenIcon token={row.original} size="lg" />
        {row.original.symbol}
      </div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Token Supplied"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col pl-1">
        <div className="font-medium">
          {formatter.format(Number(row.original.formattedBalance))}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          $
          {formatter.format(
            Number(row.original.formattedBalance) *
              Number(
                row.original.reserveData
                  .formattedPriceInMarketReferenceCurrency,
              ),
          )}
        </div>
      </div>
    ),
    accessorKey: "balance",
    enableSorting: true,
  },
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Supply APY"
  //       tooltip={
  //         <>
  //           Supply APY (Annual Percentage Yield) represents the annualized
  //           return on supplied assets.
  //         </>
  //       }
  //       className="whitespace-nowrap"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="text-success-foreground">
  //       {(Number(row.original.reserveData.supplyAPY) * 100).toFixed(2)}%
  //     </div>
  //   ),
  //   accessorKey: "supplyAPR",
  //   enableSorting: true,
  // },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <SupplyBtn token={row.original} />
        <WithdrawBtn token={row.original} />
      </div>
    ),
    accessorKey: "action",
    enableSorting: false,
  },
];

export const user_borrows_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        <TokenIcon token={row.original} size="lg" />
        {row.original.symbol}
      </div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Debt Amount"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col pl-1">
        <div className="font-medium">
          {formatter.format(Number(row.original.formattedBalance))}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          $
          {formatter.format(
            Number(row.original.formattedBalance) *
              Number(
                row.original.reserveData
                  .formattedPriceInMarketReferenceCurrency,
              ),
          )}
        </div>
      </div>
    ),
    accessorKey: "balance",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Loan APY"
        tooltip={
          <>
            Variable interest rate will fluctuate based on the market
            conditions.
          </>
        }
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-warning-foreground">
        {(Number(row.original.reserveData.variableBorrowAPY) * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "variableBorrowAPY",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <BorrowBtn token={row.original} />
        <RepayBtn token={row.original} />
      </div>
    ),
    accessorKey: "action",
    enableSorting: false,
  },
];

export const available_supply_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        <TokenIcon token={row.original} size="lg" />
        {row.original.symbol}
      </div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Wallet Balance"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col pl-1">
        <div className="font-medium">
          {formatter.format(Number(row.original.formattedBalance))}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          $
          {formatter.format(
            Number(row.original.formattedBalance) *
              Number(
                row.original.reserveData
                  .formattedPriceInMarketReferenceCurrency,
              ),
          )}
        </div>
      </div>
    ),
    accessorKey: "walletBalanceUS",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Supply APY"
        tooltip={
          <>
            Supply APY (Annual Percentage Yield) represents the annualized
            return on supplied assets.
          </>
        }
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-success-foreground">
        {(Number(row.original.reserveData.supplyAPY) * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "supplyAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <SupplyBtn token={row.original} />
        <InfoButton address={row.original.address} />
      </div>
    ),
    accessorKey: "action",
    enableSorting: false,
  },
];

export const available_borrows_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm font-medium leading-none">
        <TokenIcon token={row.original} size="lg" />
        {row.original.symbol}
      </div>
    ),
    accessorKey: "market",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Avaliable"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col pl-1">
        <div className="font-medium">
          {formatter.format(Number(row.original.formattedBalance))}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          $
          {formatter.format(
            Number(row.original.formattedBalance) *
              Number(
                row.original.reserveData
                  .formattedPriceInMarketReferenceCurrency,
              ),
          )}
        </div>
      </div>
    ),
    accessorKey: "avaliableUS",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Variable APY"
        tooltip={
          <>
            Variable interest rate will fluctuate based on the market
            conditions.
          </>
        }
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-warning-foreground">
        {(Number(row.original.reserveData.variableBorrowAPY) * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "variableBorrowAPY",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <BorrowBtn token={row.original} />
        <InfoButton address={row.original.address} />
      </div>
    ),
    accessorKey: "action",
    enableSorting: false,
  },
];
