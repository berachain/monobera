import React from "react";
import Image from "next/image";
import {
  BGT_ABI,
  TransactionActionType,
  UserValidator,
  useBeraJs,
  useUserActiveValidators,
} from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { useTheme } from "next-themes";
import { parseUnits } from "viem";

import ValidatorInput from "~/components/validator-input";
import { DelegateEnum, ImageMapEnum } from "../types";

export const UnDelegateContent = ({
  userValidator,
}: {
  userValidator: UserValidator;
}) => {
  const { isConnected } = useBeraJs();
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;

  const [amount, setAmount] = React.useState<string | undefined>(undefined);
  const { data, refresh } = useUserActiveValidators();

  const {
    write: unbondWrite,
    isLoading: isUnbondLoading,
    ModalPortal: UnBondModalPortal,
  } = useTxn({
    message: "Unbonding from Validator",
    actionType: TransactionActionType.UNBONDING,
    onSuccess: () => {
      refresh();
    },
  });

  const selectedValidator = data?.find(
    (v) => v.id.toLowerCase() === userValidator.id.toLowerCase(),
  );

  const bgtDelegated = selectedValidator ? selectedValidator.userStaked : "0";

  return (
    <div>
      {UnBondModalPortal}
      <div className="flex flex-col gap-3">
        <div className="text-lg font-semibold capitalize leading-7 text-foreground">
          Unbond
        </div>
        <Image
          src={ImageMapEnum.UNBOND.light}
          alt="bera banner"
          width={452}
          height={175}
          className="block w-full dark:hidden"
          priority
          loading="eager"
        />
        <Image
          src={ImageMapEnum.UNBOND.dark}
          alt="bera banner"
          width={452}
          height={175}
          className="hidden w-full dark:block"
          priority
          loading="eager"
        />
        <ValidatorInput
          action={DelegateEnum.UNBOND}
          amount={amount}
          onAmountChange={setAmount}
          validatorAddress={userValidator.id}
          showDelegated
          showSearch={false}
          unselectable
        />

        {isConnected && Number(amount) > Number(bgtDelegated) && (
          <Alert variant="destructive">Insufficient BGT delegated</Alert>
        )}

        <ActionButton>
          <Button
            className="w-full"
            disabled={
              !userValidator || // no validator selected
              isUnbondLoading || // unbond action processing
              Number(amount) > Number(bgtDelegated) ||
              !amount ||
              amount === ""
            }
            onClick={() =>
              unbondWrite({
                address: bgtTokenAddress,
                abi: BGT_ABI,
                functionName: "dropBoost",
                params: [userValidator.id, parseUnits(amount ?? "0", 18)],
              })
            }
          >
            Unbond
          </Button>
        </ActionButton>
      </div>
    </div>
  );
};
