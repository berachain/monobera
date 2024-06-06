import React from "react";
import {
  useTokenHoneyPrice,
  type CuttingBoardWeight,
  type UserValidator,
  type Validator,
} from "@bera/berajs";
import {
  DataTableColumnHeader,
  FormattedNumber,
  Tooltip,
  ValidatorIcon,
  bribeApyTooltipText,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type Address } from "viem";

import { BribesPopover, ClaimBribesPopover } from "~/components/bribes-tooltip";
import { CuttingBoardDisplay } from "~/app/validators/components/validators-table";
import { beraTokenAddress } from "@bera/config";
import { Button } from "@bera/ui/button";

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
    <div className="w-full text-start">
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
      <FormattedNumber value={row.original.apy} percent />
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
      (a, b) => Number(a.percentageNumerator) - Number(b.percentageNumerator),
    )[0];
    return <CuttingBoardDisplay cuttingBoard={mostWeightedCuttingBoard} />;
  },
  accessorKey: "mostWeightedGauge",
  enableSorting: false,
};

const BRIBES_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="Incentives"
      className="w-[160px]"
    />
  ),
  cell: ({ row }) => {
    return <BribesPopover incentives={row.original.activeIncentives} />;
  },
  accessorKey: "bribes",
  enableSorting: false,
};

const CLAIMABLE_BRIBES_COLUMN: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Incentives" />
  ),
  cell: ({ row }) => {
    // return <ClaimBribesPopover coinbase={row.original.coinbase} bribes={row.original.activeIncentives} />;
    return (
      <div className="flex flex-row items-center gap-1">
        <BribesPopover incentives={row.original.activeIncentives} />
        <Tooltip
          text={"Claiming coming soon"}
          toolTipTrigger={
            <Button disabled size="sm">
              Claim
            </Button>
          }
        />
      </div>
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

const ESTIMATED_BGT_GAUGE: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="BGT Per Proposal"
      tooltip={
        "amount of BGT this validator is directing to this vault each proposal"
      }
    />
  ),
  cell: ({ row }) => {
    const { data: price } = useTokenHoneyPrice({
      tokenAddress: beraTokenAddress,
    });
    return (
      <div className="flex flex-col gap-1">
        <FormattedNumber value={0} symbol="BGT" />
        <span className="text-xs text-muted-foreground">
          <FormattedNumber value={price ?? 0} symbol="USD" />
        </span>
      </div>
    );
  },
  accessorKey: "userQueued",
  enableSorting: false,
};

export const gauge_validator_columns: ColumnDef<Validator>[] = [
  VALIDATOR_COLUMN,
  ESTIMATED_BGT_GAUGE,
];

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
