import React from "react";
import {
  Validator,
  usePollGauges,
  usePollGlobalData,
  usePollValidatorInfo,
} from "@bera/berajs";
import { FormattedNumber, ValidatorIcon } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { getValidatorEstimatedBgtPerYear } from "~/hooks/useValidatorEstimatedBgtPerYear";

export default function GaugeInfoCard() {
  const { data, isLoading: isGlobalDataLoading } = usePollGlobalData();
  const {
    validatorCounts,
    validatorInfoList,
    isLoading: isValidatorCountLoading,
  } = usePollValidatorInfo({
    sortBy: "votingpower",
    sortOrder: "desc",
    page: 1,
    pageSize: 3,
  });
  const isLoading = isGlobalDataLoading || isValidatorCountLoading;
  return (
    <Card className="flex w-full flex-col overflow-hidden rounded-lg">
      <div className="grid grid-cols-1 bg-muted sm:grid-cols-[auto_auto_auto]">
        <div className="flex flex-col justify-center border-b border-border p-4">
          <div className="text-xs leading-5 text-muted-foreground">
            Active Gauges Vaults
          </div>
          {!isLoading ? (
            <div className="inline-flex h-7 items-end gap-1">
              <span className="text-2xl font-semibold leading-6">142</span>
              <span className="font-medium leading-5 text-muted-foreground">
                (690.42M)
              </span>
            </div>
          ) : (
            <Skeleton className="h-7 w-[125px] " />
          )}
          {!isLoading ? (
            <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
              <Icons.bexFav className="h-4 w-4" />
              <Icons.berpsFav className="h-4 w-4" />
              <Icons.bendFav className="h-4 w-4" />
              <span className="text-sm leading-5 text-muted-foreground">
                {" "}
                +69
              </span>
            </div>
          ) : (
            <Skeleton className="mt-1 h-6 w-[75px]" />
          )}
        </div>
        <div className="flex flex-col justify-center gap-1 border-x border-b border-border p-4">
          <div className="text-xs leading-5 text-muted-foreground">
            Top 3 Validators
          </div>
          {!isLoading ? (
            validatorInfoList.map((validator: Validator, index: number) => (
              <div
                className="flex h-7 w-fit flex-nowrap items-center gap-2 rounded-full border border-border bg-background px-2"
                key={`${index}-${validator.id}`}
              >
                <ValidatorIcon
                  address={validator.id}
                  size={"md"}
                  imgOverride={validator.metadata.logoURI}
                />
                <span className="text-nowrap text-xs font-medium">
                  {validator.metadata.name}
                </span>
                <span className="text-nowrap text-[10px] text-muted-foreground">
                  BGT/Year:{" "}
                  <FormattedNumber
                    value={getValidatorEstimatedBgtPerYear(
                      validator,
                      validatorCounts,
                    )}
                    showIsSmallerThanMin
                  />
                </span>
              </div>
            ))
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
                  value={data?.bgtInfo?.blockCountPerYear ?? 0}
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
          {!isLoading ? (
            <div className="flex items-center gap-2 text-xl font-bold leading-5">
              690.42K
            </div>
          ) : (
            <Skeleton className="h-6 w-[100px]" />
          )}
          {!isLoading ? (
            <div className="mt-1 flex w-fit items-center gap-1 rounded-full border border-border bg-background px-2 py-1">
              <Icons.bgt className="h-4 w-4" />
              <Icons.honey className="h-4 w-4" />
              <Icons.bera className="h-4 w-4" />
              <span className="text-xs leading-5 text-muted-foreground">
                {" "}
                +420,69
              </span>
            </div>
          ) : (
            <Skeleton className="mt-1 h-6 w-[75px]" />
          )}
        </div>
        <div className="flex flex-col justify-center gap-2 border-x border-b border-border p-5">
          <div className="text-xs leading-5 text-muted-foreground">
            Total No. of Validators
          </div>
          {isLoading ? (
            <Skeleton className="h-5 w-16 rounded-sm" />
          ) : (
            <div className="w-fit rounded-full bg-success-foreground bg-opacity-10 px-2 py-1 text-sm font-medium leading-[18px] text-success-foreground">
              {validatorCounts} Active
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
                value={data?.bgtTotalSupply ?? 0}
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
          {isGlobalDataLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <div className="flex items-center gap-2 text-2xl font-semibold">
              <Icons.honey className="h-6 w-6" />
              <FormattedNumber
                value={data?.bgtInfo?.bgtPerBlock ?? 0}
                compact={false}
                showIsSmallerThanMin
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
