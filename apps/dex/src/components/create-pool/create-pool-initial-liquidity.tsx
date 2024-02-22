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
import {
  useCrocPoolFromTokens,
  useCrocToken,
} from "~/hooks/useCrocPoolFromTokens";

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
  const tokenA = tokenWeights[0]?.token;
  const tokenB = tokenWeights[1]?.token;

  const tokenACrocToken = useCrocToken(tokenA);
  const tokenBCrocToken = useCrocToken(tokenB);

  const crocPool = useCrocPoolFromTokens(tokenACrocToken, tokenBCrocToken);

  const baseToken: ITokenWeight | undefined =
    tokenA?.address === crocPool?.baseToken?.tokenAddr
      ? tokenWeights[0]
      : tokenWeights[1];
  const quoteToken: ITokenWeight | undefined =
    tokenB?.address === crocPool?.quoteToken?.tokenAddr
      ? tokenWeights[1]
      : tokenWeights[0];

  const baseTokenIndex: number =
    tokenA?.address === crocPool?.baseToken?.tokenAddr ? 0 : 1;
  const quoteTokenIndex: number =
    tokenB?.address === crocPool?.quoteToken?.tokenAddr ? 1 : 0;

  console.log({
    tokenA,
    tokenB,
    tokenACrocToken,
    tokenBCrocToken,
    crocPool,
    baseToken,
    quoteToken,
  });

  useEffect(() => {
    onTokenBalanceChange(0, "");
    onTokenBalanceChange(1, "");
  }, [initialPrice]);

  const baseCost = getBaseCost(getSafeNumber(initialPrice));
  const quoteCost = getQuoteCost(getSafeNumber(initialPrice));

  const handleBaseAssetAmountChange = (value: string): void => {
    onTokenBalanceChange(baseTokenIndex, value);
    const quoteAmount = baseCost * getSafeNumber(value);
    onTokenBalanceChange(quoteTokenIndex, quoteAmount.toString());
  };

  const handleQuoteAssetAmountChange = (value: string): void => {
    onTokenBalanceChange(quoteTokenIndex, value);
    const baseAmount = quoteCost * getSafeNumber(value);
    onTokenBalanceChange(baseTokenIndex, baseAmount.toString());
  };

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
            baseToken={baseToken}
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
              disabled={
                !initialPrice ||
                initialPrice === "0" ||
                getSafeNumber(initialPrice) === 0
              }
              key={0}
              tokenWeight={baseToken as ITokenWeight}
              onTokenBalanceChange={handleBaseAssetAmountChange}
            />
            <CreatePoolInitialLiquidityInput
              disabled={
                !initialPrice ||
                initialPrice === "0" ||
                getSafeNumber(initialPrice) === 0
              }
              key={1}
              tokenWeight={quoteToken as ITokenWeight}
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
