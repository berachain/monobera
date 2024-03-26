import React, { useEffect } from "react";
import { ActionButton } from "@bera/shared-ui";
import { Alert, AlertDescription } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import CreatePoolInitialLiquidityInput from "~/components/create-pool/create-pool-initial-liquidity-input";
import * as _apollo_client from "@apollo/client";
import CreatePoolInitialPriceInput from "./create-pool-initial-price";
import CreatePoolExchangeRate from "./create-pool-exchange-rate";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { getBaseCost, getQuoteCost } from "~/app/pools/fetchPools";
import { type Token } from "@bera/berajs";
import { formatUnits, parseUnits } from "viem";

type Props = {
  baseToken: Token | undefined;
  quoteToken: Token | undefined;
  baseTokenAmount: string;
  quoteTokenAmount: string;
  error: Error | undefined;
  initialPrice: string;
  onInitialPriceChange: (price: string) => void;
  setIsBaseTokenInput: (isBaseTokenInput: boolean) => void;
  setBaseAmount: (amount: string) => void;
  setQuoteAmount: (amount: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function CreatePoolInitialLiquidity({
  baseToken,
  quoteToken,
  baseTokenAmount,
  quoteTokenAmount,
  error,
  initialPrice,
  setBaseAmount,
  setQuoteAmount,
  onInitialPriceChange,
  setIsBaseTokenInput,
  onContinue,
  onBack,
}: Props) {
  useEffect(() => {
    setBaseAmount("");
    setQuoteAmount("");
  }, [initialPrice]);

  const baseCost = getBaseCost(getSafeNumber(initialPrice));
  const quoteCost = getQuoteCost(getSafeNumber(initialPrice));

  const PRESICION = 18;
  const handleBaseAssetAmountChange = (value: string): void => {
    setBaseAmount(value);
    const parsedBaseCost = parseUnits(baseCost.toString(), PRESICION);
    const parsedValue = parseUnits(value, PRESICION);
    setIsBaseTokenInput(true);
    const quoteAmount =
      (parsedBaseCost * parsedValue) / BigInt(10 ** PRESICION);
      setQuoteAmount(quoteAmount === 0n ? "" : formatUnits(quoteAmount, PRESICION));
  };

  const handleQuoteAssetAmountChange = (value: string): void => {
    setQuoteAmount(value);
    setIsBaseTokenInput(false);
    const parsedQuoteCost = parseUnits(quoteCost.toString(), PRESICION);
    const parsedValue = parseUnits(value, PRESICION);
    const baseAmount =
      (parsedQuoteCost * parsedValue) / BigInt(10 ** PRESICION);
    setBaseAmount(baseAmount === 0n ? "" : formatUnits(baseAmount, PRESICION));
  };

  const isInputDisabled =
    !initialPrice || initialPrice === "0" || getSafeNumber(initialPrice) === 0;
  return (
    <Card className="w-full  px-6 py-8 shadow-lg sm:w-[480px]">
      <CardTitle className="center mb-3 flex items-center">
        <Icons.chevronLeft
          className="block h-6 w-6 hover:cursor-pointer"
          onClick={onBack}
        />{" "}
        Set initial liquidity & Initial Price
      </CardTitle>
      <div className="flex flex-col gap-0 mb-2">
        <p className="text-md font-semibold">Set a Price for your Base Token</p>
        <p className="text-sm text-muted-foreground">
          You will have to set a price for the base token to initialize the
          pool.
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <ul className="divide divide-y divide-border rounded-lg border">
          <CreatePoolInitialPriceInput
            quoteToken={quoteToken}
            initialPrice={initialPrice}
            onInitialPriceChange={onInitialPriceChange}
          />
        </ul>
        <CreatePoolExchangeRate
          baseToken={baseToken}
          quoteToken={quoteToken}
          initialPrice={initialPrice}
        />
        <div className="flex flex-col gap-4">
          <ul className="divide divide-y divide-border rounded-lg border">
            <CreatePoolInitialLiquidityInput
              disabled={isInputDisabled}
              key={0}
              token={baseToken as Token}
              tokenAmount={baseTokenAmount}
              onTokenBalanceChange={handleBaseAssetAmountChange}
            />
            <CreatePoolInitialLiquidityInput
              disabled={isInputDisabled}
              key={1}
              token={quoteToken as Token}
              tokenAmount={quoteTokenAmount}
              onTokenBalanceChange={handleQuoteAssetAmountChange}
            />
          </ul>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                <Icons.info className="mr-1 mt-[-4px] inline h-4 w-4" />
                {error?.message}
              </AlertDescription>
            </Alert>
          )}
          <ActionButton>
            <Button
              className="w-full"
              onClick={onContinue}
              disabled={error !== undefined}
            >
              Next
            </Button>
          </ActionButton>
        </div>
      </div>
    </Card>
  );
}
