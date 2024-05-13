import React from "react";
import {
  DataTableColumnHeader,
  TokenIconList,
  ValidatorIcon,
  bribeApyTooltipText,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type Address } from "viem";

import { formatCommission } from "~/utils/formatCommission";
import { VP } from "~/components/validator-selector";
import { ValidatorGauge } from "~/app/validators/validators-table";
import { type Validator } from "@bera/berajs";

export const general_validator_columns: ColumnDef<Validator>[] = [
  // {
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Rank" />
  //   ),
  //   cell: ({ row }) => {
  //     const rank = row.original.rank;
  //     return (
  //       <div className="flex h-full items-center justify-center">{rank}</div>
  //     );
  //   },
  //   accessorKey: "delegate",
  //   enableSorting: false,
  // },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      const moniker = row.original.name;

      return (
        <div className="flex items-center gap-2">
          <ValidatorIcon
            address={row.original.coinbase as Address}
            className="h-8 w-8"
          />
          {moniker}{" "}
        </div>
      );
    },
    accessorKey: "description",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Voting Power" />
    ),
    cell: ({ row }) => (
      <VP
        coinbase={row.original.coinbase}
        amountStaked={row.original.amountStaked}
      />
    ),
    accessorKey: "amountStaked",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => {
      const commission = row.original.commission;
      return (
        <div className="flex h-full w-[91px] items-center"> {commission}%</div>
      );
    },
    accessorKey: "commission",
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="vApy"
        tooltip={bribeApyTooltipText()}
      />
    ),
    cell: ({ row }) => (
      <div className="flex h-full w-[91px] items-center">
        {" "}
        {Number(row.original.apy ?? 0).toFixed(2)}%
      </div>
    ),
    accessorKey: "vApy",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Most Weighted Gauge" />
    ),
    cell: ({ row }) => <ValidatorGauge address={row.original.coinbase} />,
    accessorKey: "mostWeightedGauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribes" />
    ),
    cell: ({ row }) => {
      const tokens = [];
      return tokens.length !== 0 ? (
        <TokenIconList tokenList={[]} size="lg" showCount={3} />
      ) : (
        <p>no bribes</p>
      );
    },
    accessorKey: "bribes",
    enableSorting: false,
  },
];
