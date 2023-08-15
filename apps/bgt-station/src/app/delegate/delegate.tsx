"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { get7daysLater } from "@bera/shared-ui/src/utils";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import ValidatorInput from "~/components/validator-input";
import { DelegateEnum, ImageMapEnum } from "./types";

export default function Delegate({
  action,
  validator,
  redelegateValidator,
}: {
  action: DelegateEnum;
  validator: string;
  redelegateValidator: string;
}) {
  const router = useRouter();
  const [amount, setAmount] = React.useState("0.0");
  return (
    <div className="container mx-auto w-full max-w-[500px] pb-20">
      <Tabs defaultValue={action}>
        <TabsList className="w-full">
          {Object.values(DelegateEnum).map((status) => (
            <TabsTrigger
              value={status}
              key={status}
              className="flex-1 capitalize"
              onClick={() =>
                router.push(
                  validator
                    ? `/delegate?action=${status}&&validator=${validator}`
                    : `/delegate?action=${status}`,
                )
              }
            >
              {status.replaceAll("-", " ")}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Card className="mt-4 flex flex-col gap-3 p-6">
        <div className="text-lg font-semibold capitalize leading-7 text-foreground">
          {action}
        </div>
        <Image
          src={ImageMapEnum[action.toUpperCase() as keyof typeof ImageMapEnum]}
          alt="bera banner"
          width={452}
          height={175}
        />

        <ValidatorInput
          action={action}
          amount={amount}
          onAmountChange={setAmount}
          validatorAddress={validator}
        />

        {action === DelegateEnum.REDELEGATE && (
          <>
            <Icons.chevronsDown className=" relative mx-auto h-6 w-6 text-primary-foreground" />
            <ValidatorInput
              action={action}
              amount={amount}
              onAmountChange={setAmount}
              validatorAddress={validator}
              redelegate
              redelegateValidatorAddress={redelegateValidator}
            />
          </>
        )}

        <div className="rounded-18 bg-muted p-3 text-muted-foreground">
          <div className="flex h-8 items-center justify-between">
            <div>Total</div>
            <div className="text-foreground">{amount} BGT</div>
          </div>

          {action !== DelegateEnum.DELEGATE && (
            <div className="flex h-8 items-center justify-between">
              <div>
                {action === DelegateEnum.REDELEGATE
                  ? "Cooldown"
                  : "Unbonding date"}
              </div>
              <div className="text-foreground">{get7daysLater()}</div>
            </div>
          )}
        </div>

        <Button>Confirm</Button>
      </Card>
    </div>
  );
}
