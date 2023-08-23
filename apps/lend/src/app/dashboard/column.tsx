import React from "react";
import { Tooltip, type Columns } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export const user_supply_columns: Columns = [
  {
    header: <div className="w-[100px] text-left">Market</div>,
    accessor: "market",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Wallet Balance
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "wallet_balance",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Supply APY
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "supply_apy",
  },
  {
    header: <div className="h-1 w-[150px]" />,
    accessor: "action",
  },
];

export const user_borrows_columns: Columns = [
  {
    header: <div className="w-[100px] text-left">Market</div>,
    accessor: "market",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Wallet Balance
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "wallet_balance",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Borrow APY
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "borrow_apy",
  },
  {
    header: <div className="h-1 w-[120px]" />,
    accessor: "action",
  },
];

export const available_supply_columns: Columns = [
  {
    header: <div className="w-[100px] text-left">Market</div>,
    accessor: "market",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Wallet Balance
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "wallet_balance",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Estimated APY
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "estimated_apy",
  },
  {
    header: <div className="h-1 w-[150px]" />,
    accessor: "action",
  },
];

export const available_borrows_columns: Columns = [
  {
    header: <div className="w-[100px] text-left">Market</div>,
    accessor: "market",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Available
        <Tooltip text="Borrow APY" />
      </div>
    ),
    accessor: "available",
  },
  {
    header: (
      <div className="flex w-[114px] gap-1">
        Borrow APY
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "borrow_apy",
  },
  {
    header: <div className="h-1 w-[150px]" />,
    accessor: "action",
  },
];
