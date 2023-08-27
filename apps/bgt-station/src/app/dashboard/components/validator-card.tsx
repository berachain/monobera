"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  BeravaloperToEth,
  usePollGlobalValidatorBribes,
  type Validator,
} from "@bera/berajs";
import { formatter } from "@bera/berajs/src/utils";
import { IconList } from "@bera/shared-ui";
import { ValidatorIcon } from "@bera/shared-ui/src/validator-icon";
import { Button } from "@bera/ui/button";
import { formatUnits } from "viem";

import { formatCommission } from "~/utils/formatCommission";
import YellowCard from "~/components/yellow-card";
import { usePollPrices } from "~/hooks/usePollPrices";

export default function ValidatorCard(validator: { validator: Validator }) {
  const router = useRouter();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useValidatorvAPY, useValidatorTotalActiveBribeValue } =
    usePollGlobalValidatorBribes(prices);
  const bribeValue = useValidatorTotalActiveBribeValue(
    BeravaloperToEth(validator.validator.operatorAddress),
  );
  const vApy = useValidatorvAPY(
    BeravaloperToEth(validator.validator.operatorAddress),
  );
  const info = [
    {
      amount: `$${formatter.format(Number(bribeValue ?? 0))}`,
      text: "Bribe value",
    },
    {
      amount:
        formatter.format(
          Number(formatUnits(BigInt(validator.validator.tokens), 18)),
        ) + " BGT",
      text: "Voting power",
    },
    {
      amount:
        formatCommission(validator.validator.commission.commissionRates.rate) +
        "%",
      text: "Commission",
    },
    {
      amount: `${vApy?.toFixed(2) ?? 0}%`,
      text: "vAPY",
    },
  ];
  return (
    <YellowCard className="flex flex-1 flex-col gap-8 p-6">
      <div className="flex w-full gap-2">
        <ValidatorIcon
          address={BeravaloperToEth(validator.validator.operatorAddress)}
          className="h-8 w-8"
        />
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
          <YellowCard className="w-full gap-0 bg-muted px-4 py-2" key={index}>
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
        className="w-full border-border bg-muted text-foreground"
        variant="outline"
        onClick={() =>
          router.push(
            `/delegate?action=delegate&validator=${validator.validator.operatorAddress}`,
          )
        }
      >
        Delegate
      </Button>
    </YellowCard>
  );
}
