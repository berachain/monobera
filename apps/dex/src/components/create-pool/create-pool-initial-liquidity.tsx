import React, { useEffect } from "react";
import { ActionButton } from "@bera/shared-ui";
import { Alert, AlertDescription } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import CreatePoolInitialLiquidityInput from "~/components/create-pool/create-pool-initial-liquidity-input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import * as _apollo_client from "@apollo/client";
import CreatePoolInitialPriceInput from "./create-pool-initial-price";
import CreatePoolExchangeRate from "./create-pool-exchange-rate";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { getBaseCost, getQuoteCost } from "~/app/pools/fetchPools";

type Props = {
  tokenWeights: ITokenWeight[];
  error: Error | undefined;
  initialPrice: string;
  onInitialPriceChange: (price: string) => void;
  onTokenBalanceChange: (index: number, amount: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

export function CreatePoolInitialLiquidity({
  tokenWeights,
  error,
  initialPrice,
  onInitialPriceChange,
  onTokenBalanceChange,
  onContinue,
  onBack,
}: Props) {
  useEffect(() => {
    onTokenBalanceChange(0, "");
    onTokenBalanceChange(1, "");
  }, [initialPrice]);

  const baseCost = getBaseCost(getSafeNumber(initialPrice));
  const quoteCost = getQuoteCost(getSafeNumber(initialPrice));

  const handleBaseAssetAmountChange = (value: string): void => {
    onTokenBalanceChange(0, value);
    const quoteAmount = baseCost * getSafeNumber(value);
    onTokenBalanceChange(1, quoteAmount.toString());
  };

  const handleQuoteAssetAmountChange = (value: string): void => {
    onTokenBalanceChange(1, value);
    const baseAmount = quoteCost * getSafeNumber(value);
    onTokenBalanceChange(0, baseAmount.toString());
  };
  return (
    <Card className="w-[350px]  px-6 py-8 shadow-lg sm:w-[480px]">
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
            baseToken={tokenWeights[0]}
            initialPrice={initialPrice}
            onInitialPriceChange={onInitialPriceChange}
          />
        </ul>
        <CreatePoolExchangeRate
          baseToken={tokenWeights[0]}
          quoteToken={tokenWeights[1]}
          initialPrice={initialPrice}
        />
        <div className="flex flex-col gap-4">
          <ul className="divide divide-y divide-border rounded-lg border">
            <CreatePoolInitialLiquidityInput
              disabled={
                !initialPrice ||
                initialPrice === "0" ||
                getSafeNumber(initialPrice) === 0
              }
              key={0}
              tokenWeight={tokenWeights[0] as ITokenWeight}
              onTokenBalanceChange={handleBaseAssetAmountChange}
            />
            <CreatePoolInitialLiquidityInput
              disabled={
                !initialPrice ||
                initialPrice === "0" ||
                getSafeNumber(initialPrice) === 0
              }
              key={1}
              tokenWeight={tokenWeights[1] as ITokenWeight}
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
