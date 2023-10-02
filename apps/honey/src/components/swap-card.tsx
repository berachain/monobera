"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { ConnectButton } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { TokenInput } from "~/components/token-input";
import { ERC20_HONEY_ABI } from "~/hooks/abi";
import { usePsm } from "~/hooks/usePsm";
import { ApproveTokenButton } from "./approve-token-button";

export function SwapCard({ showBear = true }: { showBear?: boolean }) {
  const [tabValue, setTabValue] = useState<"mint" | "burn">("mint");
  const {
    payload,
    isConnected,
    setSelectedFrom,
    allowance,
    isLoading,
    write,
    selectedFrom,
    selectedTo,
    fromAmount,
    setFromAmount,
    setToAmount,
    toAmount,
    isMint,
    fromBalance,
    toBalance,
    setGivenIn,
    onSwitch,
    ModalPortal,
    honey,
    collateralList,
  } = usePsm();
  return (
    <div>
      {showBear && (
        <Image
          src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
          className="relative z-0 m-auto self-center"
          alt="king"
          width={300}
          height={60}
        />
      )}
      <Card className="relative z-10 m-auto block max-w-[500px] bg-background">
        {ModalPortal}
        <CardHeader className="pb-3">
          <CardTitle>
            <span>{isMint ? "Mint" : "Redeem"}</span>
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
                  if (!isMint) {
                    onSwitch();
                  }
                }}
              >
                🍯 Mint
              </TabsTrigger>
              <TabsTrigger
                value={"burn"}
                className="flex-1 capitalize"
                onClick={() => {
                  setTabValue("burn");
                  if (isMint) {
                    onSwitch();
                  }
                }}
              >
                🔥 Burn
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="border-1 flex flex-col gap-6 border-border">
            <ul
              role="list"
              className="divide-y divide-border rounded-2xl border"
            >
              <TokenInput
                selected={selectedFrom}
                selectedTokens={[selectedFrom, selectedTo]}
                onTokenSelection={setSelectedFrom}
                amount={fromAmount ?? 0}
                balance={fromBalance?.formattedBalance}
                selectable={selectedFrom?.address !== honey?.address}
                customTokenList={collateralList}
                hidePrice
                setAmount={(amount) => {
                  setGivenIn(true);
                  setFromAmount(Number(amount));
                }}
              />
              <div className="relative">
                <div
                  className="absolute inset-0 flex w-full items-center justify-center"
                  aria-hidden="true"
                >
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      if (isMint) {
                        setTabValue("burn");
                      } else {
                        setTabValue("mint");
                      }
                      onSwitch();
                    }}
                    className="z-10 inline-flex h-fit w-fit items-center rounded-full bg-background p-1 text-sm font-semibold sm:p-2"
                  >
                    <Icons.swap className="h-3 w-3 sm:h-6 sm:w-6" />
                  </Button>
                </div>
              </div>

              <TokenInput
                selected={selectedTo}
                selectedTokens={[selectedFrom, selectedTo]}
                amount={toAmount}
                setAmount={(amount) => {
                  setGivenIn(false);
                  setToAmount(Number(amount));
                }}
                selectable={selectedTo?.address !== honey?.address}
                customTokenList={collateralList}
                showExceeding={false}
                hidePrice
                hideMax={true}
                balance={toBalance?.formattedBalance}
              />
            </ul>
            {/* fix to check if allowance > amount */}
            {Number(allowance?.formattedAllowance) < fromAmount ? (
              <ApproveTokenButton
                token={selectedFrom}
                spender={
                  process.env.NEXT_PUBLIC_ERC20_HONEY_ADDRESS as `0x{string}`
                }
              />
            ) : isConnected ? (
              isMint ? (
                <Button
                  disabled={
                    fromAmount === 0 ||
                    toAmount === 0 ||
                    isLoading ||
                    !allowance
                  }
                  onClick={() => {
                    write({
                      address: process.env
                        .NEXT_PUBLIC_ERC20_HONEY_ADDRESS as `0x{string}`,
                      abi: ERC20_HONEY_ABI,
                      functionName: "mint",
                      params: payload,
                    });
                  }}
                >
                  Mint
                </Button>
              ) : (
                <Button
                  disabled={
                    fromAmount === 0 ||
                    toAmount === 0 ||
                    isLoading ||
                    !allowance
                  }
                  onClick={() => {
                    write({
                      address: process.env
                        .NEXT_PUBLIC_ERC20_HONEY_ADDRESS as `0x{string}`,
                      abi: ERC20_HONEY_ABI,
                      functionName: "redeem",
                      params: payload,
                    });
                  }}
                >
                  Redeem
                </Button>
              )
            ) : (
              <ConnectButton />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
