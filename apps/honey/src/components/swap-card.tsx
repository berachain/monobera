"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ConnectButton, TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { honey } from "~/config/tokens";
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
    toAmount,
    setToAmount,
    isMint,
    fromBalance,
    toBalance,
    fee,
    fee2,
    onSwitch,
    ModalPortal,
  } = usePsm();
  return (
    <>
      {showBear && (
        <Image
          src="/kingBear.png"
          className="relative z-0 m-auto mb-[-25px] w-[500px] self-center"
          alt="king"
          width={150}
          height={200}
        />
      )}
      <Card className="relative z-10 m-auto block max-w-[500px] bg-background">
        {ModalPortal}
        <CardHeader>
          <CardTitle className="center flex justify-between">
            <span>{isMint ? "Mint" : "Redeem"}</span>
            <span className="font-normal text-[#4D4D4D]">
              Static fee of 0.005%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={tabValue} value={tabValue} className="mb-6">
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
                🪙 Mint
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
              className="divide-y divide-border rounded-lg border"
            >
              <TokenInput
                selected={selectedFrom}
                selectedTokens={[selectedFrom, selectedTo]}
                onTokenSelection={setSelectedFrom}
                amount={fromAmount ?? 0}
                balance={fromBalance?.formattedBalance}
                selectable={selectedFrom.address !== honey.address}
                hidePrice
                setAmount={(amount) => {
                  setFromAmount(Number(amount));
                  setToAmount(Number(amount) * fee);
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
                  setToAmount(Number(amount));
                  setFromAmount(Number(amount) * fee2);
                }}
                selectable={selectedTo.address !== honey.address}
                hidePrice
                balance={toBalance?.formattedBalance}
                hideBalance
              />
            </ul>
            {/* fix to check if allowance > amount */}
            {allowance?.formattedAllowance === "0" ||
            Number(allowance?.formattedAllowance) < fromAmount ? (
              <ApproveTokenButton
                token={selectedFrom}
                spender={
                  process.env.NEXT_PUBLIC_ERC20_HONEY_ADDRESS as `0x{string}`
                }
              />
            ) : isConnected ? (
              isMint ? (
                <Button
                  disabled={toAmount === 0 || isLoading}
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
                  disabled={toAmount === 0 || isLoading}
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
              // <ConnectWalletDialog
              //   className="w-full bg-[#333333] text-primary-foreground hover:bg-[#333333] hover:text-primary-foreground"
              //   size="lg"
              // />
              <ConnectButton />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
