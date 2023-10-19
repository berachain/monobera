"use client";

import { type Metadata } from "next";
import Image from "next/image";
import {
  usePollGlobalValidatorBribes,
  usePollPrices,
  type PoLValidator,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";

import { Details } from "./components/details";
import GlobalGaugeWeightInfo from "./components/global-gauge-weight";
import { ValidatorsList } from "./components/validators-list";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard({
  avgValidatorUptime,
}: {
  avgValidatorUptime: string;
}) {
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { usePolValidators, isLoading } = usePollGlobalValidatorBribes(prices);
  const validators: PoLValidator[] = usePolValidators();
  const validatorSession = [
    {
      sortingAttr: "tokens",
      title: "🔥 Top Staked Validators",
      message: "Stake your BGT with the most popular validators",
      keyword: "Voting power",
    },
    {
      sortingAttr: "vApy",
      title: "💰 Top Paying Validators",
      message: "Stake your BGT with the most rewarding validators",
      keyword: "Bribe value",
    },
  ];
  return (
    <div className="container flex w-full max-w-[1200px] flex-col gap-24 pb-24">
      <div className="flex flex-col items-center gap-1">
        <Image
          src={`${cloudinaryUrl}/bears/wy6muyafchlo5wjidall`}
          alt="dashboard bee"
          width={164}
          height={168}
        />
        <div className="text-5xl font-bold leading-[48px] text-foreground">
          BGT Station
        </div>
        <div className="text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
          A place for all your BGT
        </div>
        <Details avgValidatorUptime={avgValidatorUptime} />
      </div>
      <div>
        <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
          🌎 Global Gauge Weight
        </div>
        <div className="mt-4 text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
          See what pools & addresses validators are incentivizing right now
        </div>
        <GlobalGaugeWeightInfo />
      </div>
      {validatorSession.map((info) => (
        <ValidatorsList
          key={info.sortingAttr + info.title}
          validators={validators}
          isLoading={isLoading}
          {...info}
        />
      ))}
    </div>
  );
}
