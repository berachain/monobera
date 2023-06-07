"use client";

import dynamic from "next/dynamic";

import { CreatePool } from "~/components/create-pool/create-pool";
import { CreatePoolFeeData } from "~/components/create-pool/create-pool-feedata";
import { CreatePoolInitialLiquidity } from "~/components/create-pool/create-pool-initial-liquidity";
import { CreatePoolPreview } from "~/components/create-pool/create-pool-preview";
import {
  CreatePoolStepper,
  type IStep,
} from "~/components/create-pool/create-pool-stepper";
import useCreateTokenWeights, { Steps } from "~/hooks/useCreateTokenWeights";

const DynamicChart = dynamic(
  () => import("~/components/create-pool/create-pool-pie-chart"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

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
    swapFee,
    poolName,
    step,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenWeightChange,
    onTokenBalanceChange,
    onLock,
    onUnlock,
    setSwapFee,
    setPoolName,
    setStep,
  } = useCreateTokenWeights();

  return (
    <div className="grid auto-cols-fr grid-flow-col justify-center gap-4">
      <div className="col-span-1 hidden justify-end xl:flex">
        <CreatePoolStepper step={step} steps={steps} setStep={setStep} />
      </div>
      <div className="col-span-5 flex items-center justify-center lg:col-span-2 xl:col-span-1">
        {step === Steps.SET_TOKEN_WEIGHTS && (
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
            onContinue={() => !error && setStep(Steps.SET_SWAP_FEES)}
          />
        )}
        {step === Steps.SET_SWAP_FEES && (
          <CreatePoolFeeData
            swapFee={swapFee}
            error={error}
            setSwapFee={setSwapFee}
            onContinue={() => !error && setStep(Steps.SET_INITIAL_LIQUIDITY)}
          />
        )}
        {step === Steps.SET_INITIAL_LIQUIDITY && (
          <CreatePoolInitialLiquidity
            tokenWeights={tokenWeights}
            error={error}
            onTokenBalanceChange={onTokenBalanceChange}
            onContinue={() => !error && setStep(Steps.CREATE_POOL_PREVIEW)}
          />
        )}
        {step === Steps.CREATE_POOL_PREVIEW && (
          <CreatePoolPreview
            tokenWeights={tokenWeights}
            poolName={poolName}
            fee={swapFee}
            setPoolName={setPoolName}
            error={undefined}
          />
        )}
      </div>
      <div className="col-span-1 hidden xl:grid">
        <DynamicChart tokenWeights={tokenWeights} />
      </div>
    </div>
  );
}
