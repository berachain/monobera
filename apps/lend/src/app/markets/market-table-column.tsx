import React from "react";
import { formatter } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

export const market_table_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Market" />
    ),
    cell: ({ row }) => <>{row.original.token}</>,
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
          {formatter.format(row.original.supplied)}
        </div>
        <div className="text-xs font-medium leading-tight text-muted-foreground">
          ${formatter.format(row.original.supplied * row.original.dollarValue)}
        </div>
      </div>
    ),
    accessorKey: "totalSupplied",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Supply APY" />
    ),
    cell: ({ row }) => (
      <div className="text-success-foreground">
        {(row.original.supplyAPR * 100).toFixed(2)}%
      </div>
    ),
    accessorKey: "supplyAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Borrowed" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col pl-1 text-base">
        {row.original.borrowed ? (
          <>
            <div>{formatter.format(row.original.borrowed)}</div>
            <div className="text-xs font-medium leading-tight text-muted-foreground">
              $
              {formatter.format(
                row.original.totalBorrowed * row.original.dollarValue,
              )}
            </div>
          </>
        ) : (
          "~~"
        )}
      </div>
    ),
    accessorKey: "totalBorrowed",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borrow APY Variable" />
    ),
    cell: ({ row }) => (
      <div className="pl-4 text-base text-success-foreground">
        {row.original.borrowVariableAPR ? (
          <>{(row.original.borrowVariableAPR * 100).toFixed(2)}%</>
        ) : (
          "~~"
        )}
      </div>
    ),
    accessorKey: "supplyAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Borrow APY Stable" />
    ),
    cell: ({ row }) => (
      <div className="pl-4 text-base text-success-foreground">
        {row.original.borrowVariableAPR ? (
          <>{(row.original.borrowStableAPR * 100).toFixed(2)}%</>
        ) : (
          "~~"
        )}
      </div>
    ),
    accessorKey: "supplyAPR",
    enableSorting: true,
  },
  {
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    cell: ({ row }) => <>{row.original.details}</>,
    accessorKey: "details",
    enableSorting: false,
  },
];
