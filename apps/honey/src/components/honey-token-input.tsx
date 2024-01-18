"use client";

import React, { useEffect, useState } from "react";
import { useBeraJs, usePollAssetWalletBalance, type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import BigNumber from "bignumber.js";

import { SelectToken } from "~/components/honey-select-token";

type Props = {
  selected: Token | undefined;
  selectedTokens?: (Token | undefined)[];
  amount: string | undefined;
  balance?: number;
  hideBalance?: boolean;
  hidePrice?: boolean;
  selectable?: boolean;
  weight?: number;
  disabled?: boolean;
  customTokenList?: Token[];
  onTokenSelection?: (token: Token | undefined) => void;
  setAmount?: (amount: string | undefined) => void;
  showExceeding?: boolean;
  onExceeding?: (isExceeding: boolean) => void;
};

export function HoneyTokenInput({
  selected,
  selectedTokens,
  amount,
  balance = undefined,
  hideBalance = false,
  selectable = true,
  weight = undefined,
  disabled = false,
  customTokenList = undefined,
  onTokenSelection = undefined,
  setAmount = undefined,
  showExceeding = false,
  onExceeding = undefined,
}: Props) {
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: token } = useSelectedAssetWalletBalance(
    selected?.address ?? "",
  );
  let tokenBalance: string = token?.formattedBalance ?? "0";
  if (balance !== undefined) tokenBalance = balance.toString();

  const { isConnected } = useBeraJs();

  useEffect(() => {
    // if (BigNumber(tokenBalance).eq(0)) return;
    if (Number(amount) > Number.MAX_SAFE_INTEGER) return;
    if (BigNumber(amount ?? "0").gt(tokenBalance)) {
      setExceeding(true);
      return;
    } else {
      setExceeding(false);
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
          customTokenList={customTokenList}
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
              exceeding &&
                !hideBalance &&
                showExceeding &&
                "text-destructive-foreground",
            )}
            value={amount}
            onChange={(e) => {
              setAmount && setAmount(e.target.value);
            }}
          />
        </div>
      </div>
      {isConnected && selected ? (
        <div className="absolute bottom-[6px] right-2 h-fit cursor-default">
          {/* <div className="flex w-full items-center justify-between gap-1"> */}
          {!hideBalance && (
            <div className="flex flex-row items-center justify-end gap-1 text-xs text-muted-foreground">
              <div className="w-16 overflow-hidden truncate p-0 text-right text-xs">
                <Icons.wallet className="mr-[2px] mt-[-3px] inline h-3 w-3" />
                {tokenBalance ? tokenBalance : "0"}
              </div>

              <p
                className="cursor-pointer hover:underline"
                onClick={() => {
                  setAmount && setAmount(tokenBalance);
                }}
              >
                MAX
              </p>
            </div>
          )}
          {/* <div className="flex flex-row gap-1">
              {!hidePrice && (
                <p className="self-center p-0 text-xs text-muted-foreground">
                  {amount !== 0 && formatUsd((amount * 1).toFixed(2))}
                </p>
              )}
            </div> */}
        </div>
      ) : // </div>
      null}
    </li>
  );
}
