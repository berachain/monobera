"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cloudinaryUrl, erc20HoneyAddress } from "@bera/config";
import { ApproveButton, ConnectButton } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import BigNumber from "bignumber.js";
import { parseUnits } from "viem";

import { TokenInput } from "~/components/token-input";
import { ERC20_HONEY_ABI } from "~/hooks/abi";
import { usePsm } from "~/hooks/usePsm";

export function SwapCard({ showBear = true }: { showBear?: boolean }) {
  const [tabValue, setTabValue] = useState<"mint" | "burn">("mint");
  const {
    fee,
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
    <div className="w-full">
      {showBear && (
        <Image
          src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
          className="relative z-0 m-auto self-center"
          alt="king"
          width={300}
          height={60}
        />
      )}
      <Card className="relative z-10 m-auto block w-full max-w-[500px] bg-background shadow-2xl">
        {ModalPortal}
        <CardHeader className="pb-3">
          <CardTitle>
            <span>{isMint ? "Mint" : "Redeem"}</span>
            <div className="absolute right-6 top-5 text-base font-medium text-muted-foreground">
              Static fee of {(Number(fee ?? 0) * 100).toFixed(2)}%
            </div>
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
                Mint
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
                Redeem
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
                amount={fromAmount}
                balance={fromBalance?.formattedBalance}
                selectable={selectedFrom?.address !== honey?.address}
                customTokenList={collateralList}
                hidePrice
                setAmount={(amount) => {
                  setGivenIn(true);
                  setFromAmount(amount);
                }}
              />
              <TokenInput
                selected={selectedTo}
                selectedTokens={[selectedFrom, selectedTo]}
                amount={toAmount}
                setAmount={(amount) => {
                  setGivenIn(false);
                  setToAmount(amount);
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
            {BigNumber(allowance?.formattedAllowance).lt(fromAmount ?? "0") ? (
              <ApproveButton
                token={selectedFrom}
                spender={erc20HoneyAddress}
                amount={parseUnits(
                  fromAmount as `${number}`,
                  selectedFrom?.decimals ?? 18,
                )}
              />
            ) : isConnected ? (
              isMint ? (
                <Button
                  disabled={
                    Number(fromAmount) === 0 ||
                    Number(toAmount) === 0 ||
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
                    Number(fromAmount) === 0 ||
                    Number(toAmount) === 0 ||
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
