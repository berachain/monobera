import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import { type Columns } from "~/components/react-table";

export const general_validator_columns: Columns = [
  {
    header: <div className="w-[49px]">Delegate</div>,
    accessor: "delegate",
  },
  {
    header: <div className="w-[137px] text-left">Validator</div>,
    accessor: "validator",
  },
  {
    header: (
      <div className="flex w-[96px] items-center gap-1">
        Voting Power{" "}
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "votingPower",
  },
  {
    header: (
      <div className="flex w-[91px] items-center gap-1">
        Commission{" "}
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "commission",
  },
  {
    header: (
      <div className="flex w-[67px] items-center gap-1">
        vAPY
        <Tooltip text="?" />
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "vAPY",
  },
  {
    header: (
      <div className="flex w-[141px] items-center gap-1">
        Most weighted gauge
        <Tooltip text="?" />
      </div>
    ),
    accessor: "mostWeightedGauge",
  },
  {
    header: (
      <div className="flex w-[136px] items-center gap-1">
        Bribes
        <Tooltip text="?" />
      </div>
    ),
    accessor: "bribes",
  },
];
