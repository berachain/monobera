import { useEffect, useState } from "react";
import { crocMultiSwapAddress, nativeTokenAddress } from "@bera/config";
import {
  ContractFunctionArgs,
  EstimateContractGasParameters,
  formatEther,
  parseEther,
} from "viem";
import { usePublicClient } from "wagmi";

export enum TXN_GAS_USED_ESTIMATES {
  SWAP = 250000,
  WRAP = 100000,
  SIMPLE = 25000,
}

const getGeneralGasEstimate = async (
  publicClient: ReturnType<typeof usePublicClient>,
  gasUsedOverride?: number,
) => {
  const feesPerGasEstimate = await publicClient?.estimateFeesPerGas();
  const gas = gasUsedOverride
    ? BigInt(gasUsedOverride)
    : await publicClient?.estimateGas({
        account: nativeTokenAddress,
        to: crocMultiSwapAddress,
        value: parseEther("1"),
      });
  const estimatedTxFeeInBera =
    feesPerGasEstimate?.maxPriorityFeePerGas &&
    gas &&
    parseFloat(`${feesPerGasEstimate.maxPriorityFeePerGas * gas}`) * 4;

  return estimatedTxFeeInBera
    ? {
        estimatedTxFeeInBera: parseFloat(
          formatEther(BigInt(estimatedTxFeeInBera)),
        ),
      }
    : undefined;
};

const getContractGasEstimate = async (
  publicClient: ReturnType<typeof usePublicClient>,
  contractArgs: any,
  gasUsedOverride?: number,
) => {
  const feesPerGasEstimate = await publicClient?.estimateFeesPerGas();
  const gas = gasUsedOverride
    ? BigInt(gasUsedOverride)
    : await publicClient?.estimateContractGas({ ...(contractArgs as any) });
  const estimatedTxFeeInBera =
    feesPerGasEstimate?.maxPriorityFeePerGas &&
    gas &&
    parseFloat(`${feesPerGasEstimate.maxPriorityFeePerGas * gas}`) * 4;
  return estimatedTxFeeInBera
    ? {
        estimatedTxFeeInBera: parseFloat(
          formatEther(BigInt(estimatedTxFeeInBera)),
        ),
      }
    : undefined;
};

interface UseGasDataReturnType {
  estimatedBeraFee: number | undefined;
}

/**
 * Hook that returns estimated gas data, for a general unspecified transaction or a specific one.
 * When contract args are provided, performs a more exact estimate with a 4x safety margin, performs an 4x padded but inaccurate estimation if not.
 * @param {ContractFunctionArgs} param0.contractArgs - contract args for a transaction that we want to estimate gas for.
 * @returns {UseGasDataReturnType} - returns the estimated gas data
 */
export const useGasData = ({
  contractArgs,
  gasUsedOverride,
}: {
  contractArgs?: EstimateContractGasParameters<any> | null;
  gasUsedOverride?: number;
} = {}): UseGasDataReturnType => {
  const publicClient = usePublicClient();

  const [estimatedBeraFee, setEstimatedBeraFee] = useState<
    number | undefined
  >();
  useEffect(() => {
    if (contractArgs === undefined) {
      getGeneralGasEstimate(publicClient, gasUsedOverride)
        .then((res: { estimatedTxFeeInBera: number } | undefined) => {
          if (!res) {
            throw new Error("failed to get general gas estimate");
          }
          setEstimatedBeraFee(res.estimatedTxFeeInBera);
        })
        .catch();
      return;
    }
    getContractGasEstimate(publicClient, contractArgs, gasUsedOverride)
      .then((res: { estimatedTxFeeInBera: number } | undefined) => {
        if (!res) {
          throw new Error("failed to get contract gas estimate");
        }
        setEstimatedBeraFee(res?.estimatedTxFeeInBera);
      })
      .catch((e: unknown) => {
        setEstimatedBeraFee(undefined);

        const isFalseAlarm =
          `${e}`.includes("Unable to decode signature") ||
          `${e}`.includes("insufficient allowance");

        if (!isFalseAlarm) {
          console.error("useGasData: ", e);
        }
      });
  }, [contractArgs]);

  return { estimatedBeraFee };
};
