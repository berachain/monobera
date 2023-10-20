"use client";

import React, { useEffect, useState } from "react";
import {
  formatUsd,
  useBeraJs,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { SelectToken } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

type Props = {
  selected: Token | undefined;
  selectedTokens?: (Token | undefined)[];
  amount: number;
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
  onTokenSelection?: (token: Token) => void;
  setAmount?: (amount: number) => void;
  onExceeding?: (isExceeding: boolean) => void;
};

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
  showExceeding = true,
  onExceeding = undefined,
  hideMax = false,
}: Props) {
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: token, isLoading: isBalancesLoading } =
    useSelectedAssetWalletBalance(selected?.address ?? "");
  let tokenBalance = Number(token?.formattedBalance ?? "0");

  if (balance !== undefined) {
    tokenBalance = balance;
  }
  const { isConnected } = useBeraJs();

  useEffect(() => {
    if (amount > Number.MAX_SAFE_INTEGER) return;
    if (amount <= tokenBalance) {
      setExceeding(false);
      return;
    }
    if (
      !isBalancesLoading &&
      (amount > tokenBalance || Number(tokenBalance) == 0)
    ) {
      setExceeding(true);
      return;
    }
  }, [tokenBalance, amount]);

  useEffect(() => {
    if (exceeding !== undefined && onExceeding) onExceeding(exceeding);
  }, [exceeding]);
  return (
    <li className={"relative flex flex-col flex-wrap px-3"}>
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
            type="number"
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
            value={amount > 0 ? amount : ""}
            onChange={(e) => {
              const inputValue = e.target.value;

              // Allow only digits and periods (decimal points)
              const filteredValue = inputValue.replace(/[^0-9.]/g, "");

              // Ensure there's only one period
              const periodsCount = filteredValue.split(".").length - 1;
              if (periodsCount <= 1) {
                setAmount && setAmount(Number(filteredValue));
              }
            }}
          />
        </div>
      </div>
      {isConnected && selected && tokenBalance !== 0 ? (
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
                    className="cursor-pointer text-xs text-muted-foreground underline hover:text-foreground"
                    onClick={() => {
                      setAmount && setAmount(tokenBalance);
                    }}
                  >
                    MAX
                  </p>
                )}
              </div>
              <div className="flex flex-row gap-1">
                {!hidePrice && (
                  <p className="self-center p-0 text-xs text-muted-foreground">
                    {amount !== 0 && formatUsd((amount * price).toFixed(2))}
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
