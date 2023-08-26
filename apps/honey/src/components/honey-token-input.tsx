"use client";

import React, { useEffect, useState } from "react";
import {
  formatUsd,
  useBeraJs,
  usePollAssetWalletBalance,
  useSelectedAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { SelectToken } from "~/components/honey-select-token";

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
  onExceeding?: (isExceeding: boolean) => void;
};

export function HoneyTokenInput({
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
  onExceeding = undefined,
}: Props) {
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  usePollAssetWalletBalance();
  let tokenBalance = Number(
    useSelectedAssetWalletBalance(selected?.address ?? "")?.formattedBalance ??
      "0",
  );

  if (balance !== undefined) {
    tokenBalance = balance;
  }
  const { isConnected } = useBeraJs();

  useEffect(() => {
    if (tokenBalance === 0) return;
    if (amount > Number.MAX_SAFE_INTEGER) return;
    if (amount <= tokenBalance) {
      setExceeding(false);
      return;
    }
    if (amount > tokenBalance) {
      setExceeding(true);
      return;
    }
  }, [tokenBalance, amount]);

  useEffect(() => {
    if (exceeding !== undefined && onExceeding) onExceeding(exceeding);
  }, [exceeding]);
  return (
    <li
      className={
        "relative flex h-[70px] flex-col flex-wrap rounded-lg border-[3px] border-black bg-white pl-2 pr-4"
      }
    >
      <div className="flex flex-row items-start">
        <SelectToken
          token={selected}
          onTokenSelection={onTokenSelection}
          selectedTokens={selectedTokens}
          selectable={selectable}
          weight={weight}
        />
        <div className="flex w-full flex-col pl-2 pt-2 sm:pl-0">
          <Input
            type="number"
            step="any"
            min="0"
            placeholder="0.0"
            disabled={disabled}
            className={cn(
              "w-full grow border-0 bg-white p-0 text-right text-lg font-semibold outline-none ring-0 ring-offset-0 drop-shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
              exceeding && "text-destructive",
            )}
            value={amount > 0 ? amount : ""}
            onChange={(e) => {
              setAmount && setAmount(Number(e.target.value));
            }}
          />
        </div>
      </div>
      {isConnected && selected && tokenBalance !== 0 ? (
        hideBalance ? null : (
          <div className="absolute bottom-[6px] right-0 h-fit cursor-default">
            <div className="flex w-full items-center justify-between gap-1">
              <div className="flex cursor-pointer flex-row  items-center justify-start text-xs text-muted-foreground">
                <Icons.wallet className=" mr-[2px] mt-[-3px] h-3 w-3" />
                <p className="max-w-10 w-fit overflow-hidden truncate p-0 text-xs sm:w-14">
                  {tokenBalance ? tokenBalance : "0"}
                </p>
                <p
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setAmount && setAmount(tokenBalance);
                  }}
                >
                  MAX
                </p>
              </div>
              <div className="flex flex-row gap-1">
                {!hidePrice && (
                  <p className="self-center p-0 text-xs text-muted-foreground">
                    {/* TODO: change to actual values */}
                    {amount !== 0 && formatUsd((amount * 1).toFixed(2))}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      ) : null}
    </li>
  );
}
