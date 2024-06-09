"use client";

import React from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  ActiveIncentive,
  CuttingBoardWeight,
  Token,
  truncateHash,
  useSelectedValidator,
  useTokenHoneyPrices,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import {
  FormattedNumber,
  GaugeIcon,
  TokenIcon,
  Tooltip,
  ValidatorIcon,
  apyTooltipText,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { ba } from "node_modules/@bera/berajs/dist/chunk-YUACHPMR";
import { type Address } from "viem";

import {
  ValidatorPolData,
  getActiveIncentivesArray,
} from "./validator-pol-data";

export const ValidatorDataCard = ({
  title,
  value,
  tooltipText,
  className,
}: {
  title: string;
  value: React.ReactNode;
  tooltipText?: string | undefined;
  className?: string;
}) => {
  return (
    <Card className={cn(className, "bg-muted p-5")}>
      <div className="flex w-full items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
        {title}
        {tooltipText && <Tooltip text={tooltipText} />}
      </div>
      <div className="mt-1 text-foreground ">{value}</div>
    </Card>
  );
};

export const GaugeOverview = ({
  totalGauges,
  featuredGauges,
  isLoading,
}: {
  totalGauges: number;
  featuredGauges: CuttingBoardWeight[];
  isLoading: boolean;
}) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[35px] w-[75px]" />
      ) : (
        <div className="inline-flex h-7 items-end gap-1">
          <span className="text-2xl font-semibold leading-6">
            {totalGauges}
          </span>
        </div>
      )}
      {!isLoading ? (
        <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
          {featuredGauges.map((gauge: CuttingBoardWeight, index: number) => (
            <GaugeIcon
              key={index}
              address={gauge.receiver}
              size="md"
              overrideImage={gauge.receiverMetadata?.logoURI ?? ""}
            />
          ))}
          {totalGauges > 3 && (
            <span className="text-sm leading-5 text-muted-foreground">
              {" "}
              +{totalGauges - 3}
            </span>
          )}
        </div>
      ) : (
        <Skeleton className="mt-1 h-6 w-[75px]" />
      )}
    </div>
  );
};

export const IncentivesOverview = ({
  totalActiveIncentiveValue,
  totalActiveIncentives,
  featuredTokens,
  isLoading,
}: {
  totalActiveIncentiveValue: number;
  totalActiveIncentives: number;
  featuredTokens: Token[];
  isLoading: boolean;
}) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[35px] w-[75px]" />
      ) : (
        <div className="inline-flex h-7 items-end gap-1">
          <span className="text-2xl font-semibold leading-6">
            <FormattedNumber
              value={totalActiveIncentiveValue}
              symbol="USD"
              compact
            />{" "}
            <span className="text-sm text-muted-foreground">
              ({totalActiveIncentives} Incentives)
            </span>
          </span>
        </div>
      )}
      {isLoading ? (
        <Skeleton className="mt-1 h-[25px] w-[100px]" />
      ) : (
        <div className="mt-1 flex w-fit items-center gap-1 rounded-full border border-border bg-background p-1 ">
          {featuredTokens.map((token, index) => (
            <TokenIcon
              key={index}
              address={token.address}
              className="h-6 w-6"
            />
          ))}
          {featuredTokens.length > 3 && (
            <span className="text-sm leading-5 text-muted-foreground">
              {" "}
              +{featuredTokens.length - 3}
            </span>
          )}
          {/* {featuredIncentiveTokenImages.map((gauge, index) => (
            <Image
              src={gauge}
              alt={`featuredGauge-${index}`}
              height={16}
              width={16}
              objectFit="contain"
            />
          ))}
          <span className="text-sm leading-5 text-muted-foreground">
            {" "}
            +{totalActiveIncentives - featuredIncentiveTokenImages.length}
          </span> */}
        </div>
      )}
    </div>
  );
};

export interface ActiveIncentiveWithVault extends ActiveIncentive {
  cuttingBoard: CuttingBoardWeight;
}

