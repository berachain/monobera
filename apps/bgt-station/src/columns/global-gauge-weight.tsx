import React from "react";
import { type Columns } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export const global_gauge_weight_columns: Columns = [
  {
    header: <div className="w-[150px] text-left">Pool or Address</div>,
    accessor: "poolOrAddress",
  },
  {
    header: (
      <div className="flex w-[100px] gap-1">
        BGT Incentive
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "bgtIncentive",
  },
  {
    header: (
      <div className="flex w-[53px] gap-1">
        TVL{" "}
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "tvl",
  },
  {
    header: <div className=" w-[27px]">Hide</div>,
    accessor: "hide",
  },
];

export const unbonding_queue_columns: Columns = [
  {
    header: <div className="w-[150px] text-left">Pool or Address</div>,
    accessor: "validator",
  },
  {
    header: <div className="flex w-[100px] gap-1">BGT Unbonding</div>,
    accessor: "unbondingAmount",
  },
  {
    header: <div className="flex w-[120px] gap-1">Time Remaining</div>,
    accessor: "timeRemaining",
  },
  {
    header: (
      <div className=" flex w-[27px] items-center text-center">Cancel</div>
    ),
    accessor: "hide",
  },
];
