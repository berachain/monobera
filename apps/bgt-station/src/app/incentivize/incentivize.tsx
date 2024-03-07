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
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
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
  const [poolAddress, setPoolAddress] = React.useState<string | undefined>(
    undefined,
  );

  const { useBgtBalance, isLoading: isBalanceLoading } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();

  return (
    <div className="container mx-auto w-full max-w-[600px] pb-20">
      <Card className="sm:w-[480px mx-6 w-full items-center bg-background sm:mx-0">
        <CardHeader>
          <CardTitle className="center flex flex-col justify-between font-bold">
            Incentivize a pool
            <div className="text-md flex py-2 font-normal text-muted-foreground">
              Please select the address
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-md flex py-2 font-normal text-foreground">
            Search/Enter Pool Address
          </div>
          <div className="leading-tigh text-sm font-semibold">
            <Input
              type="text"
              placeholder="0x0000...0000"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPoolAddress(e.target.value)
              }
              value={poolAddress}
            />
          </div>
        </CardContent>
        <ActionButton>Incentivize</ActionButton>
      </Card>
    </div>
  );
}
