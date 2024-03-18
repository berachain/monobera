import React from "react";
import {
  DataTableColumnHeader,
  ValidatorIcon,
  bribeApyTooltipText,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { ValidatorVotingPower } from "~/components/validator-selector";
import { ValidatorV2 } from "@bera/proto/src";

export const general_validator_columns: ColumnDef<ValidatorV2>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      const moniker = row.original.name;

      return (
        <div className="flex items-center gap-2">
          <ValidatorIcon
            validatorIndex={row.original.index.toNumber()}
            description={row.original.description}
            className="h-8 w-8"
          />
          {moniker}{" "}
        </div>
      );
    },
    accessorKey: "name",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Voting Power" />
    ),
    cell: ({ row }) => <ValidatorVotingPower validator={row.original} />,
    accessorKey: "votingPower",
    enableSorting: true,
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
        {Number(0).toFixed(2)}%
      </div>
    ),
    accessorKey: "vApy",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Most Weighted Gauge" />
    ),
    cell: () => <></>,
    accessorKey: "mostWeightedGauge",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bribes" />
    ),
    cell: () => <></>,
    accessorKey: "bribes",
    enableSorting: false,
  },
];
