"use client";

import React, { useEffect, useState } from "react";
import {
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useBeraJs,
  useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollPools,
  usePollPreviewSwapExact,
  type Pool,
  type Token,
  type WeightedToken,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { parseUnits } from "viem";

import { ApproveTokenButton } from "./approve-token-button";
import ConnectWalletDialog from "./connect-wallet-dialog";
import PreviewDialog from "./preview-dialog";
import SwapInput from "./token-input";

enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

export function SwapCard() {
  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [selectedPool, setSelectedPool] = useState<Pool | undefined>(undefined);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  // eslint-disable-next-line
  const [payload, setPayload] = useState<any[]>([]);

  const { isConnected } = useBeraJs();

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    undefined,
  );

  const { useAllowance } = usePollAllowance({
    contract: ERC2MODULE_PRECOMPILE_ADDRESS,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();
  const { usePreviewSwapExact } = usePollPreviewSwapExact(
    selectedPool?.address ?? "",
    swapKind === SwapKind.GIVEN_IN ? fromAmount : toAmount,
    swapKind === SwapKind.GIVEN_IN ? selectedFrom : selectedTo,
    swapKind === SwapKind.GIVEN_IN ? selectedTo : selectedFrom,
  );

  useEffect(() => {
    const deadline = block + 10000n;
    const payload = [
      swapKind,
      selectedPool?.address,
      selectedFrom?.address,
      parseUnits(`${fromAmount ?? 0}`, selectedFrom?.decimals ?? 18),
      selectedTo?.address,
      parseUnits(`${toAmount ?? 0}`, selectedTo?.decimals ?? 18),
      deadline,
    ];
    setPayload(payload);
  }, [block, swapKind, fromAmount, selectedFrom, toAmount, selectedTo]);

  return (
    <Card className="w-[500px] bg-background/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="center flex justify-between">
          <span>Mint</span>
          <span className="font-normal text-[#4D4D4D]">Static fee of 6.9%</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4">
          <SwapInput
            selected={selectedFrom}
            selectedTokens={[selectedFrom, selectedTo]}
            onTokenSelection={setSelectedFrom}
            amount={fromAmount ?? 0}
            setAmount={(amount) => {
              setSwapKind(SwapKind.GIVEN_IN);
              setFromAmount(Number(amount));
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

          <SwapInput
            selected={selectedTo}
            selectedTokens={[selectedFrom, selectedTo]}
            amount={toAmount}
            setAmount={(amount) => {
              setSwapKind(SwapKind.GIVEN_OUT);
              setToAmount(Number(amount));
            }}
            hideBalance
            selectable={false}
          />

          {(Number(allowance?.formattedAllowance) ?? 0) < fromAmount ? (
            <ApproveTokenButton
              token={selectedFrom}
              spender={ERC2MODULE_PRECOMPILE_ADDRESS}
            />
          ) : isConnected ? (
            <PreviewDialog
              toToken={selectedTo}
              fromToken={selectedFrom}
              fromAmount={fromAmount ?? 0}
              toAmount={0}
              payload={payload}
            />
          ) : (
            <ConnectWalletDialog
              className="w-full bg-[#333333] text-primary-foreground hover:bg-[#333333] hover:text-primary-foreground"
              size="lg"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
