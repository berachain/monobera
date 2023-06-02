"use client";

import { useState } from "react";

import { CreatePool } from "~/components/create-pool";
import { CreatePoolFeeData } from "~/components/create-pool-feedata";
import { CreatePoolInitialLiquidity } from "~/components/create-pool-initial-liquidity";
import {
  CreatePoolStepper,
  type IStep,
} from "~/components/create-pool-stepper";
import useCreateTokenWeights from "~/hooks/useCreateTokenWeights";

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
export default function Create() {
  const {
    tokenWeights,
    totalWeight,
    error,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenWeightChange,
    onTokenBalanceChange,
    onLock,
    onUnlock,
  } = useCreateTokenWeights();

  const [step, setStep] = useState(0);
  const [swapFee, setSwapFee] = useState(0);

  return (
    <div className="mx-8 grid grid-cols-5 gap-4">
      <div className="col-span-1 hidden md:grid">
        <CreatePoolStepper step={step} steps={steps} setStep={setStep} />
      </div>
      <div className="col-span-5 md:col-span-3">
        {step === 0 && (
          <CreatePool
            tokenWeights={tokenWeights}
            totalWeight={totalWeight}
            error={error}
            onTokenSelection={onTokenSelection}
            onRemove={onRemove}
            onTokenWeightChange={onTokenWeightChange}
            onLock={onLock}
            onUnlock={onUnlock}
            onAddToken={onAddToken}
            onContinue={() => !error && setStep(1)}
          />
        )}
        {step === 1 && (
          <CreatePoolFeeData
            swapFee={swapFee}
            setSwapFee={setSwapFee}
            onContinue={() => !error && setStep(2)}
          />
        )}
        {step === 2 && (
          <CreatePoolInitialLiquidity
            tokenWeights={tokenWeights}
            error={error}
            onTokenBalanceChange={onTokenBalanceChange}
            onContinue={() => !error && setStep(3)}
          />
        )}
      </div>
      <div className="col-span-1 hidden md:grid" />
    </div>
  );
}
