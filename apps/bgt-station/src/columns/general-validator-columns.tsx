import React from "react";
import {
  type CuttingBoardWeight,
  type UserValidator,
  type Validator,
} from "@bera/berajs";
import {
  DataTableColumnHeader,
  FormattedNumber,
  ValidatorIcon,
  bribeApyTooltipText,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type Address } from "viem";

import { ValidatorBribesPopover } from "~/components/bribes-tooltip";
import { CuttingBoardDisplay } from "~/app/validators/components/validators-table";

const VALIDATOR_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Validator" />
  ),
  cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <ValidatorIcon address={row.original.id as Address} className="h-8 w-8" />
      {row.original.metadata.name}{" "}
    </div>
  ),
  accessorKey: "description",
  enableSorting: true,
};

const GLOBAL_VOTING_POWER_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Voting Power" />
  ),
  cell: ({ row }) => (
    <div className="flex h-full w-full flex-shrink-0 items-center">
      {row.original.amountStaked}
    </div>
  ),
  accessorKey: "amountStaked",
};

const COMMISSION_COLUMN: ColumnDef<Validator> = {
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
};

const APY_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="vApy"
      tooltip={bribeApyTooltipText()}
    />
  ),
  cell: ({ row }) => (
    <div className="flex h-full w-[91px] items-center">
      {Number(0).toFixed(2)}%
    </div>
  ),
  accessorKey: "vApy",
  enableSorting: true,
};

const MOST_WEIGHTED_GAUGE_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Most Weighted Gauge" />
  ),
  cell: ({ row }) => {
    const cuttingBoards: CuttingBoardWeight[] = row.original.cuttingboard ?? [];
    const mostWeightedCuttingBoard = cuttingBoards.sort(
      (a, b) => a.percentage - b.percentage,
    )[0];
    return <CuttingBoardDisplay cuttingBoard={mostWeightedCuttingBoard} />;
  },
  accessorKey: "mostWeightedGauge",
  enableSorting: false,
};

const BRIBES_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Incentives" />
  ),
  cell: ({ row }) => {
    return <ValidatorBribesPopover validatorAddress={row.original.id} />;
  },
  accessorKey: "bribes",
  enableSorting: false,
};

const USER_STAKED_COLUMN: ColumnDef<UserValidator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="User Staked" />
  ),
  cell: ({ row }) => {
    return <FormattedNumber value={Math.random() * 1000000} symbol="BGT" />;
  },
  accessorKey: "userStaked",
  enableSorting: true,
};

export const general_validator_columns: ColumnDef<Validator>[] = [
  VALIDATOR_COLUMN,
  GLOBAL_VOTING_POWER_COLUMN,
  COMMISSION_COLUMN,
  APY_COLUMN,
  MOST_WEIGHTED_GAUGE_COLUMN,
  BRIBES_COLUMN,
];

export const user_general_validator_columns: ColumnDef<UserValidator>[] = [
  VALIDATOR_COLUMN as ColumnDef<UserValidator>,
  USER_STAKED_COLUMN,
  GLOBAL_VOTING_POWER_COLUMN as ColumnDef<UserValidator>,
  COMMISSION_COLUMN as ColumnDef<UserValidator>,
  APY_COLUMN as ColumnDef<UserValidator>,
  BRIBES_COLUMN as ColumnDef<UserValidator>,
];
