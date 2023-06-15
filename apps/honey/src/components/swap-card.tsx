"use client";

import React, { useEffect, useState } from "react";
import {
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useBeraJs,
  useLatestBlock,
  usePollAllowance,
  type Token,
  HONEY_PRECOMPILE_ABI,
  HONEY_PRECOMPILE_ADDRESS,
  usePollBalance,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { honey, stgUsd } from "../config/tokens";
import { ApproveTokenButton } from "./approve-token-button";
import ConnectWalletDialog from "./connect-wallet-dialog";
import SwapInput from "./token-input";
import { parseUnits } from "viem";
import { useTxn } from "~/hooks/usTxn";

export function SwapCard() {
  const [selectedTo, setSelectedTo] = useState<Token>(honey);

  const [selectedFrom, setSelectedFrom] = useState<Token>(stgUsd);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const isMint = selectedFrom.address === stgUsd.address;

  const {useBalance: useFromBalance} = usePollBalance({address: selectedFrom.address});

  const fromBalance = useFromBalance();

  const {useBalance: useToBalance} = usePollBalance({address: selectedTo.address});

  const toBalance = useToBalance();
  console.log(fromBalance);
  // eslint-disable-next-line
  const [payload, setPayload] = useState<any[]>([]);

  const { isConnected, account } = useBeraJs();

  const { useAllowance } = usePollAllowance({
    contract: ERC2MODULE_PRECOMPILE_ADDRESS,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();

  const fee = 1 - 0.005;
  const fee2 = 1 + 0.005;

  const {write, isLoading} = useTxn({
    message: isMint ? 'Mint Honey' : 'Redeem Honey'
  })
  useEffect(() => {
    if (isMint && account) {
      const payload = [account, {
        amount:  parseUnits(`${fromAmount}`, 18),
        denom: 'stgusdc'
      }];
      setPayload(payload);
    }
    if (!isMint && account) {
      const payload = [account, parseUnits(`${fromAmount}`, 18), 'stgusdc'];
      setPayload(payload);
    }
    // const deadline = block + 10000n;
    // const payload = [
    //   selectedFrom?.address,
    //   parseUnits(`${fromAmount ?? 0}`, selectedFrom?.decimals ?? 18),
    //   selectedTo?.address,
    //   parseUnits(`${toAmount ?? 0}`, selectedTo?.decimals ?? 18),
    //   deadline,
    // ];
  }, [isMint, account, fromAmount, toAmount]);

  console.log(allowance);
  console.log(payload)
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
          <SwapInput
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

          <SwapInput
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

          {false ? (
            <ApproveTokenButton
              token={selectedFrom}
              spender={ERC2MODULE_PRECOMPILE_ADDRESS}
            />
          ) : isConnected ? (
            isMint ? (
              <Button disabled={toAmount === 0 || isLoading}
              onClick={() =>{ write({
                address: HONEY_PRECOMPILE_ADDRESS,
                abi: HONEY_PRECOMPILE_ABI,
                functionName: 'mint',
                params: payload
              })}}
              >Mint</Button>
            ) : (
              <Button disabled={toAmount === 0 || isLoading}
              onClick={() =>{ write({
                address: HONEY_PRECOMPILE_ADDRESS,
                abi: HONEY_PRECOMPILE_ABI,
                functionName: 'redeem',
                params: payload
              })}}>Redeem</Button>
            )
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
