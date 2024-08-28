import React from "react";
import Image from "next/image";
import {
  BGT_ABI,
  TransactionActionType,
  useBeraJs,
  useBgtUnstakedBalance,
  useUserActiveValidators,
  useUserValidators,
  useUserValidatorsSubgraph,
} from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { ActionButton, FormattedNumber, useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import BigNumber from "bignumber.js";
import { Address, parseUnits } from "viem";

import ValidatorInput from "~/components/validator-input";
import { DelegateEnum, ImageMapEnum } from "./types";

export const DelegateContent = ({
  validator,
  setIsValidatorDataLoading,
}: {
  validator?: Address;
  setIsValidatorDataLoading: (loading: boolean) => void;
}) => {
  const { isReady } = useBeraJs();

  const [amount, setAmount] = React.useState<string | undefined>(undefined);
  const { refresh } = useUserValidators();
  const { refresh: refreshUsers } = useUserValidatorsSubgraph();
  const { refresh: refreshActive } = useUserActiveValidators();

  const { data: bgtBalance, refresh: refreshBalance } = useBgtUnstakedBalance();

  const exceeding = BigNumber(amount ?? "0").gt(
    bgtBalance ? bgtBalance.toString() : "0",
  );
  const disabled = exceeding || !amount || amount === "" || amount === "0";

  const {
    write,
    isLoading: isDelegatingLoading,
    ModalPortal,
  } = useTxn({
    message: `Delegating ${Number(amount).toFixed(2)} BGT to Validator`,
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => {
      setIsValidatorDataLoading(true);
      setTimeout(() => {
        refresh();
        refreshUsers();
        refreshActive();
        refreshBalance();
        setIsValidatorDataLoading(false);
      }, 5000);
    },
  });
  return (
    <>
      {ModalPortal}
      <div className="mt-4 flex flex-col gap-3">
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
          showSearch={true}
          showDelegated={false}
          unselectable
        />

        {isReady && exceeding && (
          <Alert variant="destructive">
            This amount exceeds your total balance of{" "}
            <FormattedNumber value={bgtBalance ?? "0"} symbol="BGT" />
          </Alert>
        )}

        <ActionButton>
          <Button
            className="w-full"
            disabled={!validator || isDelegatingLoading || disabled}
            onClick={() =>
              write({
                address: bgtTokenAddress,
                abi: BGT_ABI,
                functionName: "queueBoost",
                params: [validator!, parseUnits(amount ?? "0", 18)],
              })
            }
          >
            Queue Boost
          </Button>
        </ActionButton>
      </div>
    </>
  );
};
