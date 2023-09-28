import React from "react";
import { formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

export const user_supply_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => <>{row.original.market}</>,
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
          {formatter.format(row.original.walletBalance)}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          ${formatter.format(row.original.walletBalanceUS)}
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
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-success-foreground">
        {(row.original.supplyStableAPR * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "supplyStableAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <>{row.original.action}</>,
    accessorKey: "action",
    enableSorting: false,
  },
];

export const user_borrows_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => <>{row.original.market}</>,
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
          {formatter.format(row.original.debtBalance)}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          ${formatter.format(row.original.debtBalanceUS)}
        </div>
      </div>
    ),
    accessorKey: "debtBalanceUS",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Loan APY"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-warning-foreground">
        {(row.original.loanAPY * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "loanAPY",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <>{row.original.action}</>,
    accessorKey: "action",
    enableSorting: false,
  },
];

export const available_supply_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => <>{row.original.market}</>,
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
          {formatter.format(row.original.walletBalance)}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          ${formatter.format(row.original.walletBalanceUS)}
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
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-success-foreground">
        {(row.original.supplyStableAPR * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "supplyStableAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <>{row.original.action}</>,
    accessorKey: "action",
    enableSorting: false,
  },
];

export const available_borrows_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => <>{row.original.market}</>,
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
          {formatter.format(row.original.supplied)}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          ${formatter.format(row.original.supplied * row.original.dollarValue)}
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
        title="Stable APY"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-warning-foreground">
        {(row.original.borrowStableAPR * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "borrowStableAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Variable APY"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="text-warning-foreground">
        {(row.original.borrowVariableAPR * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "borrowVariableAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <>{row.original.action}</>,
    accessorKey: "action",
    enableSorting: false,
  },
];
