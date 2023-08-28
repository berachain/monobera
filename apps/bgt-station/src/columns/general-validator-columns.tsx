import React from "react";
import { BeravaloperToEth, type PoLValidator } from "@bera/berajs";
import { DataTableColumnHeader, TokenIconList } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

import { formatCommission } from "~/utils/formatCommission";
import { VP } from "~/components/validator-selector";
import { ValidatorGauge } from "~/app/validators/validators-table";

export const general_validator_columns: ColumnDef<PoLValidator>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
    cell: ({ row }) => {
      const rank = row.original.rank;
      return <div className="flex h-full w-[91px] items-center">{rank}</div>;
    },
    accessorKey: "delegate",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      const moniker = row.original.description.moniker;

      return <>{moniker}</>;
    },
    accessorKey: "description",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Voting Power" />
    ),
    cell: ({ row }) => {
      const operatorAddress = row.original.operatorAddress;
      const tokens = row.original.tokens;
      return <VP operatorAddress={operatorAddress} tokens={tokens} />;
    },
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
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="vApy" />
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
    cell: ({ row }) => (
      <ValidatorGauge
        address={BeravaloperToEth(row.original.operatorAddress)}
      />
    ),
    accessorKey: "mostWeightedGauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribes" />
    ),
    cell: ({ row }) => {
      const tokens = row.original.bribeTokenList;
      return <TokenIconList tokenList={tokens ?? []} size={24} showCount={3} />;
    },
    accessorKey: "bribes",
    enableSorting: false,
  },
];
