import React from "react";
import {
  Gauge,
  truncateHash,
  useTokenHoneyPrice,
  type CuttingBoardWeight,
  type UserValidator,
  type Validator,
} from "@bera/berajs";
import { beraTokenAddress } from "@bera/config";
import {
  DataTableColumnHeader,
  FormattedNumber,
  Tooltip,
  ValidatorIcon,
  bribeApyTooltipText,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { type Address } from "viem";

import { BribesPopover } from "~/components/bribes-tooltip";
import { CuttingBoardDisplay } from "~/app/validators/components/validators-table";
import { useValidatorEstimatedBgtPerYear } from "~/hooks/useValidatorEstimatedBgtPerYear";

const VALIDATOR_COLUMN: ColumnDef<Validator> = {
  header: "Validator",
  cell: ({ row }) => (
    <div className="flex items-center gap-1 overflow-hidden truncate">
      <ValidatorIcon
        address={row.original.id as Address}
        className="h-8 w-8 flex-shrink-0"
        imgOverride={row.original.metadata?.logoURI}
      />
      <span className="flex-grow truncate">
        {row.original.metadata?.name ?? truncateHash(row.original.id)}
      </span>
    </div>
  ),
  minSize: 200,
  accessorKey: "name",
  enableSorting: false,
};

const GLOBAL_VOTING_POWER_COLUMN: ColumnDef<Validator> = {
  header: "BGT Delegated",
  cell: ({ row }) => (
    <div className="w-full text-start">
      <FormattedNumber
        value={row.original.amountStaked}
        compact={false}
        symbol="BGT"
      />
    </div>
  ),
  minSize: 200,
  accessorKey: "votingpower",
  enableSorting: true,
};

const COMMISSION_COLUMN: ColumnDef<Validator> = {
  header: "Commission",
  cell: ({ row }) => {
    return (
      <FormattedNumber
        value={row.original.commission ?? 0}
        showIsSmallerThanMin
        percent
      />
    );
  },
  accessorKey: "commission",
  enableSorting: true,
};

const APY_COLUMN: ColumnDef<Validator> = {
  header: "vAPY",
  cell: ({ row }) => (
    <div className="flex h-full w-[91px] items-center">
      <FormattedNumber value={row.original.apy / 10000} percent />
    </div>
  ),
  minSize: 150,
  meta: {
    tooltip: bribeApyTooltipText(),
    headerClassname: "flex-initial",
  },
  accessorKey: "apy",
  enableSorting: true,
};

const MOST_WEIGHTED_GAUGE_COLUMN: ColumnDef<Validator> = {
  header: "Most Weighted Vault",
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
  header: "Incentives",
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
    <DataTableColumnHeader
      column={column}
      title="User Staked"
      className="whitespace-nowrap"
    />
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
  sortingFn: (a, b) =>
    Number(a.original.userStaked) - Number(b.original.userStaked),
  enableSorting: false,
};

const USER_QUEUED_COLUMN: ColumnDef<UserValidator> = {
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="User Queued"
      className="whitespace-nowrap"
    />
  ),
  cell: ({ row }) => {
    return <FormattedNumber value={row.original.userQueued} symbol="BGT" />;
  },
  accessorKey: "userQueued",
  sortingFn: (a, b) =>
    Number(a.original.userQueued) - Number(b.original.userQueued),
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
        <FormattedNumber
          value={row.original.rewardRate}
          compact
          showIsSmallerThanMin
          symbol="BGT"
        />
        <span className="text-xs text-muted-foreground">
          <FormattedNumber
            value={
              parseFloat(row.original.rewardRate) * parseFloat(price ?? "0")
            }
            showIsSmallerThanMin
            symbol="USD"
          />
        </span>
      </div>
    );
  },
  accessorKey: "rewardRate",
  enableSorting: true,
};

