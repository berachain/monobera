"use client";

import { CreatePool } from "~/components/create-pool/create-pool";
import { CreatePoolFeeData } from "~/components/create-pool/create-pool-feedata";
import { CreatePoolInitialLiquidity } from "~/components/create-pool/create-pool-initial-liquidity";
import { CreatePoolPreview } from "~/components/create-pool/create-pool-preview";
import {
  CreatePoolStepper,
  type IStep,
} from "~/components/create-pool/create-pool-stepper";
import useCreateTokenWeights, { Steps } from "~/hooks/useCreateTokenWeights";

const steps: IStep[] = [
  {
    name: "Set Weights",
    description: "Set the weights of the tokens in the pool",
  },
  {
    name: "Set Weights",
    description: "Set the weights of the tokens in the pool",
  },
  {
    name: "Set Weights",
    description: "Set the weights of the tokens in the pool",
  },
  {
    name: "Set Weights",
    description: "Set the weights of the tokens in the pool",
  },
];

export default function CreatePageContent() {
  const {
    error,
    swapFee,
    step,
    initialPrice,
    isBaseTokenInput,
    tokenA,
    tokenB,
    baseToken,
    quoteToken,
    baseAmount,
    quoteAmount,
    setBaseAmount,
    setQuoteAmount,
    setTokenA,
    setTokenB,
    setIsBaseTokenInput,
    setInitialPrice,
    setSwapFee,
    setStep,
  } = useCreateTokenWeights();

  console.log({ isBaseTokenInput });
  return (
    <div className="flex max-w-[500px] flex-col items-center justify-center gap-8">
      <div className="mt-8 w-full">
        {step === Steps.SET_TOKEN_WEIGHTS && (
          <CreatePool
            tokenA={tokenA}
            tokenB={tokenB}
            error={error}
            setTokenA={setTokenA}
            setTokenB={setTokenB}
            onContinue={() => !error && setStep(Steps.SET_INITIAL_LIQUIDITY)}
          />
        )}
        {step === Steps.SET_SWAP_FEES && (
          <CreatePoolFeeData
            swapFee={swapFee}
            error={error}
            setSwapFee={setSwapFee}
            onContinue={() => !error && setStep(Steps.SET_INITIAL_LIQUIDITY)}
            onBack={() => setStep(Steps.SET_TOKEN_WEIGHTS)}
          />
        )}
        {step === Steps.SET_INITIAL_LIQUIDITY && (
          <CreatePoolInitialLiquidity
            baseToken={baseToken}
            quoteToken={quoteToken}
            error={error}
            initialPrice={initialPrice}
            onInitialPriceChange={setInitialPrice}
            setIsBaseTokenInput={setIsBaseTokenInput}
            onContinue={() => !error && setStep(Steps.CREATE_POOL_PREVIEW)}
            onBack={() => setStep(Steps.SET_TOKEN_WEIGHTS)}
            baseTokenAmount={baseAmount}
            quoteTokenAmount={quoteAmount}
            setBaseAmount={setBaseAmount}
            setQuoteAmount={setQuoteAmount}
          />
        )}
        {step === Steps.CREATE_POOL_PREVIEW && (
          <CreatePoolPreview
            baseToken={baseToken}
            quoteToken={quoteToken}
            baseAmount={baseAmount}
            quoteAmount={quoteAmount}
            isBaseTokenInput={isBaseTokenInput}
            initialPrice={initialPrice}
            error={undefined}
            onBack={() => setStep(Steps.SET_INITIAL_LIQUIDITY)}
          />
        )}
      </div>
      <div>
        <CreatePoolStepper step={step} steps={steps} setStep={setStep} />
      </div>
    </div>
  );
}
