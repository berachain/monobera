"use client";

import React from "react";
import Link from "next/link";
import { truncateHash } from "@bera/berajs";
import { type Validator } from "@bera/berajs";

import { FormattedNumber, Tooltip, ValidatorIcon } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits, type Address } from "viem";

import BribesAndEmissions from "./bribes-and-emissions";
import ValidatorActivitiesTable from "./validator-activities-table";
import ValidatorDetails from "./validator-details";
import ValidatorGaugeWeightInfo from "./validator-gauge-weight";
import { blockExplorerUrl, cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { cn } from "@bera/ui";
import Image from "next/image";
import { ValidatorPolData } from "./validator-pol-data";

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
    <Card className={cn(className, "p-5 bg-muted")}>
      <div className="text-muted-foreground text-sm w-full text-ellipsis overflow-hidden whitespace-nowrap	">
        {title}
      </div>
      <div className="text-foreground mt-1 ">{value}</div>
    </Card>
  );
};

export const GaugeOverview = ({
  totalGauges,
  featuredGauges,
}: {
  totalGauges: number;
  featuredGauges: string[];
}) => {
  return (
    <div>
      <div className="inline-flex h-7 items-end gap-1">
        <span className="text-2xl font-semibold leading-6">{totalGauges}</span>
      </div>
      <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
        {featuredGauges.map((gauge, index) => (
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
          +{totalGauges - featuredGauges.length}
        </span>
      </div>
    </div>
  );
};

export const IncentivesOverview = ({
  totalActiveIncentiveValue,
  totalActiveIncentives,
  featuredIncentiveTokenImages,
}: {
  totalActiveIncentiveValue: number;
  totalActiveIncentives: number;
  featuredIncentiveTokenImages: string[];
}) => {
  return (
    <div>
      <div className="inline-flex h-7 items-end gap-1">
        <span className="text-2xl font-semibold leading-6">
          <FormattedNumber value={totalActiveIncentiveValue} compact />{" "}
          <span className="text-sm text-muted-foreground">
            ({totalActiveIncentives} Tokens)
          </span>
        </span>
      </div>
      <div className="mt-1 flex w-fit items-center gap-1 rounded-sm border border-border bg-background p-1 pr-2">
        {featuredIncentiveTokenImages.map((gauge, index) => (
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
        </span>
      </div>
    </div>
  );
};

export default function Validator({
  validatorAddress,
}: {
  validatorAddress: Address;
}) {
  const prices = undefined;
  const percentageDelegated = undefined;
  const validator: Validator = {
    coinbase: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
    name: "Honey Validator",
    commission: "0.02",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.",
    website: "https://www.honeyvalidator.com",
    imageUri: "https://www.honeyvalidator.com/logo.png",
    amountStaked: "1500000",
    cuttingboard: [
      {
        percentage: 25,
        amount: 375000,
        receiver: {
          address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
          stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
          name: "Honey Vault",
          imageUri:
            "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
          website: "https://www.honeyvault.com",
          activeIncentives: [
            {
              token: {
                name: "Honey Token",
                symbol: "HNY",
                address: "0xdeadbeefdeadbeef",
                decimals: 18,
              },
              incentiveRate: "0.05",
              amountLeft: "50000",
            },
          ],
          market: {
            name: "Honey Market",
            imageUri:
              "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
            website: "https://www.honeymarket.com",
          },
        },
      },
      {
        percentage: 25,
        amount: 75000,
        receiver: {
          address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
          stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
          name: "Honey Vault",
          imageUri:
            "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
          website: "https://www.honeyvault.com",
          activeIncentives: [
            {
              token: {
                name: "Honey Token",
                symbol: "HNY",
                address: "0xdeadbeefdeadbeef",
                decimals: 18,
              },
              incentiveRate: "0.05",
              amountLeft: "50000",
            },
          ],
          market: {
            name: "Honey Market",
            imageUri:
              "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
            website: "https://www.honeymarket.com",
          },
        },
      },
      {
        percentage: 25,
        amount: 375000,
        receiver: {
          address: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
          stakingToken: "0xb10a6CE3423Bf521EcB144b416F42D55A22eb0aD",
          name: "Honey Vault",
          imageUri:
            "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
          website: "https://www.honeyvault.com",
          activeIncentives: [
            {
              token: {
                name: "Honey Token",
                symbol: "HNY",
                address: "0xdeadbeefdeadbeef",
                decimals: 18,
              },
              incentiveRate: "0.05",
              amountLeft: "50000",
            },
          ],
          market: {
            name: "Honey Market",
            imageUri:
              "https://res.cloudinary.com/duv0g402y/image/upload/v1693160761/honey/qqyo5g3phzdwezvazsih.png",
            website: "https://www.honeymarket.com",
          },
        },
      },
    ],
    apy: "0.12",
    allTimeStats: {
      totalBgtDirected: "2000000",
      totalHoneyValueBgtDirected: "3000000",
      totalHoneyValueTokenRewards: "500000",
    },
  };

  const validatorDataItems: {
    title: string;
    value: React.ReactNode;
    tooltipText: string;
  }[] = [
    {
      title: "APY",
      value: <span className="text-xl font-semibold">{validator.apy}%</span>,
      tooltipText: "Total BGT directed to this validator",
    },
    {
      title: "Voting Power",
      value: (
        <span className="text-xl font-semibold">
          {validator.amountStaked}{" "}
          <span className="text-sm text-muted-foreground">(0.0069%)</span>
        </span>
      ),
      tooltipText: "Total BGT directed to this validator",
    },
    {
      title: "Commission",
      value: (
        <span className="text-xl font-semibold">{validator.commission}%</span>
      ),
      tooltipText: "Honey",
    },
    {
      title: "Website",
      value: (
        <span className="text-xl font-semibold hover:underline text-ellipsis">
          <Link href={validator.website}>{validator.website}</Link>
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
        <div className="w-full flex lg:flex-row flex-col justify-between mt-2 gap-6  pb-6 border-b border-border ">
          <div className="flex-col items-left w-full gap-4 justify-evenly">
            <div className="flex w-full items-start justify-start gap-2 text-xl font-bold leading-[48px]">
              <ValidatorIcon
                address={validator.coinbase}
                className="h-12 w-12"
              />
              {validator?.name ?? (
                <Skeleton className="inline-block h-12 w-[100px]" />
              )}
            </div>
            <div className="my-4 text-muted-foreground w-full flex flex-row gap-1">
              Hex Address:
              <span className="hover:underline text-foreground">
                <Link href={`${blockExplorerUrl}/${validator.coinbase}`}>
                  {truncateHash(validator.coinbase)}
                </Link>
              </span>
              <Icons.externalLink className="h-4 w-4 self-center" />
            </div>
            <div className="text-foreground w-full lg:max-w-[450px]">
              {validator?.description}
            </div>
          </div>
          <div className="flex-col items-left w-full gap-4 justify-between">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {validatorDataItems.map((item, index) => (
                <div className="relative flex flex-col justify-start items-start">
                  <div className="text-muted-foreground items-center flex flex-row gap-1">
                    {item.title} <Tooltip text={item.tooltipText} />
                  </div>
                  <div className="text-foreground mt-1 w-full text-ellipsis overflow-hidden">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-4 mt-6 sm:flex-row">
              <Link
                href={`/delegate?action=delegate&validator=${validator.coinbase}`}
                className="flex-1"
              >
                <Button className="w-full">
                  Delegate <Icons.add className="relative ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href={`/delegate?action=redelegate&validator=${validator.coinbase}`}
                className="flex-1"
              >
                <Button className="w-full" variant="outline">
                  {" "}
                  Redelegate
                  <Icons.redo className="relative ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href={`/delegate?action=unbond&validator=${validator.coinbase}`}
                className="flex-1"
              >
                <Button className="w-full" variant="outline">
                  {" "}
                  Unbond
                  <Icons.minus className="relative ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4   w-full mt-6 gap-y-4 gap-x-0 md:gap-x-4">
        <ValidatorDataCard
          className="col-span-2 row-start-1  h-[135px]"
          title="Active Gauges"
          value={
            <GaugeOverview
              totalGauges={validator.cuttingboard.length}
              featuredGauges={validator.cuttingboard.map(
                (cb: any) => cb.receiver.imageUri,
              )}
            />
          }
        />
        <ValidatorDataCard
          className="col-span-2 md:row-start-1 row-start-2 h-[135px]"
          title="Active Incentives"
          value={
            <IncentivesOverview
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
          className="md:row-start-2 row-start-3 h-[100px]"
          title="Reward Rate"
          value={
            <div className="flex flex-row gap-1">
              <span className="text-2xl font-semibold">100</span>
              <Icons.bgt className="h-6 w-6 self-center" />
            </div>
          }
        />
        <ValidatorDataCard
          className="md:row-start-2 row-start-4 h-[100px]"
          title="Return per BGT"
          value={
            <div className="flex flex-row gap-1">
              <span className="text-2xl font-semibold">100</span>
              <Icons.honey className="h-6 w-6 self-center" />
            </div>
          }
        />
        <ValidatorDataCard
          className="md:row-start-2 row-start-5 h-[100px]"
          title="Lifetime Incentives Received"
          value={
            <div className="flex flex-row gap-1 items-center">
              <span className="text-2xl font-semibold">
                <FormattedNumber value={6420000} compact />
              </span>
              <span className="text-muted-foreground text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                (32 Tokens)
              </span>
            </div>
          }
        />
        <ValidatorDataCard
          className="md:row-start-2 row-start-6 h-[100px]"
          title="Lifetime BGT Directed"
          value={
            <div className="flex flex-row gap-1">
              <span className="text-2xl font-semibold">100</span>
              <Icons.bgt className="h-6 w-6 self-center" />
            </div>
          }
        />
      </div>
      <ValidatorPolData validator={validator} />
    </div>
  );
}
