import React from "react";
import Image from "next/image";
import { TransactionActionType, useBeraJs } from "@bera/berajs";
import { stakingAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { useTheme } from "next-themes";
import { Address, parseUnits } from "viem";

import ValidatorInput from "~/components/validator-input";
import { DelegateEnum, ImageMapEnum } from "./types";

export const DelegateContent = ({ validator }: { validator?: Address }) => {
  const { isConnected } = useBeraJs();
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  const [amount, setAmount] = React.useState<string | undefined>(undefined);
  const getExceeding = () => Number(amount) > Number(0);
  const getDisabled = () => Number(amount) > 0 || !amount || amount === "";

  const {
    write,
    isLoading: isDelegatingLoading,
    ModalPortal,
  } = useTxn({
    message: `Delegating ${Number(amount).toFixed(2)} BGT to Validator`,
    actionType: TransactionActionType.DELEGATE,
  });

  return (
    <div>
      {ModalPortal}
      <Card className="mt-4 flex flex-col gap-3 p-6">
        <div className="text-lg font-semibold capitalize leading-7 text-foreground">
          Delegate
        </div>
        <Image
          src={ImageMapEnum.DELEGATE.light}
          alt="bera banner"
          width={452}
          height={175}
          className="block w-full dark:hidden"
          priority
          loading="eager"
        />
        <Image
          src={ImageMapEnum.DELEGATE.dark}
          alt="bera banner"
          width={452}
          height={175}
          className="hidden w-full dark:block"
          priority
          loading="eager"
        />
        <ValidatorInput
          action={DelegateEnum.DELEGATE}
          amount={amount}
          onAmountChange={setAmount}
          validatorAddress={validator}
          showDelegated={false}
        />

        {getExceeding() && isConnected && (
          <Alert variant="destructive">
            This amount exceeds your total balance of 0 BGT
          </Alert>
        )}

        <ActionButton>
          <Button
            className="w-full"
            disabled={
              !validator ||
              isDelegatingLoading ||
              getDisabled() ||
              amount === "0"
            }
            onClick={() =>
              write({
                address: stakingAddress,
                abi: [] as any,
                functionName: "delegate",
                params: [validator, parseUnits(amount ?? "0", 18)],
              })
            }
          >
            Confirm
          </Button>
        </ActionButton>
      </Card>
    </div>
  );
};
