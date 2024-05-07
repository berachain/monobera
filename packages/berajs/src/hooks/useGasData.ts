import { useEffect, useState } from "react";
import { crocMultiSwapAddress, nativeTokenAddress } from "@bera/config";
import {
  ContractFunctionArgs,
  EstimateContractGasParameters,
  formatEther,
  parseEther,
} from "viem";
import { usePublicClient } from "wagmi";

interface UseGasDataReturnType {
  estimatedBeraFee: number | undefined;
}

const getGeneralGasEstimate = async (
  publicClient: ReturnType<typeof usePublicClient>,
) => {
  return publicClient
    ?.estimateGas({
      account: nativeTokenAddress,
      to: crocMultiSwapAddress,
      value: parseEther("1"),
    })
    .then(async (gas: bigint) => {
      const feesPerGasEstimate = await publicClient?.estimateFeesPerGas();
      const estimatedTxFeeInBera =
        feesPerGasEstimate.maxFeePerGas &&
        parseFloat(`${feesPerGasEstimate.maxFeePerGas * gas}`) * 4;
      return estimatedTxFeeInBera
        ? {
            estimatedTxFeeInBera: parseFloat(
              formatEther(BigInt(estimatedTxFeeInBera)),
            ),
          }
        : undefined;
    });
};

const getContractGasEstimate = async (
  publicClient: ReturnType<typeof usePublicClient>,
  contractArgs: any,
) => {
  return publicClient
    ?.estimateContractGas({ ...(contractArgs as any) })
    .then(async (gas) => {
      const feesPerGasEstimate = await publicClient?.estimateFeesPerGas();
      const estimatedTxFeeInBera =
        feesPerGasEstimate.maxPriorityFeePerGas &&
        parseFloat(`${feesPerGasEstimate.maxPriorityFeePerGas * gas}`) * 4;
      return estimatedTxFeeInBera
        ? {
            estimatedTxFeeInBera: parseFloat(
              formatEther(BigInt(estimatedTxFeeInBera)),
            ),
          }
        : undefined;
    });
};

/**
 * Hook that returns estimated gas data, for a general unspecified transaction or a specific one.
 * When contract args are provided, performs a more exact estimate with a 4x safety margin, performs an 4x padded but inaccurate estimation if not.
 * @param {ContractFunctionArgs} param0.contractArgs - contract args for a transaction that we want to estimate gas for.
 * @returns {UseGasDataReturnType} - returns the estimated gas data
 */
export const useGasData = ({
  contractArgs,
}: {
  contractArgs?: EstimateContractGasParameters<any> | null;
} = {}): UseGasDataReturnType => {
  const publicClient = usePublicClient();

  const [estimatedBeraFee, setEstimatedBeraFee] = useState<
    number | undefined
  >();
  useEffect(() => {
    if (contractArgs === undefined) {
      getGeneralGasEstimate(publicClient)
        .then((res: { estimatedTxFeeInBera: number } | undefined) => {
          if (!res) {
            throw new Error("failed to get general gas estimate");
          }
          setEstimatedBeraFee(res.estimatedTxFeeInBera);
        })
        .catch();
      return;
    }
    getContractGasEstimate(publicClient, contractArgs)
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
