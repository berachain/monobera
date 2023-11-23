"use client";

import React, { useEffect, useState } from "react";
import {
  formatUsd,
  useBeraJs,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { SelectToken } from ".";

type Props = {
  selected: Token | undefined;
  selectedTokens?: (Token | undefined)[];
  amount: string | undefined;
  balance?: string;
  price?: number;
  hideBalance?: boolean;
  hidePrice?: boolean;
  selectable?: boolean;
  weight?: number;
  disabled?: boolean;
  customTokenList?: (Token | undefined)[];
  showExceeding?: boolean;
  hideMax?: boolean;
  onTokenSelection?: (token: Token | undefined) => void;
  setAmount?: (amount: string) => void;
  onExceeding?: (isExceeding: boolean) => void;
};

export function TokenInput({
  selected,
  selectedTokens,
  amount = "",
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
  showExceeding,
  onExceeding = undefined,
  hideMax = false,
}: Props) {
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { isLoading: isBalancesLoading, data: token } =
    useSelectedAssetWalletBalance(selected?.address ?? "");
  let tokenBalance = token?.formattedBalance;

  if (balance !== undefined) {
    tokenBalance = balance;
  }
  const { isConnected } = useBeraJs();

  const safeNumberAmount =
    Number(amount) > Number.MAX_SAFE_INTEGER
      ? Number.MAX_SAFE_INTEGER
      : Number(amount) ?? 0;

  useEffect(() => {
    if (Number(amount) > Number.MAX_SAFE_INTEGER) return;
    if (safeNumberAmount <= tokenBalance) {
      setExceeding(false);
      return;
    }
    if (
      !isBalancesLoading &&
      (safeNumberAmount > tokenBalance || Number(tokenBalance) == 0) &&
      selected !== undefined
    ) {
      setExceeding(true);
      return;
    }
  }, [tokenBalance, amount, isBalancesLoading]);

  useEffect(() => {
    if (exceeding !== undefined && onExceeding) onExceeding(exceeding);
  }, [exceeding]);

  return (
    <li className={"flex flex-col flex-wrap px-3"}>
      <div className="flex flex-row items-center">
        <SelectToken
          token={selected}
          onTokenSelection={onTokenSelection}
          selectedTokens={selectedTokens}
          selectable={selectable}
          weight={weight}
          customTokenList={customTokenList}
          filter={[bgtTokenAddress]}
        />
        <div className="ml-2 flex w-full flex-col pl-2 sm:pl-0">
          <Input
            type="number"
            step="any"
            min="0"
            placeholder="0"
            disabled={disabled}
            className={cn(
              "ring-offset-none w-full grow border-0 bg-transparent p-0 text-right text-lg font-semibold shadow-none outline-none ring-0 drop-shadow-none focus-visible:ring-0 focus-visible:ring-offset-0",
              exceeding && showExceeding && "text-destructive-foreground",
            )}
            value={amount}
            onKeyDown={(e: any) => e.key === "-" && e.preventDefault()}
            onChange={(e: any) => {
              const inputValue = e.target.value;

              // Allow only digits and periods (decimal points)
              const filteredValue = inputValue.replace(/[^0-9.]/g, "");

              // Ensure there's only one period
              const periodsCount = filteredValue.split(".").length - 1;
              if (periodsCount <= 1) {
                setAmount && setAmount(filteredValue);
              }
            }}
          />
        </div>
      </div>
      {isConnected && selected && tokenBalance !== 0 ? (
        <div className="mb-4 h-fit w-full cursor-default">
          {hideBalance ? null : (
            <div className="mt-[-10px] flex w-full items-center justify-between gap-1">
              <div className="flex flex-row items-center justify-start gap-1 px-3">
                <Icons.wallet className="h-3 w-3 text-muted-foreground" />
                <p className="w-fit max-w-[60px] overflow-hidden truncate p-0 text-xs text-muted-foreground">
                  {tokenBalance ? tokenBalance : "0"}
                </p>
                {!hideMax && (
                  <p
                    className="cursor-pointer select-none	 text-xs text-muted-foreground underline hover:text-foreground"
                    onClick={() => {
                      setAmount &&
                        tokenBalance !== "" &&
                        tokenBalance !== "0" &&
                        setAmount(tokenBalance?.toString() ?? "");
                    }}
                  >
                    MAX
                  </p>
                )}
              </div>
              <div className="flex flex-row gap-1">
                {!hidePrice && (
                  <p className="self-center p-0 text-xs text-muted-foreground">
                    {safeNumberAmount !== 0 &&
                      !isNaN(safeNumberAmount) &&
                      formatUsd((safeNumberAmount * price).toFixed(2))}
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
