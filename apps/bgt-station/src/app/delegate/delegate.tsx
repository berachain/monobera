"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  cosmosvaloperToEth,
  useBeraConfig,
  usePollBgtBalance,
} from "@bera/berajs";
import { STAKING_PRECOMPILE_ABI } from "@bera/berajs/src/config";
import { useTxn } from "@bera/shared-ui";
import { get7daysLater } from "@bera/shared-ui/src/utils";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { type Address } from "wagmi";

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
  const { networkConfig } = useBeraConfig();

  const { write, isLoading: isDelegatingLoading } = useTxn({
    message: "delegate validator",
  });

  const { useBgtBalance } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();

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
          showDelegated={action !== DelegateEnum.DELEGATE}
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

        {Number(amount) > Number(bgtBalance) && (
          <Alert variant="destructive">
            This amount exceeds your total balance of {bgtBalance} BGT
          </Alert>
        )}

        {String(Number(amount) > Number(bgtBalance))}
        <Button
          disabled={
            !validator || // no validator selected
            !amount || // no amount entered
            isDelegatingLoading || // delegate action processing
            Number(amount) > Number(bgtBalance) // wrong amount
          }
          onClick={() => {
            switch (action) {
              case DelegateEnum.DELEGATE:
                write({
                  address: networkConfig.precompileAddresses
                    .stakingAddress as Address,
                  abi: STAKING_PRECOMPILE_ABI,
                  functionName: "delegate",
                  params: [cosmosvaloperToEth(validator), Number(amount)],
                });
                break;
              case DelegateEnum.REDELEGATE:
                // write(redelegateValidator, amount);
                break;
              case DelegateEnum.UNBOND:
                // write(validator, "0");
                break;
            }
          }}
        >
          Confirm
        </Button>
      </Card>
    </div>
  );
}
