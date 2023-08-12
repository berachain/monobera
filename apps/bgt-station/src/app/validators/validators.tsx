"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@bera/ui/card";

import ValidatorsTable from "./validators-table";

export default function Validators() {
  const generalInfo = [
    {
      amount: "120",
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
      amount: "213",
      text: "Active gauges",
    },
  ];
  return (
    <div className="container">
      <div className="p-8 text-center">
        <Image
          className="mx-auto"
          src="/bears/validator-bear.png"
          alt="bera banner"
          width={449.32}
          height={174}
        />
        <div className="text-center text-5xl font-extrabold leading-[48px] text-foreground">
          Validators
        </div>
      </div>
      <div className="flex gap-8">
        {generalInfo.map((info, index) => (
          <Card className="flex-1 p-8 text-center" key={(info, index)}>
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
