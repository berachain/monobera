import React from "react";
import { ActiveIncentive, Token, useTokenHoneyPrices } from "@bera/berajs";
import {
  FormattedNumber,
  TokenIcon,
  TokenIconList,
  Tooltip,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type Address } from "viem";

import { AggregatedBribe } from "~/hooks/useAggregatedBribes";

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
  aggregatedBribes: ActiveIncentive[];
}) => {
  const { data: tokenHoneyPrices } = useTokenHoneyPrices({
    tokenAddresses: aggregatedBribes.map(
      (ab: ActiveIncentive) => ab.token.address,
    ) as Address[],
  });
  const totalBribesValue: TotalValues = aggregatedBribes.reduce(
    (acc: TotalValues, ab: ActiveIncentive) => {
      const tokenPrice = parseFloat(
        tokenHoneyPrices?.[ab.token.address] ?? "0",
      );
      return {
        totalIncentives: acc.totalIncentives + ab.amountLeft * tokenPrice,
        amountPerProposal:
          acc.amountPerProposal + ab.incentiveRate * tokenPrice,
      };
    },
    {
      totalIncentives: 0,
      amountPerProposal: 0,
    },
  );

  const others: TotalValues | undefined =
    aggregatedBribes.length > 5
      ? aggregatedBribes.reduce(
          (acc: TotalValues, ab: ActiveIncentive) => {
            const tokenPrice = parseFloat(
              tokenHoneyPrices?.[ab.token.address] ?? "0",
            );
            return {
              totalIncentives: acc.totalIncentives + ab.amountLeft * tokenPrice,
              amountPerProposal:
                acc.amountPerProposal + ab.incentiveRate * tokenPrice,
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
      {aggregatedBribes.map((ab: ActiveIncentive, i: number) => {
        if (i > 4) {
          return;
        }
        const tokenPrice = parseFloat(
          tokenHoneyPrices?.[ab.token.address] ?? "0",
        );
        const bribeTotalValues: TotalValues = {
          totalIncentives: ab.amountLeft * tokenPrice,
          amountPerProposal: ab.incentiveRate * tokenPrice,
          tokenAmountPerProposal: ab.incentiveRate,
        };
        return (
          <BribeTooltipRow token={ab.token} totalValues={bribeTotalValues} />
        );
      })}
      {others && (
        <BribeTooltipRow
          token={{
            address: "0x0",
            symbol: `Others (+${aggregatedBribes.length - 5})`,
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

export const ClaimBribesPopover = ({
  bribes,
  coinbase,
}: {
  bribes: AggregatedBribe[] | undefined;
  coinbase: Address;
}) => {
  return (
    <>
      {!bribes || bribes?.length === 0 ? (
        <div className="w-fit rounded-lg border px-2 py-1 text-xs hover:bg-muted">
          No Incentives
        </div>
      ) : (
        <div className="flex flex-row items-center gap-1">
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
            children={<BribesTooltip aggregatedBribes={[]} />}
          />
          <Button disabled>Claim</Button>
        </div>
      )}
    </>
  );
};

export const BribesPopover = ({
  incentives,
}: {
  incentives: ActiveIncentive[];
}) => {
  return (
    <>
      {!incentives || incentives?.length === 0 ? (
        <div className="w-fit rounded-lg border px-2 py-1 text-xs hover:bg-muted">
          No Incentives
        </div>
      ) : (
        <Tooltip
          toolTipTrigger={
            <div className="w-fit rounded-lg border p-1 hover:bg-muted">
              <TokenIconList
                tokenList={
                  incentives?.map((incentive) => incentive.token) ?? []
                }
                showCount={3}
                size={"lg"}
                className="w-fit"
              />
            </div>
          }
          children={<BribesTooltip aggregatedBribes={incentives ?? []} />}
        />
      )}
    </>
  );
};
