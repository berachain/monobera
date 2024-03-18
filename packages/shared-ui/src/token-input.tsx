"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  formatInputTokenValue,
  useBeraJs,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { getAddress } from "viem";

import { FormattedNumber, SelectToken, TooltipCustom } from ".";

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
  setIsTyping?: (isTyping: boolean) => void;
  isActionLoading?: boolean | undefined;
  priceImpact?: number | null;
};

let typingTimer: NodeJS.Timeout;

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
  setIsTyping = undefined,
  showExceeding,
  onExceeding = undefined,
  hideMax = false,
  isActionLoading = undefined,
  priceImpact,
}: Props) {
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { isLoading: isBalancesLoading, data: token } =
    useSelectedAssetWalletBalance(
      selected ? getAddress(selected?.address ?? "") ?? "" : "",
    );

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
      (safeNumberAmount > tokenBalance || Number(tokenBalance) === 0) &&
      selected !== undefined
    ) {
      setExceeding(true);
      return;
    }
  }, [tokenBalance, amount, isBalancesLoading]);

  useEffect(() => {
    if (exceeding !== undefined && onExceeding) onExceeding(exceeding);
  }, [exceeding]);

  const priceImpactColorClass = useMemo(() => {
    if (!priceImpact) return "";
    let result = "";
    if (priceImpact > 10) {
      result = "text-green-500";
    } else if (priceImpact > 5) {
      result = "text-green-400";
    } else if (priceImpact > 2) {
      result = "text-green-300";
    } else if (priceImpact > -3) {
      result = "text-neutral-400";
    } else if (priceImpact > -5) {
      result = "text-amber-300";
    } else if (priceImpact > -10) {
      result = "text-red-400";
    } else {
      result = "text-red-500";
    }
    return result;
  }, [priceImpact]);

  return (
    <li className={"flex flex-col flex-wrap px-3"}>
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center gap-1">
          <SelectToken
            token={selected}
            onTokenSelection={onTokenSelection}
            selectedTokens={selectedTokens}
            selectable={selectable}
            weight={weight}
            customTokenList={customTokenList}
            filter={[bgtTokenAddress]}
          />
          {selected &&
            isActionLoading !== undefined &&
            isActionLoading === true && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 animate-spin fill-green-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
        </div>
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
            onKeyDown={(e: any) => {
              if (e.key === "-" || e.key === "e") {
                e.preventDefault();
              }
              clearTimeout(typingTimer);
              setIsTyping?.(true);
              typingTimer = setTimeout(() => {
                setIsTyping?.(false);
              }, 1000);
            }}
            onChange={(e: any) => {
              const inputValue = e.target.value;
              const filteredValue = formatInputTokenValue(inputValue);
              // Ensure there's only one period
              const periodsCount = filteredValue.split(".").length - 1;
              const [_, decimalPart = ""] = filteredValue.split(".");
              if (decimalPart.length > 18) return;
              if (periodsCount <= 1) setAmount?.(filteredValue);
            }}
          />
        </div>
      </div>
      <div className="mb-4 h-fit w-full cursor-default">
        <div className="mt-[-10px] flex w-full flex-row-reverse items-center justify-between gap-1">
          <div className="flex flex-row gap-1">
            {!hidePrice && (
              <div className="flex flex-row gap-1 self-center p-0 text-xs text-muted-foreground">
                {priceImpact && (
                  <TooltipCustom
                    anchor="left"
                    position="right"
                    tooltipContent={
                      <p className="text-xs">
                        The estimated difference between the USD values of input
                        and output amounts.
                      </p>
                    }
                  >
                    <p className={`${priceImpactColorClass}`}>
                      {`(${priceImpact}%) `}
                    </p>
                  </TooltipCustom>
                )}
                {safeNumberAmount !== 0 && (
                  <FormattedNumber
                    value={safeNumberAmount * price}
                    symbol="USD"
                    compact={false}
                  />
                )}
              </div>
            )}
          </div>
          {isConnected && selected && tokenBalance !== 0 && (
            <div className="flex flex-row items-center justify-start gap-1 px-1">
              <Icons.wallet className="h-3 w-3 text-muted-foreground" />
              <p className="w-fit max-w-[60px] overflow-hidden truncate p-0 text-xs text-muted-foreground">
                {tokenBalance ? tokenBalance : "0"}
              </p>
              {!hideMax && (
                <p
                  className="cursor-pointer select-none text-xs text-muted-foreground underline hover:text-foreground"
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
          )}
        </div>
      </div>
    </li>
  );
}
