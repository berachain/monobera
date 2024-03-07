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
  usePollPrices,
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
import { parseUnits } from "viem";
import { type Address } from "wagmi";

import ValidatorInput from "~/components/validator-input";
import { DelegateEnum, ImageMapEnum } from "./types";

export default function Incentivize({}: {}) {
  const { isConnected } = useBeraJs();
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  const router = useRouter();

  const { useBgtBalance, isLoading: isBalanceLoading } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();

  return (
    <div className="container mx-auto w-full max-w-[600px] pb-20">
      <Card className="mt-4 flex flex-col gap-3 p-6">
        <div className="text-lg font-semibold capitalize leading-7 text-foreground">
          Incentivize a Pool
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
            priority
            loading="eager"
          />
        ) : (
          <Skeleton className="h-[175px] w-full" />
        )}

        <ActionButton>Confirm</ActionButton>
      </Card>
    </div>
  );
}
