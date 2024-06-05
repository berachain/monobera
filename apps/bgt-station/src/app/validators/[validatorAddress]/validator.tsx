"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  truncateHash,
  usePollValidatorInfo,
  type Validator,
} from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { FormattedNumber, Tooltip, ValidatorIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type Address } from "viem";

export const ValidatorDataCard = ({
  title,
  value,
  className,
}: {
  title: string;
  value: React.ReactNode;
  className?: string;
}) => {
  return (
    <Card className={cn(className, "bg-muted p-5")}>
      <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground	">
        {title}
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
  featuredGauges: string[];
  isLoading: boolean;
}) => {
  const nonFeaturedGaugeLength = totalGauges - featuredGauges.length;
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[35px] w-[75px]" />
      ) : (
        <div className="inline-flex h-7 items-end gap-1">
          <span className="text-2xl font-semibold leading-6">
            {totalGauges} (690.42M)
          </span>
        </div>
      )}
      {isLoading ? (
        <Skeleton className="mt-1 h-[25px] w-[100px]" />
      ) : (
        <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
          <Icons.bexFav className="h-6 w-6" />
          <Icons.bendFav className="h-6 w-6" />
          <Icons.berpsFav className="h-6 w-6" />
          <span className="text-sm leading-5 text-muted-foreground"> +4</span>
          {/* {nonFeaturedGaugeLength !== 0 && (
            <span className="text-sm leading-5 text-muted-foreground">
              {" "}
              +{nonFeaturedGaugeLength}
            </span>
          )} */}
        </div>
      )}
    </div>
  );
};

