"use client";

import { useMemo } from "react";
import { type Metadata } from "next";
import Image from "next/image";
import { usePollGlobalValidatorBribes, type PoLValidator } from "@bera/berajs";

import { cloudinaryUrl } from "~/config";
import { usePollPrices } from "~/hooks/usePollPrices";
import { Details } from "./components/details";
import GlobalGaugeWeightInfo from "./components/global-gauge-weight";
import { ValidatorsList } from "./components/validators-list";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { usePolValidators, isLoading } = usePollGlobalValidatorBribes(prices);
  const validators: PoLValidator[] = usePolValidators();
  const topStakeValidators = useMemo(
    () =>
      validators
        ? validators
            .sort(
              (a: PoLValidator, b: PoLValidator) =>
                Number(b.tokens) - Number(a.tokens),
            )
            .slice(0, validators.length > 6 ? 6 : validators.length)
        : [],
    [validators],
  );

  const topPayingValidators = useMemo(
    () =>
      validators
        ? validators
            .sort((a: PoLValidator, b: PoLValidator) => b.vApy - a.vApy)
            .slice(0, validators.length > 6 ? 6 : validators.length)
        : [],
    [validators],
  );

  return (
    <div className="container flex w-full max-w-[1078px] flex-col gap-24 pb-24">
      <div className="flex flex-col items-center gap-1">
        <Image
          src={`${cloudinaryUrl}/bears/wy6muyafchlo5wjidall`}
          alt="dashboard bee"
          width={164}
          height={168}
        />
        <div className="text-5xl font-bold leading-[48px] text-foreground">
          🐝GT Station
        </div>
        <div className="text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
          A place for all your BGT
        </div>
        <Details />
      </div>

      <div>
        <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
          🌎 Global gauge weight
        </div>
        <div className="mt-4 text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
          See what pools validators are incentivizing right now
        </div>
        <GlobalGaugeWeightInfo />
      </div>

      <ValidatorsList
        validators={topStakeValidators}
        title={"🔥 Top staked validators"}
        message={"Stake your BGT with the most popular validators"}
        isLoading={isLoading}
      />

      <ValidatorsList
        validators={topPayingValidators}
        title={"💰 Top paying validators"}
        message={
          "Stake your BGT with the best validators to maximize your rewards"
        }
        isLoading={isLoading}
      />
    </div>
  );
}