export default function Validator({
  validatorAddress,
}: {
  validatorAddress: Address;
}) {
  const router = useRouter();
  const {
    data: validator,
    isLoading,
    isValidating,
  } = useSelectedValidator(validatorAddress);
  if (!isLoading && !isValidating && !validator) return notFound();
  const validatorDataItems: {
    title: string;
    value: React.ReactNode;
    tooltipText: any;
  }[] = [
    {
      title: "APY",
      value: (
        <div className="text-xl font-semibold">
          <FormattedNumber value={(validator?.apy ?? 0)/10000} showIsSmallerThanMin percent />
        </div>
      ),
      tooltipText: apyTooltipText(),
    },
    {
      title: "Voting Power",
      value: (
        <span className="text-xl font-semibold">
          <FormattedNumber
            value={validator?.amountStaked ?? "0"}
            showIsSmallerThanMin
            symbol="BGT"
          />{" "}
          <FormattedNumber
            className="text-sm text-muted-foreground"
            value={validator ? validator.votingPower / 100 : 0}
            showIsSmallerThanMin
            percent
          />
        </span>
      ),
      tooltipText:
        "Represents the influence in network governance based on the amount delegated to this validator",
    },
    {
      title: "Commission",
      value: (
        <span className="text-xl font-semibold">
          {validator?.commission ?? 0}%
        </span>
      ),
      tooltipText: "Amount of validator rewards retained by this validator",
    },
    {
      title: "Website",
      value: (
        <span className="text-ellipsis text-xl font-semibold hover:underline">
          <Link href={validator?.metadata?.website ?? ""}>
            {validator?.metadata?.website ?? ""}
          </Link>
        </span>
      ),
      tooltipText: undefined,
    },
  ];

  const activeIncentivesArray: ActiveIncentiveWithVault[] =
    getActiveIncentivesArray(validator);
  const activeIncentivesTokens = [
    ...new Set(activeIncentivesArray?.map((incentive) => incentive.token)),
  ];
  const { data: tokenHoneyPrices } = useTokenHoneyPrices({
    tokenAddresses: activeIncentivesTokens.map(
      (t: Token) => t.address,
    ) as Address[],
  });

  const activeIncentivesValue: number = activeIncentivesArray?.reduce(
    (acc: number, ab: ActiveIncentiveWithVault) => {
      const tokenPrice = parseFloat(
        tokenHoneyPrices?.[ab.token.address] ?? "0",
      );
      return acc + ab.amountLeft * tokenPrice;
    },
    0,
  );

  const returnPerBgt: number = activeIncentivesArray?.reduce(
    (acc: number, ab: ActiveIncentiveWithVault) => {
      const tokenPrice = parseFloat(
        tokenHoneyPrices?.[ab.token.address] ?? "0",
      );
      return acc + ab.incentiveRate * tokenPrice;
    },
    0,
  );

  return (
    <div className="relative flex flex-col">
      <div className="flex flex-col gap-3">
        <Link
          className="flex items-center gap-1 text-sm font-medium leading-[14px] text-muted-foreground hover:cursor-pointer"
          href="/validators"
        >
          <Icons.arrowLeft className="relative h-4 w-4" />
          Validators
        </Link>
        <div className="mt-2 flex w-full flex-col justify-between gap-6 border-b  border-border pb-6 lg:flex-row ">
          <div className="items-left w-full flex-col justify-evenly gap-4">
            <div className="flex w-full items-center justify-start gap-2 text-xl font-bold leading-[48px]">
              <ValidatorIcon
                address={validator?.id}
                className="h-12 w-12"
                imgOverride={validator?.metadata?.logoURI}
              />
              {isLoading ? (
                <Skeleton className="h-[38px] w-[250px]" />
              ) : (
                validator?.metadata?.name ?? truncateHash(validator?.id ?? "")
              )}
            </div>
            <div className="my-4 flex w-full flex-row gap-1 text-muted-foreground">
              Hex Address:
              {isLoading ? (
                <Skeleton className="h-[25px] w-[150px]" />
              ) : (
                <span className="flex flex-row gap-1 text-foreground hover:underline">
                  <Link href={`${blockExplorerUrl}/${validator?.id}`}>
                    {truncateHash(validator?.id ?? "")}
                  </Link>
                  <Icons.externalLink className="h-4 w-4 self-center" />
                </span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-[100px] w-[350px]" />
            ) : (
              <div className="w-full overflow-hidden text-ellipsis text-foreground">
                {validator?.metadata?.Description ?? ""}
              </div>
            )}
          </div>
          <div className="items-left w-full flex-col justify-between gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {validatorDataItems.map((item, index) => (
                <div
                  className="relative flex flex-col items-start justify-start"
                  key={index}
                >
                  <div className="flex flex-row items-center gap-1 text-muted-foreground">
                    {item.title}{" "}
                    {item.tooltipText && <Tooltip text={item.tooltipText} />}
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-[30px] w-[150px]" />
                  ) : (
                    <div className="mt-1 w-full overflow-hidden text-ellipsis text-foreground">
                      {item.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row">
              <Button
                className="w-full"
                disabled={isLoading}
                onClick={() =>
                  router.push(
                    `/delegate?action=delegate&validator=${validator?.id}`,
                  )
                }
              >
                Delegate <Icons.add className="relative ml-1 h-4 w-4" />
              </Button>
              <Button
                className="w-full"
                variant="outline"
                disabled={isLoading}
                onClick={() =>
                  router.push(
                    `/delegate?action=unbond&validator=${validator?.id}`,
                  )
                }
              >
                {" "}
                Unbond
                <Icons.minus className="relative ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-4 md:gap-x-4">
        <ValidatorDataCard
          className="col-span-2 row-start-1  h-[135px]"
          title="Active Gauges Vaults"
          value={
            <GaugeOverview
              isLoading={isLoading}
              totalGauges={(validator?.cuttingBoard.weights ?? []).length}
              featuredGauges={validator?.cuttingBoard.weights ?? []}
            />
          }
        />
        <ValidatorDataCard
          className="col-span-2 row-start-2 h-[135px] md:row-start-1"
          title="Active Incentives"
          tooltipText="The total value of active incentives that this validator is directing BGT towards"
          value={
            <IncentivesOverview
              isLoading={isLoading}
              totalActiveIncentiveValue={activeIncentivesValue}
              totalActiveIncentives={activeIncentivesArray?.length ?? 0}
              featuredTokens={activeIncentivesTokens.map((token) => token)}
            />
          }
        />
        <ValidatorDataCard
          className="row-start-3 h-[100px] md:row-start-2"
          title="Reward Rate"
          tooltipText="The amount of BGT directed by this validator per proposal"
          value={
            isLoading ? (
              <Skeleton className="h-[30px] w-[100px]" />
            ) : (
              <div className="flex flex-row gap-1">
                <FormattedNumber
                  value={validator?.rewardRate ?? 0}
                  className="text-2xl font-semibold"
                />
                <Icons.bgt className="h-6 w-6 self-center" />
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="row-start-4 h-[100px] md:row-start-2"
          title="Return per BGT"
          tooltipText="The estimated amount of incentives received per BGT directed by this validator"
          value={
            isLoading ? (
              <Skeleton className="h-[30px] w-[100px]" />
            ) : (
              <div className="flex flex-row gap-1 text-2xl font-semibold">
                $
                <FormattedNumber
                  value={returnPerBgt}
                  compact
                  showIsSmallerThanMin
                />
                <Icons.honey className="h-6 w-6 self-center" />
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="row-start-5 h-[100px] md:row-start-2"
          title="Lifetime Incentives"
          value={
            isLoading ? (
              <Skeleton className="h-[30px] w-[150px]" />
            ) : (
              <div className="flex flex-row items-center gap-1">
                <span className="text-2xl font-semibold">
                  <FormattedNumber
                    value={
                      validator
                        ? validator.allTimeData.allTimeHoneyValueTokenRewards
                        : 0
                    }
                    showIsSmallerThanMin
                    compact
                    symbol="USD"
                  />
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
                  (
                  {validator
                    ? validator.allTimeData.allTimeUniqueTokenCount
                    : 0}{" "}
                  Tokens)
                </span>
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="row-start-6 h-[100px] md:row-start-2"
          title="Lifetime BGT Directed"
          value={
            isLoading ? (
              <Skeleton className="h-[30px] w-[100px]" />
            ) : (
              <div className="flex flex-row gap-1">
                <span className="text-2xl font-semibold">
                  <FormattedNumber
                    value={
                      validator ? validator.allTimeData.allTimeBgtDirected : 0
                    }
                    showIsSmallerThanMin
                    compact
                  />
                </span>
                <Icons.bgt className="h-6 w-6 self-center" />
              </div>
            )
          }
        />
      </div>
      {validator && (
        <ValidatorPolData
          validator={validator}
          isLoading={isLoading}
          isValidating={isValidating}
        />
      )}
    </div>
  );
}
