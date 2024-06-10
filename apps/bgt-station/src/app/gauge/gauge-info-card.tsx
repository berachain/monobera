import React from "react";
import {
  truncateHash,
  usePollGlobalData,
  type ActiveIncentive,
  type Validator,
} from "@bera/berajs";
import {
  FormattedNumber,
  GaugeIcon,
  TokenIcon,
  ValidatorIcon,
} from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { getValidatorEstimatedBgtPerYear } from "~/hooks/useValidatorEstimatedBgtPerYear";

export default function GaugeInfoCard() {
  const { data: globalData, isLoading } = usePollGlobalData();
  return (
    <Card className="flex w-full flex-col overflow-hidden rounded-lg">
      <div className="grid grid-cols-1 bg-muted sm:grid-cols-[auto_auto_auto]">
        <div className="flex flex-col justify-center border-b border-border p-4">
          <div className="text-xs leading-5 text-muted-foreground">
            Active Gauges Vaults
          </div>
          {!isLoading ? (
            <div className="inline-flex h-7 items-end gap-1">
              <span className="text-2xl font-semibold leading-6">
                {globalData?.vaultCount}
              </span>
            </div>
          ) : (
            <Skeleton className="h-7 w-[125px] " />
          )}
          {!isLoading && globalData ? (
            <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
              {globalData?.top3Vaults?.vaults?.map(
                (gauge: any, index: number) => (
                  <GaugeIcon
                    key={index + gauge.id}
                    address={gauge.id}
                    size="md"
                    overrideImage={gauge.metadata?.logoURI}
                  />
                ),
              )}
              {globalData.vaultCount > 3 && (
                <span className="text-sm leading-5 text-muted-foreground">
                  {" "}
                  +{globalData.vaultCount - 3}
                </span>
              )}
            </div>
          ) : (
            <Skeleton className="mt-1 h-6 w-[75px]" />
          )}
        </div>
        <div className="flex flex-col justify-center gap-1 border-x border-b border-border p-4">
          <div className="text-xs leading-5 text-muted-foreground">
            Top 3 Validators
          </div>
          {!isLoading && globalData ? (
            globalData.top3EmittingValidators?.validators?.map(
              (
                validator: { stakedVotingPower: number; validator: Validator },
                index: number,
              ) => (
                <div
                  className="flex h-7 w-fit flex-nowrap items-center gap-2 rounded-full border border-border bg-background px-2"
                  key={`${index}-${validator.validator.id}`}
                >
                  <ValidatorIcon
                    address={validator.validator.id}
                    size={"md"}
                    imgOverride={validator.validator.metadata?.logoURI}
                  />
                  <span
                    className="cursor-pointer text-nowrap text-xs font-medium hover:underline"
                    onClick={() =>
                      window.open(
                        `/validators/${validator.validator.id}`,
                        "_self",
                      )
                    }
                  >
                    {validator.validator?.metadata?.name ??
                      truncateHash(validator.validator.id)}
                  </span>
                  <span className="text-nowrap text-[10px] text-muted-foreground">
                    BGT/Year:{" "}
                    <FormattedNumber
                      value={getValidatorEstimatedBgtPerYear(
                        validator.validator,
                        globalData.validatorCount,
                      )}
                      showIsSmallerThanMin
                    />
                  </span>
                </div>
              ),
            )
          ) : (
            <>
              <Skeleton className="h-4 w-[150px] rounded-full" />
              <Skeleton className="h-4 w-[150px] rounded-full" />
              <Skeleton className="h-4 w-[150px] rounded-full" />
            </>
          )}
        </div>

        <div className="flex flex-col justify-center border-b border-border p-4">
          <div className="text-xs leading-5 text-muted-foreground">
            Est. Yearly BGT Distribution
          </div>
          {isLoading ? (
            <Skeleton className="mt-2 h-8 w-[150px] rounded-full" />
          ) : (
            <div className="mt-2 flex h-8 w-fit items-center gap-2 rounded-full bg-success-foreground bg-opacity-10 px-2 text-success-foreground">
              <Icons.bgt className="h-6 w-6" />
              <b>
                <FormattedNumber
                  value={globalData?.bgtInfo?.blockCountPerYear ?? 0}
                />{" "}
                Yearly
              </b>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center border-b border-border p-5">
          <div className="text-xs leading-5 text-muted-foreground">
            Active Incentives
          </div>
          {!isLoading && globalData ? (
            <div className="flex items-center gap-2 text-xl font-bold leading-5">
              <FormattedNumber
                value={globalData.sumAllIncentivesInHoney}
                symbol="USD"
              />
            </div>
          ) : (
            <Skeleton className="h-6 w-[100px]" />
          )}
          {!isLoading && globalData ? (
            <div className="mt-1 flex w-fit items-center gap-1 rounded-full border border-border bg-background px-2 py-1 whitespace-nowrap">
              {globalData.top3Incentives?.activeIncentives?.map(
                (incentive: ActiveIncentive, index: number) => (
                  <TokenIcon
                    address={incentive.token.address}
                    size={"md"}
                    key={`${index}-${incentive.token.address}-TokenIcon`}
                  />
                ),
              )}
              {globalData.incentiveCount > 3 && (
                <span className="text-xs leading-5 text-muted-foreground">
                  {" "}
                  +
                  <FormattedNumber
                    value={globalData.incentiveCount - 3}
                    visibleDecimals={0}
                  />
                </span>
              )}
            </div>
          ) : (
            <Skeleton className="mt-1 h-6 w-[75px]" />
          )}
        </div>
        <div className="flex flex-col justify-center gap-2 border-x border-b border-border p-5">
          <div className="text-xs leading-5 text-muted-foreground">
            Total No. of Validators
          </div>
          {isLoading || !globalData ? (
            <Skeleton className="h-5 w-16 rounded-sm" />
          ) : (
            <div className="w-fit rounded-full bg-success-foreground bg-opacity-10 px-2 py-1 text-sm font-medium leading-[18px] text-success-foreground">
              {globalData.validatorCount} Active
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-2 border-b border-border p-5">
          <div className="text-xs leading-5 text-muted-foreground">
            Total Circulating BGT
          </div>
          {isLoading ? (
            <Skeleton className="h-5 w-full rounded-sm" />
          ) : (
            <div className="flex items-center gap-1 text-sm font-bold leading-5">
              <FormattedNumber
                value={globalData?.bgtTotalSupply ?? 0}
                compact={false}
              />
              <Icons.bgt className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      <div className="item-start flex w-full flex-col justify-between gap-4 p-4 md:flex-row md:items-center">
        <div className="text-sm leading-5 text-muted-foreground">
          Estimates are updated weekly.
          <br />
          Checkout each validator for <br />
          their incentives distribution breakdown
        </div>
        <div className="flex w-full flex-col items-start gap-2 rounded-sm border border-warning-foreground bg-warning px-3 py-2 md:w-[200px] md:items-end">
          <div className="w-fit text-[10px] text-warning-foreground">
            Est. Avg. Return per Proposed block
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <Icons.honey className="h-6 w-6" />
              <FormattedNumber
                value={globalData?.bgtInfo?.bgtPerBlock ?? 0}
                compact={false}
                compactThreshold={999_999}
                showIsSmallerThanMin
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
