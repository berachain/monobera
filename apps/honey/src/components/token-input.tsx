"use client";

import React, { useEffect, useState } from "react";
import {
  formatInputTokenValue,
  formatUsd,
  useBeraJs,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { SelectToken } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import BigNumber from "bignumber.js";

type Props = {
  selected: Token | undefined;
  selectedTokens?: (Token | undefined)[];
  amount: string | undefined;
  balance?: number;
  price?: number;
  hideBalance?: boolean;
  hidePrice?: boolean;
  selectable?: boolean;
  weight?: number;
  disabled?: boolean;
  customTokenList?: Token[];
  showExceeding?: boolean;
  hideMax?: boolean;
  setIsTyping?: (isTyping: boolean) => void;
  onTokenSelection?: (token: Token | undefined) => void;
  setAmount?: (amount: string | undefined) => void;
  onExceeding?: (isExceeding: boolean) => void;
  className?: string;
};

let typingTimer: NodeJS.Timeout;

export function TokenInput({
  selected,
  selectedTokens,
  amount,
  price = 1,
  balance = undefined,
  hideBalance = false,
  hidePrice = false,
  selectable = true,
  weight = undefined,
  disabled = false,
  customTokenList = undefined,
  onTokenSelection = undefined,
  setAmount = undefined,
  setIsTyping = undefined,
  showExceeding = true,
  onExceeding = undefined,
  hideMax = false,
  className,
}: Props) {
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: token, isLoading: isBalancesLoading } =
    useSelectedAssetWalletBalance(selected?.address ?? "");

  let tokenBalance: string = token?.formattedBalance ?? "0";
  if (balance !== undefined) tokenBalance = balance.toString();

  const { isConnected } = useBeraJs();

  useEffect(() => {
    // if (BigNumber(tokenBalance).eq(0)) return;
    if (Number(amount) > Number.MAX_SAFE_INTEGER) return;
    if (
      !isBalancesLoading &&
      (BigNumber(amount ?? "0").gt(tokenBalance) || Number(tokenBalance) === 0)
    ) {
      setExceeding(true);
      return;
    }
    setExceeding(false);
    return;
  }, [tokenBalance, amount]);

  useEffect(() => {
    if (exceeding !== undefined && onExceeding) onExceeding(exceeding);
  }, [exceeding]);
  return (
    <li className={cn("relative flex flex-col flex-wrap px-3", className)}>
      <div className="flex flex-row items-center">
        <SelectToken
          token={selected}
          onTokenSelection={onTokenSelection}
          selectedTokens={selectedTokens}
          selectable={selectable}
          weight={weight}
          customTokenList={customTokenList}
        />
        <div className="flex w-full flex-col pl-2 sm:pl-0">
          <Input
            type="text"
            step="any"
            min="0"
            placeholder="0.00"
            disabled={disabled}
            className={cn(
              "ring-offset-none w-full grow border-0 bg-transparent p-0 text-right text-lg font-semibold shadow-none outline-none ring-0 drop-shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
              exceeding &&
                !hideBalance &&
                showExceeding &&
                "text-destructive-foreground",
            )}
            value={amount}
            onKeyDown={(e: any) => {
              if (e.key === "-") {
                e.preventDefault();
              }
              clearTimeout(typingTimer);
              setIsTyping?.(true);
              typingTimer = setTimeout(() => {
                setIsTyping?.(false);
              }, 1000);
            }}
            onChange={(e) => {
              const inputValue = e.target.value;
              const filteredValue = formatInputTokenValue(inputValue);

              // Ensure there's only one period
              const periodsCount = filteredValue.split(".").length - 1;
              if (periodsCount <= 1) {
                setAmount?.(filteredValue);
              }
            }}
          />
        </div>
      </div>
      {isConnected && selected ? (
        <div className="absolute bottom-2 right-0">
          {hideBalance ? null : (
            <div className="mt-[-10px] flex w-full items-center justify-between gap-1">
              <div className="flex flex-row items-center justify-start px-3">
                <Icons.wallet className="mr-1 h-3 w-3 text-muted-foreground" />
                <p className="w-fit max-w-[60px] overflow-hidden truncate p-0 text-xs text-muted-foreground">
                  {tokenBalance ? tokenBalance : "0"}
                </p>
                {!hideMax && (
                  <p
                    className="cursor-pointer pl-1 text-xs text-muted-foreground underline hover:text-foreground"
                    onClick={() => {
                      setAmount?.(tokenBalance);
                    }}
                  >
                    MAX
                  </p>
                )}
              </div>
              <div className="flex flex-row gap-1">
                {!hidePrice && (
                  <p className="self-center p-0 text-xs text-muted-foreground">
                    {Number(amount) !== 0 &&
                      formatUsd(
                        BigNumber(amount ?? "0")
                          .times(price)
                          .toFixed(2),
                      )}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </li>
  );
}
