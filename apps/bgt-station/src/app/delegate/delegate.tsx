"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  TransactionActionType,
  useBeraConfig,
  useBeraJs,
  usePollAccountDelegations,
  usePollActiveValidators,
  usePollBgtBalance,
  usePollDelegatorValidators,
  usePollGlobalValidatorBribes,
} from "@bera/berajs";
import { STAKING_PRECOMPILE_ABI } from "@bera/berajs/src/config";
import { ActionButton, useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useTheme } from "next-themes";
import { parseUnits, type Address } from "viem";

import ValidatorInput from "~/components/validator-input";
import { DelegateEnum, ImageMapEnum } from "./types";
import { UnstakeDialog } from "./unstake-dialog";
import { UnstakeInfoBanner } from "./unstake-info-banner";

export default function Delegate({
  action,
  validator,
  redelegateValidator,
}: {
  action: DelegateEnum;
  validator: Address;
  redelegateValidator: string;
}) {
  const { isConnected } = useBeraJs();
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  const router = useRouter();
  const [amount, setAmount] = React.useState<string | undefined>(undefined);
  const [activeAction, setActiveAction] = React.useState<DelegateEnum>(action);
  const { networkConfig } = useBeraConfig();

  const { useSelectedAccountDelegation } = usePollAccountDelegations(validator);
  usePollActiveValidators();
  usePollDelegatorValidators();
  const prices = undefined;
  const { useDelegatorPolValidators } = usePollGlobalValidatorBribes(prices);
  const { useDelegatorValidators } = usePollDelegatorValidators();
  const delegatedValidators = useDelegatorValidators();
  const _ = useDelegatorPolValidators(
    delegatedValidators?.map((d: any) => d.operatorAddr),
  );
  const bgtDelegated = useSelectedAccountDelegation();

  const isBadRedelegate =
    validator === redelegateValidator &&
    (validator as string) !== undefined &&
    (redelegateValidator as string) !== undefined;
  const getExceeding = () => {
    if (activeAction === DelegateEnum.DELEGATE) {
      return Number(amount) > Number(bgtBalance);
    }
    if (
      activeAction === DelegateEnum.REDELEGATE ||
      activeAction === DelegateEnum.UNBOND
    ) {
      return Number(amount) > Number(bgtDelegated);
    }
  };

  const getDisabled = () => {
    if (activeAction === DelegateEnum.DELEGATE) {
      return Number(amount) > Number(bgtBalance) || !amount || amount === "";
    }
    if (activeAction === DelegateEnum.REDELEGATE) {
      return (
        Number(amount) > Number(bgtDelegated) ||
        !amount ||
        amount === "" ||
        !redelegateValidator
      );
    }
    if (activeAction === DelegateEnum.UNBOND) {
      return Number(amount) > Number(bgtDelegated) || !amount || amount === "";
    }
  };
  const {
    write,
    isLoading: isDelegatingLoading,
    ModalPortal,
  } = useTxn({
    message: `Delegating ${Number(amount).toFixed(2)} BGT to Validator`,
    actionType: TransactionActionType.DELEGATE,
  });

  const {
    write: unbondWrite,
    isLoading: isUnbondLoading,
    ModalPortal: UnBondModalPortal,
  } = useTxn({
    message: "Unbonding from Validator",
    actionType: TransactionActionType.UNBONDING,
  });

  const {
    write: unbondRedelegate,
    isLoading: isRedelegateLoading,
    ModalPortal: RedelegateModalPortal,
  } = useTxn({
    message: "Redelegating BGT",
    actionType: TransactionActionType.REDELEGATE,
    onError: (e) => {
      if (
        e?.message.includes(
          "redelegation to this validator already in progress",
        )
      )
        setRedelegatePending(true);
    },
  });

  const [redelegatePending, setRedelegatePending] =
    React.useState<boolean>(false);

  useEffect(() => {
    setRedelegatePending(false);
  }, [redelegateValidator]);

  const { useBgtBalance, isLoading: isBalanceLoading } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();

  return (
    <div className="w-full max-w-[600px] sm:container sm:px-0 md:px-8 lg:w-[600px]">
      <Tabs
        value={activeAction}
        onValueChange={(value) => setActiveAction(value as DelegateEnum)}
      >
        <TabsList className="w-full">
          {Object.values(DelegateEnum).map((status) => (
            <TabsTrigger
              value={status}
              key={status}
              className="flex-1 capitalize"
              onClick={() =>
                router.push(
                  validator
                    ? `/delegate?action=${status}&validator=${validator}`
                    : `/delegate?action=${status}`,
                )
              }
            >
              {status.replaceAll("-", " ")}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {ModalPortal}
      {UnBondModalPortal}
      {RedelegateModalPortal}
      <Card className="mt-4 flex flex-col gap-3 p-6">
        <div className="text-lg font-semibold capitalize leading-7 text-foreground">
          {action}
        </div>
        {t ? (
          <Image
            src={
              ImageMapEnum[action.toUpperCase() as keyof typeof ImageMapEnum][
                t as "light" | "dark"
              ]
            }
            alt="bera banner"
            width={452}
            height={175}
            className="w-full"
            priority
            loading="eager"
          />
        ) : (
          <Skeleton className="h-[175px] w-full" />
        )}
        <ValidatorInput
          action={action}
          amount={amount}
          onAmountChange={setAmount}
          validatorAddress={validator}
          showDelegated={action !== DelegateEnum.DELEGATE}
        />
        {action === DelegateEnum.REDELEGATE && (
          <>
            <Icons.chevronsDown className="relative mx-auto h-6 w-6 text-border" />
            <ValidatorInput
              action={action}
              amount={amount}
              onAmountChange={setAmount}
              disabled={true}
              validatorAddress={validator}
              redelegate
              redelegateValidatorAddress={redelegateValidator}
              filter={[validator]}
            />
          </>
        )}
        {getExceeding() && isConnected && !isBalanceLoading && (
          <Alert variant="destructive">
            {activeAction === DelegateEnum.DELEGATE
              ? `This amount exceeds your total balance of ${bgtBalance} BGT`
              : "Insufficient BGT delegated"}
          </Alert>
        )}
        {isBadRedelegate && (
          <Alert variant="destructive">
            Cannot redelegate to the same validator
          </Alert>
        )}
        {redelegatePending && (
          <Alert variant="destructive">
            Redelegation to this validator already in progress; first
            redelegation must complete before next redelegation can be initiated
          </Alert>
        )}
        <ActionButton>
          <Button
            className="w-full"
            disabled={
              !validator || // no validator selected
              isDelegatingLoading || // delegate action processing
              isUnbondLoading || // unbond action processing
              isRedelegateLoading || // redelegate action processing
              getDisabled() ||
              isBadRedelegate ||
              amount === "0"
            }
            onClick={() => {
              switch (action) {
                case DelegateEnum.DELEGATE:
                  write({
                    address: networkConfig.precompileAddresses
                      .stakingAddress as Address,
                    abi: STAKING_PRECOMPILE_ABI,
                    functionName: "delegate",
                    params: [validator, parseUnits(amount ?? "0", 18)],
                  });
                  break;
                case DelegateEnum.REDELEGATE:
                  unbondRedelegate({
                    address: networkConfig.precompileAddresses
                      .stakingAddress as Address,
                    abi: STAKING_PRECOMPILE_ABI,
                    functionName: "beginRedelegate",
                    params: [
                      validator,
                      redelegateValidator,
                      parseUnits(amount ?? "0", 18),
                    ],
                  });
                  // write(redelegateValidator, amount);
                  break;
                case DelegateEnum.UNBOND:
                  unbondWrite({
                    address: networkConfig.precompileAddresses
                      .stakingAddress as Address,
                    abi: STAKING_PRECOMPILE_ABI,
                    functionName: "undelegate",
                    params: [validator, parseUnits(amount ?? "0", 18)],
                  });
                  break;
              }
            }}
          >
            Confirm
          </Button>
        </ActionButton>
      </Card>
      {action === DelegateEnum.UNBOND && <UnstakeInfoBanner />}
      {action === DelegateEnum.UNBOND && (
        <UnstakeDialog setActiveAction={setActiveAction} />
      )}
    </div>
  );
}
