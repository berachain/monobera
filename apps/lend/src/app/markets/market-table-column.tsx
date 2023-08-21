import React from "react";
import { type Columns } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export const market_table_columns: Columns = [
  {
    header: <div className="w-[130px] text-left">Market</div>,
    accessor: "market",
  },
  {
    header: (
      <div className="flex w-[156px] gap-1">
        Total Supplied
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "total_supplied",
  },
  {
    header: (
      <div className="flex w-[85px] gap-1">
        Supply APY
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "supply_apy",
  },
  {
    header: (
      <div className="flex w-[156px] gap-1">
        Total Borrowed
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "total_borrowed",
  },
  {
    header: (
      <div className="flex w-[138px] gap-1">
        Borrow APY Variable
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "borrow_apy_variable",
  },
  {
    header: (
      <div className="flex w-[138px] gap-1">
        Borrow APY Stable
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "borrow_apy_stable",
  },
  {
    header: <div className="h-1 w-[91px]" />,
    accessor: "details",
  },
];
