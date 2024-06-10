import { useCallback, useReducer } from "react";
import { usePublicClient, useWriteContract } from "wagmi";

import { getErrorMessage } from "~/utils/errorMessages";
import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraJs } from "~/contexts";
import { usePollTransactionCount } from "../usePollTransactionCount";
import { TransactionFailedError } from "./error";
import {
  type IContractWrite,
  type IUseContractWriteArgs,
  type useContractWriteApi,
} from "./types";

const increaseByPercentage = (value: bigint, percentage: number) => {
  return value + (value * BigInt(percentage)) / BigInt(100);
};

const useBeraContractWrite = ({
  onSuccess,
  onError,
  onLoading,
  onSubmission,
}: IUseContractWriteArgs = {}): useContractWriteApi => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const { refresh } = usePollTransactionCount({
    address: account,
  });

  const write = useCallback(
    async ({
      address,
      abi,
      functionName,
      params,
      value = 0n,
      gasLimit = 2000000n,
    }: IContractWrite): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      onLoading?.();
      let receipt: any | undefined;
      if (!publicClient) return;
      try {
        // TODO: figure out clean way to early detect errors and effectively show them on the UI

        const { request } = await publicClient.simulateContract({
          address: address,
          abi: abi,
          functionName: functionName,
          args: params,
          value: value,
          account: account,
        });
        receipt = await writeContractAsync({
          ...request,
          gas: gasLimit ?? request.gas,
        });
        dispatch({ type: ActionEnum.SUBMITTING });
        if (receipt) {
          onSubmission?.(receipt);
          const confirmationReceipt: any =
            await publicClient.waitForTransactionReceipt({
              hash: receipt,
              pollingInterval: 2000,
              timeout: 120000,
              confirmations: 1,
            }).catch(async (e) => {
              console.log('CAUGHT ERROR')
              return await publicClient.waitForTransactionReceipt({
                hash: receipt,
                pollingInterval: 2000,
                timeout: 120000,
                confirmations: 1,
            })});
          if (confirmationReceipt?.status === "success") {
            dispatch({ type: ActionEnum.SUCCESS });
            onSuccess?.(receipt);
          } else {
            if (process.env.VERCEL_ENV !== "production")
              console.log(confirmationReceipt);
            // TODO: Add error txn hash here (reverted txns broken on polaris anyways)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const e = new TransactionFailedError();
            onError?.({
              message:
                getErrorMessage(e) ?? "Something went wrong. Please Try again",
              hash: receipt,
            });
          }
        }
      } catch (e: any) {
        if (process.env.VERCEL_ENV !== "production") {
          console.log(e);
        }
        console.log(e);
        dispatch({ type: ActionEnum.ERROR });
        const finalMsg = getErrorMessage(e);
        onError?.({
          message: finalMsg,
          hash: e?.transactionHash,
        });
      } finally {
        await refresh();
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
      refresh,
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

export default useBeraContractWrite;
