import React from "react";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIcon,
  TokenIconList,
  Tooltip,
  ValidatorIcon,
  bribeApyTooltipText,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { type Address } from "viem";

import { VP } from "~/components/validator-selector";
import {
  type CuttingBoardWeight,
  useTokenHoneyPrices,
  type Validator,
  type UserValidator,
  Token,
} from "@bera/berajs";
import { CuttingBoardDisplay } from "~/app/validators/validators-table";
import {
  AggregatedBribe,
  useAggregatedBribes,
} from "~/hooks/useAggregatedBribes";

interface TotalValues {
  totalIncentives: number;
  amountPerProposal: number;
  tokenAmountPerProposal?: number;
}

export const BribeTooltipRow = ({
  token,
  totalValues,
}: {
  token: Token;
  totalValues: TotalValues;
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-row gap-1 text-md">
        <TokenIcon address={token.address} size="lg" symbol={token.symbol} />
        {token.symbol}
      </div>
      <div className="text-md flex flex-row gap-1">
        <FormattedNumber value={totalValues.totalIncentives} compact />
        {totalValues.amountPerProposal !== 0 && (
          <FormattedNumber
            value={totalValues.amountPerProposal}
            className="text-muted-foreground"
          />
        )}
      </div>
    </div>
  );
};
export const BribesTooltip = ({
  aggregatedBribes,
}: {
  aggregatedBribes: AggregatedBribe[];
}) => {
  const { data: tokenHoneyPrices } = useTokenHoneyPrices({
    tokenAddresses: aggregatedBribes.map(
      (ab: AggregatedBribe) => ab.token.address,
    ) as Address[],
  });
  const totalBribesValue: TotalValues = aggregatedBribes.reduce(
    (acc: TotalValues, ab) => {
      const tokenPrice = tokenHoneyPrices
        ? parseFloat(tokenHoneyPrices[ab.token.address] ?? 0) ?? 0
        : 0;
      return {
        totalIncentives:
          acc.totalIncentives +
          parseFloat(ab.bribeTotalAmountLeft) * tokenPrice,
        amountPerProposal:
          acc.amountPerProposal + parseFloat(ab.amountPerProposal) * tokenPrice,
      };
    },
    {
      totalIncentives: 0,
      amountPerProposal: 0,
    },
  );

  const others: TotalValues | undefined =
    aggregatedBribes.length > 3
      ? aggregatedBribes.reduce(
          (acc: TotalValues, ab) => {
            const tokenPrice = tokenHoneyPrices
              ? parseFloat(tokenHoneyPrices[ab.token.address] ?? 0) ?? 0
              : 0;
            return {
              totalIncentives:
                acc.totalIncentives +
                parseFloat(ab.bribeTotalAmountLeft) * tokenPrice,
              amountPerProposal:
                acc.amountPerProposal +
                parseFloat(ab.amountPerProposal) * tokenPrice,
            };
          },
          {
            totalIncentives: 0,
            amountPerProposal: 0,
          },
        )
      : undefined;

  return (
    <div className="w-[250px] p-1 flex flex-col gap-1">
      {aggregatedBribes.map((ab, i) => {
        if (i > 2) {
          return;
        }
        const tokenPrice = tokenHoneyPrices
          ? parseFloat(tokenHoneyPrices[ab.token.address] ?? 0)
          : 0;
        const bribeTotalValues: TotalValues = {
          totalIncentives: parseFloat(ab.bribeTotalAmountLeft) * tokenPrice,
          amountPerProposal: parseFloat(ab.amountPerProposal) * tokenPrice,
          tokenAmountPerProposal: parseFloat(ab.amountPerProposal),
        };
        return (
          <BribeTooltipRow token={ab.token} totalValues={bribeTotalValues} />
        );
      })}
      {others && (
        <BribeTooltipRow
          token={{
            address: "0x0",
            symbol: `Others (+${aggregatedBribes.length - 3})`,
            decimals: 18,
            name: "Others",
          }}
          totalValues={others}
        />
      )}
      <div className="w-full border-b h-1" />
      <div className="flex flex-row justify-between">
        <div className="text-md text-muted-foreground">Total</div>
        <div className="text-md">
          <FormattedNumber value={totalBribesValue.totalIncentives} compact />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="text-md text-muted-foreground">Amount Per Proposal</div>
        <div className="text-md">
          <FormattedNumber value={totalBribesValue.amountPerProposal} compact />
        </div>
      </div>
    </div>
  );
};

export const ValidatorBribesPopover = ({
  validator,
}: {
  validator: Validator;
}) => {
  const availableBribes: AggregatedBribe[] | undefined =
    useAggregatedBribes(validator);

  return (
    <Tooltip
      toolTipTrigger={
        <div className="rounded-lg border rounded-lg hover:bg-muted p-1 w-fit">
          <TokenIconList
            tokenList={availableBribes?.map((ab) => ab.token) ?? []}
            showCount={3}
            size={"lg"}
            className="w-fit"
          />
        </div>
      }
      children={<BribesTooltip aggregatedBribes={availableBribes ?? []} />}
    />
  );
};

const VALIDATOR_COLUMN: ColumnDef<UserValidator> = {
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
};

const GLOBAL_VOTING_POWER_COLUMN: ColumnDef<UserValidator> = {
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
};

const COMMISSION_COLUMN: ColumnDef<UserValidator> = {
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

const APY_COLUMN: ColumnDef<UserValidator> = {
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
};

const MOST_WEIGHTED_GAUGE_COLUMN: ColumnDef<UserValidator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Most Weighted Gauge" />
  ),
  cell: ({ row }) => {
    const cuttingBoards: CuttingBoardWeight[] = row.original.cuttingboard;

    const mostWeightedCuttingBoard = cuttingBoards.sort(
      (a, b) => a.percentage - b.percentage,
    )[0];
    console.log(mostWeightedCuttingBoard);
    return <CuttingBoardDisplay cuttingBoard={mostWeightedCuttingBoard} />;
  },
  accessorKey: "mostWeightedGauge",
  enableSorting: false,
};

const BRIBES_COLUMN: ColumnDef<UserValidator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Bribes" />
  ),
  cell: ({ row }) => {
    return <ValidatorBribesPopover validator={row.original} />;
  },
  accessorKey: "bribes",
  enableSorting: false,
};

const USER_STAKED_COLUMN: ColumnDef<UserValidator> = {
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="User Staked" />
  ),
  cell: ({ row }) => {
    <div className="flex h-full w-[91px] items-center">
      {" "}
      {row.original.userStaked}
    </div>;
  },
  accessorKey: "userStaked",
  enableSorting: true,
};

export const general_validator_columns: ColumnDef<UserValidator>[] = [
  VALIDATOR_COLUMN,
  GLOBAL_VOTING_POWER_COLUMN,
  COMMISSION_COLUMN,
  APY_COLUMN,
  MOST_WEIGHTED_GAUGE_COLUMN,
  BRIBES_COLUMN,
];

export const user_general_validator_columns: ColumnDef<UserValidator>[] = [
  VALIDATOR_COLUMN,
  USER_STAKED_COLUMN,
  GLOBAL_VOTING_POWER_COLUMN,
  COMMISSION_COLUMN,
  APY_COLUMN,
  BRIBES_COLUMN,
];
