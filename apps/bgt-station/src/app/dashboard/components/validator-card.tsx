"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { type Validator } from "@bera/berajs";
import { IconList } from "@bera/shared-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";

import YellowCard from "~/components/yellow-card";

export default function ValidatorCard(validator: { validator: Validator }) {
  const router = useRouter();

  const info = [
    {
      amount: "$69K",
      text: "Bribe value",
    },
    {
      amount: "$100M",
      text: "Voting power",
    },
    {
      amount: "34%",
      text: "Commission",
    },
    {
      amount: "213%",
      text: "vAPY",
    },
  ];
  return (
    <YellowCard className="flex flex-1 flex-col gap-8 p-6">
      <div className="flex w-full gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>
            {validator.validator.description.moniker}
          </AvatarFallback>
        </Avatar>
        <div className="text-lg font-semibold leading-7 text-foreground">
          {validator.validator.description.moniker}
        </div>
      </div>
      {/* this is so hard coded!! i hate myself */}
      <div className="w-full">
        <IconList
          iconList={[
            "/icons/eth-icons.svg",
            "/icons/atom-icons.svg",
            "/icons/usdc-icons.svg",
            "/icons/usdt-icons.svg",
            "/icons/btc-icons.svg",
            "/icons/honey-icons.svg",
            "/icons/bera-icons.svg",
          ]}
        />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        {" "}
        {info.map((value, index) => (
          <YellowCard className="w-full gap-0 px-4 py-2" key={index}>
            <div className="w-full text-xs font-medium leading-tight text-muted-foreground">
              {value.text}
            </div>
            <div className="w-full text-base font-medium leading-normal text-foreground">
              {value.amount}
            </div>
          </YellowCard>
        ))}
      </div>

      <Button
        className="w-full"
        variant="secondary"
        onClick={() =>
          router.push(
            `/delegate?action=delegate&&validator=${validator.validator.operatorAddress}`,
          )
        }
      >
        Delegate
      </Button>
    </YellowCard>
  );
}