const ESTIMATED_YEARLY_BGT_GAUGE: ColumnDef<Validator> = {
  header: ({ column }) => (
    <DataTableColumnHeader
      column={column}
      title="Estimated BGT/yr"
      tooltip={
        "amount of BGT this validator is directing to this vault each proposal"
      }
    />
  ),
  cell: ({ row }) => {
    const { data: price } = useTokenHoneyPrice({
      tokenAddress: beraTokenAddress,
    });

    const estimatedYearlyBgt = useValidatorEstimatedBgtPerYear(row.original);
    return (
      <div className="flex flex-col gap-1">
        <FormattedNumber
          value={estimatedYearlyBgt}
          compact
          showIsSmallerThanMin
          symbol="BGT"
        />
        <span className="text-xs text-muted-foreground">
          <FormattedNumber
            value={estimatedYearlyBgt * parseFloat(price ?? "0")}
            showIsSmallerThanMin
            symbol="USD"
          />
        </span>
      </div>
    );
  },
  accessorKey: "yearlyBgt",
  enableSorting: false,
};

export const getGaugeValidatorColumns = (gauge: Gauge) => {
  const gauge_validator_columns: ColumnDef<Validator>[] = [
    VALIDATOR_COLUMN,
    {
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

        const cuttingBoard = row.original.cuttingBoard.weights.find(
          (cb: any) => cb.receiver.toLowerCase() === gauge.id.toLowerCase(),
        );
        if (!cuttingBoard)
          return (
            <FormattedNumber
              className="w-full justify-start"
              symbol="BGT"
              compact={false}
              compactThreshold={999_999_999}
              value={0}
            />
          );
        const weight =
          parseFloat(cuttingBoard?.percentageNumerator) / 10000 ?? 0;
        const perProposal = weight * parseFloat(row.original.rewardRate);
        return (
          <div className="flex flex-col gap-1">
            <FormattedNumber
              value={perProposal}
              compact
              showIsSmallerThanMin
              symbol="BGT"
            />
            <span className="text-xs text-muted-foreground">
              <FormattedNumber
                value={perProposal * parseFloat(price ?? "0")}
                showIsSmallerThanMin
                symbol="USD"
              />
            </span>
          </div>
        );
      },
      accessorKey: "rewardRate",
      enableSorting: true,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Estimated BGT/yr"
          tooltip={
            "amount of BGT this validator is directing to this vault each proposal"
          }
        />
      ),
      cell: ({ row }) => {
        const { data: price } = useTokenHoneyPrice({
          tokenAddress: beraTokenAddress,
        });

        const cuttingBoard = row.original.cuttingBoard.weights.find(
          (cb: any) => cb.receiver.toLowerCase() === gauge.id.toLowerCase(),
        );
        if (!cuttingBoard)
          return (
            <FormattedNumber
              className="w-full justify-start"
              symbol="BGT"
              compact={false}
              compactThreshold={999_999_999}
              value={0}
            />
          );
        const estimatedYearlyBgt = useValidatorEstimatedBgtPerYear(
          row.original,
        );
        const weight =
          parseFloat(cuttingBoard?.percentageNumerator) / 10000 ?? 0;

        const estimatedAmountDirected = weight * estimatedYearlyBgt;
        return (
          <div className="flex flex-col gap-1">
            <FormattedNumber
              value={estimatedAmountDirected}
              compact
              showIsSmallerThanMin
              symbol="BGT"
            />
            <span className="text-xs text-muted-foreground">
              <FormattedNumber
                value={estimatedAmountDirected * parseFloat(price ?? "0")}
                showIsSmallerThanMin
                symbol="USD"
              />
            </span>
          </div>
        );
      },
      accessorKey: "yearlyBgt",
      enableSorting: false,
    },
  ];

  return gauge_validator_columns;
};

export const generalValidatorColumns: ColumnDef<Validator>[] = [
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
  {
    ...GLOBAL_VOTING_POWER_COLUMN,
    enableSorting: true,
  } as ColumnDef<UserValidator>,
  { ...COMMISSION_COLUMN, enableSorting: true } as ColumnDef<UserValidator>,
  { ...APY_COLUMN, enableSorting: true } as ColumnDef<UserValidator>,
  BRIBES_COLUMN as ColumnDef<UserValidator>,
];

export const user_incentives_columns: ColumnDef<UserValidator>[] = [
  VALIDATOR_COLUMN as ColumnDef<UserValidator>,
  USER_STAKED_COLUMN as ColumnDef<UserValidator>,
  APY_COLUMN as ColumnDef<UserValidator>,
  CLAIMABLE_BRIBES_COLUMN as ColumnDef<UserValidator>,
];
