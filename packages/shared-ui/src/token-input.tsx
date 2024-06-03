"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  formatInputTokenValue,
  useBeraJs,
  usePollWalletBalances,
  type Token,
} from "@bera/berajs";
import { bgtTokenAddress, nativeTokenAddress } from "@bera/config";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { getAddress } from "viem";

import {
  BREAKPOINTS,
  FormattedNumber,
  SelectToken,
  TooltipCustom,
  useBreakpoint,
} from ".";
import { getPriceImpactColorClass } from "./utils/textStyling";

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
  difference?: number | null;
  filteredTokenTags?: string[];
  beraSafetyMargin?: number;
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
  disabled = false,
  customTokenList = undefined,
  onTokenSelection = undefined,
  setAmount = undefined,
  setIsTyping = undefined,
  showExceeding,
  onExceeding = undefined,
  hideMax = false,
  isActionLoading = undefined,
  difference,
  filteredTokenTags = [],
  beraSafetyMargin,
}: Props) {
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  const { useSelectedWalletBalance, isLoading: isBalancesLoading } =
    usePollWalletBalances();
  const token = useSelectedWalletBalance(
    selected ? getAddress(selected?.address ?? "0x") ?? "0x" : "0x",
  );

  let tokenBalance = token?.formattedBalance || "0";

  if (balance !== undefined) {
    tokenBalance = balance;
  }
  const { isConnected } = useBeraJs();

  const safeNumberAmount =
    Number(amount) > Number.MAX_SAFE_INTEGER
      ? Number.MAX_SAFE_INTEGER
      : Number(amount) ?? 0;

  useEffect(() => {
    if (safeNumberAmount > Number.MAX_SAFE_INTEGER) return;
    if (safeNumberAmount <= Number(tokenBalance)) {
      setExceeding(false);
      return;
    }
    if (
      !isBalancesLoading &&
      (safeNumberAmount > Number(tokenBalance) || Number(tokenBalance) === 0) &&
      selected !== undefined
    ) {
      setExceeding(true);
      return;
    }
  }, [tokenBalance, amount, isBalancesLoading]);

  useEffect(() => {
    if (exceeding !== undefined && onExceeding) onExceeding(exceeding);
  }, [exceeding]);

  const differenceColorClass = useMemo(
    () => getPriceImpactColorClass(difference),
    [difference],
  );

  const breakpoint = useBreakpoint();

  // Logic to show warning by the max button if a safety margin for Bera swaps is provided and user's native bera balance is less than the safety margin
  let hasMaxGasWarning = false;
  if (
    selected?.address === nativeTokenAddress &&
    beraSafetyMargin &&
    parseFloat(tokenBalance) - beraSafetyMargin < 0
  ) {
    hasMaxGasWarning = true;
  } else {
    hasMaxGasWarning = false;
  }
  const gasMaxTooltipHiddenStyles = hasMaxGasWarning ? {} : { hidden: true };

  const handleMaxClick = () => {
    if (
      !setAmount ||
      !tokenBalance ||
      tokenBalance === "" ||
      tokenBalance === "0" ||
      Number.isNaN(Number(tokenBalance))
    ) {
      return;
    }

    // ensure that we leave at a padded margin with the estimated gas price when attempting to trade MAX amount if we're trading in native bera token
    // for all other tokens we set the amount to the total balance of that token in the connected wallet
    const newAmount =
      selected?.address === nativeTokenAddress && beraSafetyMargin
        ? Math.max(parseFloat(tokenBalance) - beraSafetyMargin, 0).toString() ??
          ""
        : tokenBalance.toString() ?? "";
    setAmount(newAmount);
  };

  return (
    <li className={"flex flex-col flex-wrap px-3 py-4"}>
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center gap-1">
          <SelectToken
            token={selected}
            onTokenSelection={onTokenSelection}
            selectedTokens={selectedTokens}
            selectable={selectable}
            customTokenList={customTokenList}
            filter={[bgtTokenAddress]}
            filteredTokenTags={filteredTokenTags}
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
            type="number-enhanced"
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
              clearTimeout(typingTimer);
              setIsTyping?.(true);
              typingTimer = setTimeout(() => {
                setIsTyping?.(false);
              }, 1000);
            }}
            onChange={(e: any) => {
              const inputValue = e.target.value;
              const filteredValue = formatInputTokenValue(inputValue);
              const [_, decimalPart = ""] = filteredValue.split(".");
              if (decimalPart.length > 18) return;
              setAmount?.(filteredValue);
            }}
            allowMinus={false}
          />
        </div>
      </div>
      <div className="h-fit w-full cursor-default">
        <div className="flex w-full flex-row-reverse items-center justify-between gap-1">
          <div className="flex flex-row gap-1">
            {!hidePrice && (
              <div className="flex flex-row gap-1 self-center p-0 text-xs text-muted-foreground">
                {!!difference && Number.isFinite(difference) && (
                  <TooltipCustom
                    anchor="left"
                    position="right"
                    hidden={
                      breakpoint !== undefined && breakpoint! <= BREAKPOINTS.md
                        ? true
                        : undefined
                    }
                    tooltipContent={
                      <div className="w-[150px]">
                        <p className="text-xs">
                          The estimated difference between the USD values of
                          input and output amounts.
                        </p>
                      </div>
                    }
                  >
                    <p className={`${differenceColorClass}`}>
                      {`(${difference.toFixed(2)}%) `}
                    </p>
                  </TooltipCustom>
                )}
                {safeNumberAmount !== 0 &&
                  !Number.isNaN(safeNumberAmount * price) && (
                    <FormattedNumber
                      value={safeNumberAmount * price}
                      symbol="USD"
                      compact={false}
                      showIsSmallerThanMin
                    />
                  )}
              </div>
            )}
          </div>
          {isConnected &&
            selected &&
            Number(tokenBalance) !== 0 &&
            !hideBalance && (
              <div className="flex flex-row items-center justify-start gap-1 px-1 mt-1">
                <Icons.wallet className="h-3 w-3 text-muted-foreground" />
                <FormattedNumber
                  value={tokenBalance ? tokenBalance : "0"}
                  className="text-xs text-muted-foreground"
                  showIsSmallerThanMin
                />
                {!hideMax && (
                  <span
                    className={`${
                      hasMaxGasWarning ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  >
                    <TooltipCustom
                      tooltipContent={
                        <div className="w-[150px]">
                          <p className="text-xs">
                            Your Bera balance is below the estimated gas prices,
                            this transaction would likely fail.
                          </p>
                        </div>
                      }
                      {...gasMaxTooltipHiddenStyles}
                    >
                      <span
                        className={`flex select-none flex-row items-center gap-1 text-xs text-muted-foreground underline ${
                          hasMaxGasWarning
                            ? "text-warning-foreground"
                            : "hover:text-foreground"
                        }`}
                        onClick={hasMaxGasWarning ? undefined : handleMaxClick}
                      >
                        MAX
                        {hasMaxGasWarning && (
                          <span>
                            <Icons.alertCircle size={12} />
                          </span>
                        )}
                      </span>
                    </TooltipCustom>
                  </span>
                )}
              </div>
            )}
        </div>
      </div>
    </li>
  );
}
