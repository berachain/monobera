"use client";

import { type Metadata } from "next";
import {
  usePollGlobalValidatorBribes,
  usePollPrices,
  type PoLValidator,
} from "@bera/berajs";

import GlobalGaugeWeightInfo from "~/components/global-gauge-weight-info";
import { Details } from "./components/details";
import { ValidatorsList } from "./components/validators-list";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { usePolValidators, isLoading } = usePollGlobalValidatorBribes(prices);
  const validators: PoLValidator[] = usePolValidators();
  const validatorSession = [
    {
      sortingAttr: "tokens",
      title: (
        <>
          🔥 Top{" "}
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Staked
          </span>{" "}
          Validators
        </>
      ),
      message: "Stake your BGT with the most popular validators",
      keyword: "Voting power",
    },
    {
      sortingAttr: "vApy",
      title: (
        <>
          💰 Top{" "}
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Paying
          </span>{" "}
          Validators
        </>
      ),
      message: "Stake your BGT with the most rewarding validators",
      keyword: "APY",
    },
  ];
  return (
    <div className="flex w-full flex-col gap-24">
      <div className="flex flex-col items-center gap-1">
        <div className="text-center text-5xl font-bold leading-[48px] text-foreground">
          🐝{" "}
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            BGT
          </span>{" "}
          Station
        </div>
        <div className="text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
          A place for all your BGT
        </div>
        <Details />
      </div>
      <div>
        <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
          🌎 Global{" "}
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Gauge
          </span>{" "}
          Weight
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
