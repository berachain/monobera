import { useCallback, useReducer } from "react";
import { Address, encodeFunctionData } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { usePublicClient, useWriteContract } from "wagmi";

import {
  getErrorMessage,
  getCustomAppErrorMessages,
} from "~/utils/errorMessages";
import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { pythErrorsAbi, berpsErrorsAbi } from "~/abi";
import { useBeraJs } from "~/contexts";
import { BeraConfig } from "~/types";
import { useOct } from "../useOct";
import {
  type IContractWrite,
  type IUseContractWriteArgs,
  type useContractWriteApi,
} from "./types";

interface useOctContractWriteOptions {
  beraConfigOverride?: BeraConfig;
}

const useOctContractWrite = (
  { onSuccess, onError, onLoading, onSubmission }: IUseContractWriteArgs,
  options?: useOctContractWriteOptions,
): useContractWriteApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const { account, config: beraConfig } = useBeraJs();

  const { isOctReady, octPrivKey } = useOct(
    {},
    {
      beraConfigOverride: options?.beraConfigOverride ?? beraConfig,
    },
  );

  const write = useCallback(
    async ({
      address,
      abi,
      functionName,
      params,
      value = 0n,
    }: IContractWrite): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      onLoading?.();
      let hash: any | undefined;
      if (!publicClient) return;
      try {
        if (!isOctReady) {
          const { request } = await publicClient.simulateContract({
            address: address,
            abi: [...abi, ...pythErrorsAbi, ...berpsErrorsAbi],
            functionName: functionName,
            args: params,
            value: value,
            account: account,
          });

          hash = await writeContractAsync({ ...request, gas: 10000000n });
        } else if (isOctReady) {
          const data = encodeFunctionData({
            abi: [...abi, ...pythErrorsAbi, ...berpsErrorsAbi],
            functionName: functionName,
            args: params,
          });

          const delegatedActionArgs = [account, data];

          const octAccount = privateKeyToAccount(octPrivKey as Address);

          const { request } = await publicClient.simulateContract({
            address: address,
            abi: [...abi, ...pythErrorsAbi, ...berpsErrorsAbi],
            functionName: "delegatedAction",
            args: delegatedActionArgs as any[],
            value: value,
            account: octAccount,
          });

          hash = await writeContractAsync({ ...request, gas: 10000000n });
        }
        dispatch({ type: ActionEnum.SUBMITTING });

        onSubmission?.(hash);
        const confirmationReceipt: any =
          await publicClient.waitForTransactionReceipt({
            hash: hash,
            pollingInterval: 5000,
            timeout: 120000,
            confirmations: 1,
          });

        if (confirmationReceipt?.status === "success") {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess?.(hash);
        } else {
          console.log(
            "Received Error: ",
            confirmationReceipt?.status,
            "\n",
            "Hash: ",
            hash,
          );
          dispatch({ type: ActionEnum.ERROR });
          onError?.({ message: "Transaction has failed", hash: hash });
        }
      } catch (e: any) {
        console.log(
          "Receieved Error: ",
          e,
          "\n",
          "Error Message: ",
          getErrorMessage(e),
          "\n",
          "Raw Error: ",
          e.toString(),
        );
        dispatch({ type: ActionEnum.ERROR });
        let finalMsg = getCustomAppErrorMessages(e, "PERPS");
        if (!finalMsg) {
          finalMsg = getErrorMessage(e);
        }
        onError?.({ message: finalMsg, hash: e?.transactionHash });
      }
    },
    [
      writeContractAsync,
      account,
      publicClient,
      onSuccess,
      onError,
      onLoading,
      onSubmission,
      isOctReady,
    ],
  );

  return {
    isLoading: state.confirmState === "loading",
    isSubmitting: state.confirmState === "submitting",
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    write,
  };
};

export default useOctContractWrite;
