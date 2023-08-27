import React from "react";
import { BeravaloperToEth, type PoLValidator } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
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
    cell: ({ row }) => {
      const vApy = row.original.vApy;
      return (
        <div className="flex h-full w-[91px] items-center">
          {" "}
          {Number(vApy).toFixed(2)}%
        </div>
      );
    },
    accessorKey: "vApy",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Most Weighted Gauge" />
    ),
    cell: ({ row }) => {
      const operatorAddress = row.original.operatorAddress;
      console.log(operatorAddress);
      return <ValidatorGauge address={BeravaloperToEth(operatorAddress)} />;
    },
    accessorKey: "mostWeightedGauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribes" />
    ),
    cell: ({ row }) => {
      const tokens = row.original.bribeTokenList;
      return <>{tokens}</>;
    },
    accessorKey: "bribes",
    enableSorting: false,
  },
];
