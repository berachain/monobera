import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import { type Columns } from "~/components/react-table";

export const validator_table_columns: Columns = [
  {
    header: <div className="w-[137px] text-left">Validator</div>,
    accessor: "validator",
  },
  {
    header: (
      <div className="flex w-24 items-center gap-1">
        Voting power
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "vp",
  },
  {
    header: (
      <div className="flex w-[91px] items-center gap-1">
        Commission
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "commission",
  },
  {
    header: (
      <div className="flex w-[67px] items-center gap-1">
        vAPY
        <Tooltip text="vAPY" />
        <Icons.arrowUpDown className="relative h-4 w-4 text-muted-foreground hover:cursor-pointer" />
      </div>
    ),
    accessor: "vapy",
  },
  {
    header: (
      <div className="flex w-[141px] items-center gap-1">
        Most weighted gauge
        <Tooltip text="vAPY" />
      </div>
    ),
    accessor: "mwg",
  },
  {
    header: (
      <div className="flex w-[136px] items-center justify-center gap-1">
        Bribes
        <Tooltip text="vAPY" />
      </div>
    ),
    accessor: "bribes",
  },
];
