import React from "react";
import { Token, useTokenHoneyPrices } from "@bera/berajs";
import {
  FormattedNumber,
  TokenIcon,
  TokenIconList,
  Tooltip,
} from "@bera/shared-ui";
import { type Address } from "viem";

import {
  AggregatedBribe,
  useAggregatedBribes,
} from "~/hooks/useAggregatedBribes";

interface TotalValues {
  totalIncentives: number;
  amountPerProposal: number;
  tokenAmountPerProposal?: number;
}

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
      <div className="text-md flex flex-row gap-1">
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
    <div className="flex w-[250px] flex-col gap-1 p-1">
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
      <div className="h-1 w-full border-b" />
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

export const BribesPopover = ({
  bribes,
}: {
  bribes: AggregatedBribe[] | undefined;
}) => {
  return (
    <>
      {!bribes || bribes?.length === 0 ? (
        <div className="w-fit rounded-lg border px-2 py-1 text-xs hover:bg-muted">
          No Incentives
        </div>
      ) : (
        <Tooltip
          toolTipTrigger={
            <div className="w-fit rounded-lg border px-2 py-1 hover:bg-muted">
              <TokenIconList
                tokenList={bribes?.map((ab) => ab.token) ?? []}
                showCount={3}
                size={"lg"}
                className="w-fit"
              />
            </div>
          }
          children={<BribesTooltip aggregatedBribes={bribes ?? []} />}
        />
      )}
    </>
  );
};
