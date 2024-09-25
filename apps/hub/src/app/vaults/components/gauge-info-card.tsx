import React from "react";
import Link from "next/link";
import { truncateHash, usePollGlobalData, type Validator } from "@bera/berajs";
import { FormattedNumber, ValidatorIcon } from "@bera/shared-ui";
import { getHubValidatorPath } from "@bera/shared-ui/src/utils/getHubUrls";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { getValidatorEstimatedBgtPerYear } from "~/hooks/useValidatorEstimatedBgtPerYear";

export default function GaugeInfoCard() {
  const { data: globalData, isLoading } = usePollGlobalData();
  console.log("check globalData", globalData);
  return (
    <div className="flex w-full flex-1 flex-col gap-6 sm:flex-row">
      <div className="flex flex-1 flex-row gap-6 sm:flex-col">
        <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border px-4 py-6">
          <div className="text-sm font-medium leading-5 text-muted-foreground">
            Active Gauges Vaults
          </div>
          {!isLoading ? (
            <span className="text-2xl font-semibold leading-8">
              {globalData?.top3Vaults?.total}
            </span>
          ) : (
            <Skeleton className="h-8 w-[125px] " />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border px-4 py-6">
          <div className="text-sm font-medium leading-5 text-muted-foreground">
            Active Incentives
          </div>
          {!isLoading && globalData ? (
            <FormattedNumber
              value={globalData.sumAllIncentivesInHoney}
              symbol="USD"
              compact={false}
              compactThreshold={999_999_999}
              className="items-center text-xl font-bold leading-5"
            />
          ) : (
            <Skeleton className="h-8 w-[100px]" />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-row gap-6 sm:flex-col">
        <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border px-4 py-6">
          <div className="text-sm font-medium leading-5 text-muted-foreground">
            Total Circulating BGT
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <div className="flex items-center gap-1">
              <FormattedNumber
                value={globalData?.bgtTotalSupply ?? 0}
                compact={false}
                compactThreshold={999_999_999}
                className="items-center text-xl font-bold leading-5"
              />
              <Icons.bgt className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border px-4 py-6">
          <div className="text-sm font-medium leading-5 text-muted-foreground">
            BGT Distribution (Yearly)
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-full" />
          ) : (
            <FormattedNumber
              value={globalData?.bgtInfo?.blockCountPerYear ?? 0}
              compact={false}
              compactThreshold={999_999}
              symbol="BGT"
              className="items-center text-xl font-bold leading-5"
            />
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 rounded-lg border border-border px-4 py-6">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium leading-5 text-muted-foreground">
            # Of Active Validators
          </div>
          {isLoading || !globalData ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-2xl font-semibold">
              {" "}
              {globalData.validatorCount}{" "}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="text-xs font-medium uppercase leading-5 tracking-wider text-muted-foreground ">
            Top 3 Validators
          </div>
          {!isLoading && globalData ? (
            globalData.top3EmittingValidators?.validators?.map(
              (
                validator: { stakedVotingPower: number; validator: Validator },
                index: number,
              ) => (
                <div
                  className="flex w-full flex-1 items-center gap-2 rounded-sm border border-border bg-background px-4 py-2"
                  key={`${index}-${validator.validator.id}`}
                >
                  <ValidatorIcon
                    address={validator.validator.id}
                    size="xl"
                    imgOverride={validator.validator.metadata?.logoURI}
                  />
                  <div>
                    <Link
                      className="cursor-pointer text-nowrap text-sm font-semibold leading-5"
                      href={getHubValidatorPath(validator.validator.id)}
                      target="_blank"
                    >
                      {validator.validator?.metadata?.name ??
                        truncateHash(validator.validator.id)}
                    </Link>
                    <FormattedNumber
                      value={getValidatorEstimatedBgtPerYear(
                        validator.validator,
                        globalData.validatorCount,
                      )}
                      showIsSmallerThanMin
                      symbol="BGT/Year"
                      className="block text-nowrap text-[10px] font-medium leading-3 text-muted-foreground"
                    />
                  </div>
                </div>
              ),
            )
          ) : (
            <>
              <Skeleton className="h-14 w-full rounded-md" />
              <Skeleton className="h-14 w-full rounded-md" />
              <Skeleton className="h-14 w-full rounded-md" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
