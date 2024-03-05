"use client";

import React, { useState } from "react";
import { HONEY_ROUTER_ABI } from "@bera/berajs";
import { honeyRouterAddress } from "@bera/config";
import {
  ApproveButton,
  ConnectButton,
  SSRSpinner,
  TokenInput,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { parseUnits } from "viem";

import { usePsm } from "~/hooks/usePsm";

export function SwapCard() {
  const [tabValue, setTabValue] = useState<"mint" | "burn">("mint");
  const {
    fee,
    isFeeLoading,
    payload,
    isReady,
    setSelectedFrom,
    isLoading,
    write,
    selectedFrom,
    selectedTo,
    fromAmount,
    setFromAmount,
    setToAmount,
    setIsTyping,
    toAmount,
    isMint,
    fromBalance,
    toBalance,
    setGivenIn,
    onSwitch,
    ModalPortal,
    honey,
    collateralList,
    needsApproval,
    exceedBalance,
    isTyping,
  } = usePsm();

  return (
    <div className="w-full">
      <Card className="relative z-10 m-auto block w-full max-w-[500px] bg-background shadow-2xl">
        {ModalPortal}
        <CardHeader className="pb-3">
          <CardTitle>
            <span>{isMint ? "Mint" : "Redeem"}</span>
            {isFeeLoading ? (
              <Skeleton className="absolute right-6 top-5 h-6 w-40" />
            ) : (
              <div className="absolute right-6 top-5 text-base font-medium text-muted-foreground">
                Static fee of {(Number(fee ?? 0) * 100).toFixed(2)}%
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={tabValue} value={tabValue} className="mb-3">
            <TabsList className="w-full">
              <TabsTrigger
                value={"mint"}
                className="flex-1 capitalize"
                onClick={() => {
                  setTabValue("mint");
                  if (!isMint) onSwitch();
                }}
              >
                Mint
              </TabsTrigger>
              <TabsTrigger
                value={"burn"}
                className="flex-1 capitalize"
                onClick={() => {
                  setTabValue("burn");
                  if (isMint) onSwitch();
                }}
              >
                Redeem
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="border-1 flex flex-col gap-6 border-border">
            <ul className="relative divide-y divide-border rounded-2xl border">
              <TokenInput
                selected={selectedFrom}
                selectedTokens={[selectedFrom, selectedTo]}
                onTokenSelection={setSelectedFrom}
                amount={fromAmount}
                balance={fromBalance?.formattedBalance}
                selectable={selectedFrom?.address !== honey?.address}
                customTokenList={collateralList}
                showExceeding
                setIsTyping={setIsTyping}
                setAmount={(amount) => {
                  setGivenIn(true);
                  setFromAmount(amount);
                }}
              />
              {(isLoading || isTyping) && (
                <SSRSpinner className="absolute -translate-y-[50%] left-[50%] -translate-x-[50%] bg-background border border-border rounded-md p-2" />
              )}
              <TokenInput
                selected={selectedTo}
                selectedTokens={[selectedFrom, selectedTo]}
                setIsTyping={setIsTyping}
                amount={toAmount}
                setAmount={(amount) => {
                  setGivenIn(false);
                  setToAmount(amount);
                }}
                selectable={selectedTo?.address !== honey?.address}
                customTokenList={collateralList}
                showExceeding={false}
                hideMax={true}
                balance={toBalance?.formattedBalance}
              />
            </ul>
            {!isReady ? (
              <ConnectButton className="w-full" />
            ) : needsApproval && !exceedBalance ? (
              <ApproveButton
                token={selectedFrom}
                spender={honeyRouterAddress}
                amount={parseUnits(
                  fromAmount ?? "0",
                  selectedFrom?.decimals ?? 18,
                )}
              />
            ) : (
              <Button
                disabled={
                  isLoading ||
                  !fromAmount ||
                  !toAmount ||
                  exceedBalance ||
                  isTyping
                }
                onClick={() => {
                  write({
                    address: honeyRouterAddress,
                    abi: HONEY_ROUTER_ABI,
                    functionName: isMint ? "mint" : "redeem",
                    params: payload,
                  });
                }}
              >
                {isMint ? "Mint" : "Redeem"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
