import React from "react";
import { type PoLValidator } from "@bera/berajs";
import {
  DataTableColumnHeader,
  TokenIconList,
  ValidatorIcon,
  bribeApyTooltipText,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type Address } from "wagmi";

import { formatCommission } from "~/utils/formatCommission";
import { VP } from "~/components/validator-selector";
import { ValidatorGauge } from "~/app/validators/validators-table";

export const general_validator_columns: ColumnDef<PoLValidator>[] = [
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
      const moniker = row.original.description.moniker;

      return (
        <div className="flex items-center gap-2">
          <ValidatorIcon
            address={row.original.operatorAddr as Address}
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
        operatorAddr={row.original.operatorAddr}
        tokens={row.original.tokens}
      />
    ),
    accessorKey: "tokens",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Commission" />
    ),
    cell: ({ row }) => {
      const commission = row.original.commission.commissionRates.rate;
      return (
        <div className="flex h-full w-[91px] items-center">
          {" "}
          {formatCommission(commission)}%
        </div>
      );
    },
    accessorKey: "commission",
    enableSorting: true,
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.commission.commissionRates.rate ?? 0;
      const b = rowB.original.commission.commissionRates.rate ?? 0;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
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
        {Number(row.original.vApy ?? 0).toFixed(2)}%
      </div>
    ),
    accessorKey: "vApy",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Most Weighted Gauge" />
    ),
    cell: ({ row }) => <ValidatorGauge address={row.original.operatorAddr} />,
    accessorKey: "mostWeightedGauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribes" />
    ),
    cell: ({ row }) => {
      const tokens = row.original.bribeTokenList;
      return tokens.length !== 0 ? (
        <TokenIconList tokenList={tokens ?? []} size="lg" showCount={3} />
      ) : (
        <p>no bribes</p>
      );
    },
    accessorKey: "bribes",
    enableSorting: false,
  },
];
