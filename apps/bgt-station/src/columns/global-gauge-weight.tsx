import React from "react";
import { Icons } from "@bera/ui/icons";

import { type Columns } from "~/components/react-table";

export const global_gauge_weight_columns: Columns = [
  {
    header: <div className="w-[129px] text-left">Pool or Address</div>,
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
