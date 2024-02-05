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
import { useFindPool } from "~/hooks/useFindPool";

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
    tokenWeights,
    totalWeight,
    error,
    swapFee,
    step,
    initialPrice,
    setInitialPrice,
    onTokenSelection,
    onTokenWeightChange,
    onTokenBalanceChange,
    setSwapFee,
    setStep,
  } = useCreateTokenWeights();
  const { data: findDuplicatedPool, isLoading } = useFindPool(
    swapFee,
    tokenWeights,
  );

  return (
    <div className="flex max-w-[500px] flex-col items-center justify-center gap-8">
      <div className="mt-8 w-full">
        {step === Steps.SET_TOKEN_WEIGHTS && (
          <CreatePool
            tokenWeights={tokenWeights.sort((a, b) => {
              if (a.token === undefined) return 1;
              if (b.token === undefined) return -1;
              return 0;
            })}
            totalWeight={totalWeight}
            error={error}
            onTokenSelection={onTokenSelection}
            onTokenWeightChange={onTokenWeightChange}
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
            isDuplicatePool={findDuplicatedPool}
            isLoading={isLoading}
          />
        )}
        {step === Steps.SET_INITIAL_LIQUIDITY && (
          <CreatePoolInitialLiquidity
            tokenWeights={tokenWeights}
            error={error}
            initialPrice={initialPrice}
            onInitialPriceChange={setInitialPrice}
            onTokenBalanceChange={onTokenBalanceChange}
            onContinue={() => !error && setStep(Steps.CREATE_POOL_PREVIEW)}
            onBack={() => setStep(Steps.SET_TOKEN_WEIGHTS)}
          />
        )}
        {step === Steps.CREATE_POOL_PREVIEW && (
          <CreatePoolPreview
            tokenWeights={tokenWeights}
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
