import React from "react";
import Image from "next/image";
import {
  BGT_ABI,
  SubgraphUserValidator,
  TransactionActionType,
  UserValidator,
  useBeraJs,
  useUserActiveValidators,
  useUserValidatorsSubgraph,
} from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";
import { Address, parseUnits } from "viem";

import ValidatorInput from "~/components/validator-input";
import { DelegateEnum, ImageMapEnum } from "./types";

export const UnDelegateContent = ({
  userValidator,
  setIsValidatorDataLoading,
}: {
  userValidator: SubgraphUserValidator;
  setIsValidatorDataLoading: (loading: boolean) => void;
}) => {
  const { isConnected } = useBeraJs();
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;

  const [amount, setAmount] = React.useState<string | undefined>(undefined);
  const { data, refresh } = useUserValidatorsSubgraph();

  const {
    write: unbondWrite,
    isLoading: isUnbondLoading,
    ModalPortal: UnBondModalPortal,
  } = useTxn({
    message: "Unbonding from Validator",
    actionType: TransactionActionType.UNBONDING,
    onSuccess: () => {
      setIsValidatorDataLoading(true);
      setTimeout(() => {
        refresh();
        setIsValidatorDataLoading(false);
      }, 5000);
    },
  });

  const selectedValidator = data?.find(
    (v) => v.coinbase.toLowerCase() === userValidator.coinbase.toLowerCase(),
  );

  const bgtDelegated = selectedValidator
    ? selectedValidator.amountDeposited
    : "0";

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
          validatorAddress={userValidator.coinbase as Address}
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
                params: [
                  userValidator.coinbase as Address,
                  parseUnits(amount ?? "0", 18),
                ],
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
