"use client";

import React from "react";
import {
  useBeraJs,
  usePollAssetWalletBalance,
  useSelectedAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";
import { Progress } from "@bera/ui/progress";

import SelectToken from "./select-token";

type Props = {
  selected: Token | undefined;
  selectedTokens?: (Token | undefined)[];
  amount: number;
  balance?: number;
  hideBalance?: boolean;
  hidePrice?: boolean;
  selectable?: boolean;
  weight?: number;
  disabled?: boolean;
  onTokenSelection?: (token: Token) => void;
  setAmount?: (amount: number) => void;
};

export default function SwapInput({
  selected,
  selectedTokens,
  amount,
  balance = undefined,
  hideBalance = false,
  hidePrice = false,
  selectable = true,
  weight = undefined,
  disabled = false,
  onTokenSelection = undefined,
  setAmount = undefined,
}: Props) {
  const [focused, setFocused] = React.useState(false);
  usePollAssetWalletBalance();
  let tokenBalance = Number(
    useSelectedAssetWalletBalance(selected?.address ?? "")?.formattedBalance ??
      "0",
  );
  if (balance !== undefined) {
    tokenBalance = balance;
  }
  const { account = undefined } = useBeraJs();

  const exceeding = amount > tokenBalance;
  const progress = tokenBalance && ((amount / tokenBalance) * 100) | 0;
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap rounded-lg border border-input bg-[#5B5B5B] p-3 pr-6",
        focused && "border-border",
      )}
    >
      <div className="flex w-full flex-row items-center justify-between">
        <SelectToken
          token={selected}
          onTokenSelection={onTokenSelection}
          selectedTokens={selectedTokens}
          selectable={selectable}
          weight={weight}
        />
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="0.0"
          disabled={disabled}
          className="w-100 grow border-0 bg-[#5B5B5B] p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={amount > 0 ? amount : ""}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          onChange={(e) => {
            setAmount && setAmount(Number(e.target.value));
          }}
        />
      </div>
      {account && selected ? (
        <div className="w-full pl-4">
          {hideBalance ? null : (
            <div className="flex items-center justify-between">
              <p>
                <Button
                  variant="link"
                  className="text-md text-default h-8 p-0"
                  onClick={() => setAmount && setAmount(tokenBalance || 0)}
                >
                  Balance: {tokenBalance}
                </Button>
              </p>
              {!hidePrice && <p>${tokenBalance && tokenBalance * 0.69}</p>}
            </div>
          )}
          {!hideBalance && amount !== 0 ? (
            <Progress
              value={exceeding ? 100 : progress}
              className={cn("h-2", exceeding && "bg-destructive")}
            />
          ) : null}
          {!hideBalance && exceeding ? (
            <p className="text-destructive">
              You&apos;re exceeding your balance
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
