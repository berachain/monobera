"use client";

import React from "react";
import Image from "next/image";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { Card } from "@bera/ui/card";

import ValidatorsTable from "./validators-table";

export default function Validators({ activeGauges }: { activeGauges: number }) {
  const { useActiveValidators } = usePollActiveValidators();
  const validators: Validator[] = useActiveValidators();
  const generalInfo = [
    {
      amount: validators.length,
      text: "Total validators",
    },
    {
      amount: "$100M",
      text: "In bribe rewards",
    },
    {
      amount: "34%",
      text: "Average staker APY",
    },
    {
      amount: `${activeGauges}`,
      text: "Active gauges",
    },
  ];

  console.log(validators);
  return (
    <div className="container mb-10 max-w-[1078px]">
      <div className="p-8 text-center">
        <Image
          className="mx-auto"
          src="/bears/validator-bear.png"
          alt="bera banner"
          width={449.32}
          height={174}
        />
        <div className="text-center text-3xl font-extrabold leading-[48px] text-foreground md:text-5xl">
          Validators
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        {generalInfo.map((info, index) => (
          <Card className="p-8 text-center" key={info.text + index}>
            <div className="text-2xl font-semibold leading-loose text-foreground">
              {info.amount}
            </div>
            <div className="text-sm font-medium leading-[14px] text-muted-foreground">
              {info.text}
            </div>
          </Card>
        ))}
      </div>
      <ValidatorsTable />
    </div>
  );
}
