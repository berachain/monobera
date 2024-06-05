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

import { BribesPopover, ClaimBribesPopover } from "~/components/bribes-tooltip";
import { CuttingBoardDisplay } from "~/app/validators/components/validators-table";
import {
  AggregatedBribe,
  useAggregatedBribes,
} from "~/hooks/useAggregatedBribes";

const VALIDATOR_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Validator" />
  ),
  cell: ({ row }) => (
    <div className="flex items-center gap-1">
      <ValidatorIcon address={row.original.id as Address} className="h-8 w-8" />
      {row.original.metadata.name}{" "}
    </div>
  ),
  accessorKey: "name",
  enableSorting: false,
};

const GLOBAL_VOTING_POWER_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Voting Power" />
  ),
  cell: ({ row }) => (
    <div className="w-full text-center">
      <FormattedNumber
        value={row.original.amountStaked}
        compact={false}
        symbol="BGT"
      />
    </div>
  ),
  accessorKey: "amountStaked",
  enableSorting: false,
};

const COMMISSION_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Commission" />
  ),
  cell: ({ row }) => {
    return <div className="text-center"> {row.original.commission ?? 0}%</div>;
  },
  accessorKey: "commission",
  enableSorting: false,
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
      <FormattedNumber value={row.original.rewardRate} percent />
    </div>
  ),
  accessorKey: "vApy",
  enableSorting: false,
};

const MOST_WEIGHTED_GAUGE_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Most Weighted Gauge" />
  ),
  cell: ({ row }) => {
    const cuttingBoards: CuttingBoardWeight[] =
      row.original.cuttingBoard.weights ?? [];
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
    const availableBribes: AggregatedBribe[] | undefined = useAggregatedBribes(
      row.original.id,
    );
    return <BribesPopover incentives={[]} />;
  },
  accessorKey: "bribes",
  enableSorting: false,
};

const CLAIMABLE_BRIBES_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Incentives" />
  ),
  cell: ({ row }) => {
    const availableBribes: AggregatedBribe[] | undefined = useAggregatedBribes(
      row.original.id,
    );
    return (
      <ClaimBribesPopover
        coinbase={row.original.coinbase}
        bribes={availableBribes}
      />
    );
  },
  accessorKey: "bribes",
  enableSorting: false,
};

const USER_STAKED_COLUMN: ColumnDef<UserValidator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="User Staked" />
  ),
  cell: ({ row }) => {
    return (
      <FormattedNumber
        showIsSmallerThanMin
        value={row.original.userStaked}
        symbol="BGT"
      />
    );
  },
  accessorKey: "userStaked",
  enableSorting: false,
};

const USER_QUEUED_COLUMN: ColumnDef<UserValidator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="User Queued" />
  ),
  cell: ({ row }) => {
    return <FormattedNumber value={row.original.userQueued} symbol="BGT" />;
  },
  accessorKey: "userQueued",
  enableSorting: false,
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
  USER_QUEUED_COLUMN,
  GLOBAL_VOTING_POWER_COLUMN as ColumnDef<UserValidator>,
  COMMISSION_COLUMN as ColumnDef<UserValidator>,
  APY_COLUMN as ColumnDef<UserValidator>,
  BRIBES_COLUMN as ColumnDef<UserValidator>,
];

export const user_incentives_columns: ColumnDef<UserValidator>[] = [
  VALIDATOR_COLUMN as ColumnDef<UserValidator>,
  USER_STAKED_COLUMN as ColumnDef<UserValidator>,
  APY_COLUMN as ColumnDef<UserValidator>,
  CLAIMABLE_BRIBES_COLUMN as ColumnDef<UserValidator>,
];
