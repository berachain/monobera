import React from "react";
import { type Columns } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export const recent_votes_columns: Columns = [
  {
    header: <div className="w-[350px]">Proposal</div>,
    accessor: "proposal",
  },
  {
    header: (
      <div className="flex w-[88px] gap-1">
        Address
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "address",
  },
  {
    header: (
      <div className="flex w-[60px] gap-1">
        Stance{" "}
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "stance",
  },
  {
    header: (
      <div className="flex w-[126px] gap-1">
        Time submitted{" "}
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "time",
  },
];

export const delegators_columns: Columns = [
  {
    header: <div className="w-[145px]">Delegator address</div>,
    accessor: "delegator_address",
  },
  {
    header: (
      <div className="flex w-[88px] gap-1">
        BGT amount
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "bgt_amount",
  },
  {
    header: (
      <div className="flex w-[110px] gap-1">
        Delegated Since{" "}
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "delegated_since",
  },
];
