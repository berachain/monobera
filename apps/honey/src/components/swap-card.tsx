"use client";

import React from "react";
import { ConnectButton, TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { ERC20_HONEY_ABI } from "~/hooks/abi";
import { usePsm } from "~/hooks/usePsm";
import { ApproveTokenButton } from "./approve-token-button";

export function SwapCard() {
  const {
    payload,
    isConnected,
    setSelectedFrom,
    allowance,
    isLoading,
    write,
    selectedFrom,
    selectedTo,
    setSelectedTo,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    isMint,
    fromBalance,
    toBalance,
    fee,
    fee2,
  } = usePsm({});

  console.log("allowance", allowance?.formattedAllowance);
  console.log("payload", payload);
  return (
    <Card className="w-[500px] bg-background/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="center flex justify-between">
          <span>Mint</span>
          <span className="font-normal text-[#4D4D4D]">
            Static fee of 0.005%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4">
          <TokenInput
            selected={selectedFrom}
            selectedTokens={[selectedFrom, selectedTo]}
            onTokenSelection={setSelectedFrom}
            amount={fromAmount ?? 0}
            balance={fromBalance?.formattedBalance}
            selectable={false}
            hidePrice
            setAmount={(amount) => {
              setFromAmount(Number(amount));
              setToAmount(Number(amount) * fee);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-full hover:bg-transparent"
            onClick={() => {
              setSelectedFrom(selectedTo);
              setSelectedTo(selectedFrom);
            }}
          >
            <Icons.swap className="h-8 w-8" />
          </Button>

          <TokenInput
            selected={selectedTo}
            selectedTokens={[selectedFrom, selectedTo]}
            amount={toAmount}
            setAmount={(amount) => {
              setToAmount(Number(amount));
              setFromAmount(Number(amount) * fee2);
            }}
            selectable={false}
            hidePrice
            balance={toBalance?.formattedBalance}
          />

          {/* fix to check if allowance > amount */}
          {allowance?.formattedAllowance === "0" ||
          Number(allowance?.formattedAllowance) < fromAmount ? (
            <ApproveTokenButton
              token={selectedFrom}
              spender={"0x7B44CdD81a8a25EFc1842AC2A2546C3B6e6A3fE2"}
            />
          ) : isConnected ? (
            isMint ? (
              <Button
                disabled={toAmount === 0 || isLoading}
                onClick={() => {
                  write({
                    address: "0x7B44CdD81a8a25EFc1842AC2A2546C3B6e6A3fE2",
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
                    address: "0x7B44CdD81a8a25EFc1842AC2A2546C3B6e6A3fE2",
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
  );
}
