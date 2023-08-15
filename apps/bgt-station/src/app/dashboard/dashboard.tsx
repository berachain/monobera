"use client";

import { type Metadata } from "next";
import Image from "next/image";
import { usePollActiveValidators, type Validator } from "@bera/berajs";

import GlobalGaugeWeight from "../../components/global-gauge-weight";
import { Details } from "./components/details";
import { ValidatorsList } from "./components/validators-list";

export const metadata: Metadata = {
  title: "Dashboard | BGT Station | Berachain",
  description: "BGT Station",
};

export default function DashBoard() {
  const { useActiveValidators } = usePollActiveValidators();
  const validators: Validator[] = useActiveValidators();
  return (
    <div className="container flex w-full max-w-[1078px] flex-col gap-24 pb-24">
      <div className="flex flex-col items-center gap-1">
        <Image
          src="/bears/bee.png"
          alt="dashboard bee"
          width={164}
          height={168}
        />
        <div className="text-5xl font-bold leading-[48px] text-foreground">
          BGT Station
        </div>
        <div className="text-xl font-semibold leading-7 text-muted-foreground">
          A place for all your BGT
        </div>
        <Details />
      </div>

      <div>
        <div className="text-center text-5xl font-bold leading-[48px] text-foreground">
          🌎 Global gauge weight
        </div>
        <div className="mt-4 text-center text-xl font-semibold leading-7 text-muted-foreground">
          See what pools validators are incentivizing right now
        </div>
        <GlobalGaugeWeight />
      </div>

      <ValidatorsList
        validators={validators}
        title={"🔥 Top staked validators"}
      />

      <ValidatorsList
        validators={validators}
        title={"💰 Top paying validators"}
      />
    </div>
  );
}