export const IncentivesOverview = ({
  totalActiveIncentiveValue,
  totalActiveIncentives,
  featuredIncentiveTokenImages,
  isLoading,
}: {
  totalActiveIncentiveValue: number;
  totalActiveIncentives: number;
  featuredIncentiveTokenImages: string[];
  isLoading: boolean;
}) => {
  return (
    <div>
      {isLoading ? (
        <Skeleton className="h-[35px] w-[75px]" />
      ) : (
        <div className="inline-flex h-7 items-end gap-1">
          <span className="text-2xl font-semibold leading-6">
            <FormattedNumber value={totalActiveIncentiveValue} compact />{" "}
            <span className="text-sm text-muted-foreground">
              ({totalActiveIncentives} Tokens)
            </span>
          </span>
        </div>
      )}
      {isLoading ? (
        <Skeleton className="mt-1 h-[25px] w-[100px]" />
      ) : (
        <div className="mt-1 flex w-fit items-center gap-1 rounded-full border border-border bg-background p-1 pr-2">
          <Icons.honey className="h-6 w-6" />
          <Icons.bgt className="h-6 w-6" />
          <Icons.beraIcon className="h-6 w-6" />
          <span className="text-sm leading-5 text-muted-foreground"> +27</span>
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

export default function Validator({
  validatorAddress,
}: {
  validatorAddress: Address;
}) {
  const router = useRouter();
  const {
    validatorCounts,
    validatorInfoDictionary,
    validatorInfoList,
    isLoading,
  } = usePollValidatorInfo();
  //@ts-ignore
  const validator = validatorInfoDictionary?.[validatorAddress];
  const validatorDataItems: {
    title: string;
    value: React.ReactNode;
    tooltipText: string;
  }[] = [
    {
      title: "APY",
      value: (
        <span className="text-xl font-semibold">{validator?.apy ?? 0}%</span>
      ),
      tooltipText: "Total BGT directed to this validator",
    },
    {
      title: "Voting Power",
      value: (
        <span className="text-xl font-semibold">
          {validator?.amountStaked}{" "}
          <span className="text-sm text-muted-foreground">(0.0069%)</span>
        </span>
      ),
      tooltipText: "Total BGT directed to this validator",
    },
    {
      title: "Commission",
      value: (
        <span className="text-xl font-semibold">
          {validator?.commission ?? 0}%
        </span>
      ),
      tooltipText: "Honey",
    },
    {
      title: "Website",
      value: (
        <span className="text-ellipsis text-xl font-semibold hover:underline">
          <Link href={validator?.website ?? ""}>
            {validator?.metadata.website ?? ""}
          </Link>
        </span>
      ),
      tooltipText: "Honey",
    },
  ];
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
                address={validator?.id ?? ""}
                className="h-12 w-12"
              />
              {isLoading ? (
                <Skeleton className="h-[38px] w-[250px]" />
              ) : (
                validator?.metadata.name
              )}
            </div>
            <div className="my-4 flex w-full flex-row gap-1 text-muted-foreground">
              Hex Address:
              {isLoading ? (
                <Skeleton className="h-[25px] w-[150px]" />
              ) : (
                <span className="flex flex-row gap-1 text-foreground hover:underline">
                  <Link href={`${blockExplorerUrl}/${validator?.id}`}>
                    {truncateHash(validator?.id)}
                  </Link>
                  <Icons.externalLink className="h-4 w-4 self-center" />
                </span>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-[100px] w-[350px]" />
            ) : (
              <div className="w-full overflow-hidden text-ellipsis text-foreground">
                {validator?.metadata.Description}
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
                    {item.title} <Tooltip text={item.tooltipText} />
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
                    `/delegate?action=delegate&validator=${validator.id}`,
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
                    `/delegate?action=unbond&validator=${validator.id}`,
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

      <div className="mt-6 grid w-full   grid-cols-1 gap-x-0 gap-y-4 md:grid-cols-4 md:gap-x-4">
        <ValidatorDataCard
          className="col-span-2 row-start-1  h-[135px]"
          title="Active Gauges Vaults"
          value={
            <GaugeOverview
              isLoading={isLoading}
              totalGauges={(validator?.cuttingboard ?? []).length}
              featuredGauges={(validator?.cuttingboard ?? []).map(
                (cb: any) => cb.receiver.imageUri,
              )}
            />
          }
        />
        <ValidatorDataCard
          className="col-span-2 row-start-2 h-[135px] md:row-start-1"
          title="Active Incentives"
          value={
            <IncentivesOverview
              isLoading={isLoading}
              totalActiveIncentiveValue={6420000}
              totalActiveIncentives={30}
              featuredIncentiveTokenImages={[
                "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
                "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
                "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
              ]}
            />
          }
        />
        <ValidatorDataCard
          className="row-start-3 h-[100px] md:row-start-2"
          title="Reward Rate"
          value={
            isLoading ? (
              <Skeleton className="h-[30px] w-[100px]" />
            ) : (
              <div className="flex flex-row gap-1">
                <span className="text-2xl font-semibold">100</span>
                <Icons.bgt className="h-6 w-6 self-center" />
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="row-start-4 h-[100px] md:row-start-2"
          title="Return per BGT"
          value={
            isLoading ? (
              <Skeleton className="h-[30px] w-[100px]" />
            ) : (
              <div className="flex flex-row gap-1">
                <span className="text-2xl font-semibold">100</span>
                <Icons.honey className="h-6 w-6 self-center" />
              </div>
            )
          }
        />
        <ValidatorDataCard
          className="row-start-5 h-[100px] md:row-start-2"
          title="Lifetime Incentives Received"
          value={
            isLoading ? (
              <Skeleton className="h-[30px] w-[150px]" />
            ) : (
              <div className="flex flex-row items-center gap-1">
                <span className="text-2xl font-semibold">
                  <FormattedNumber value={6420000} compact />
                </span>
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">
                  (32 Tokens)
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
                <span className="text-2xl font-semibold">100</span>
                <Icons.bgt className="h-6 w-6 self-center" />
              </div>
            )
          }
        />
      </div>
      {/* <ValidatorPolData validator={validator} isLoading={isLoading} /> */}
    </div>
  );
}
