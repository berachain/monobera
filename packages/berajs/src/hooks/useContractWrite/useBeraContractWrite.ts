"use client";

import { useCallback, useReducer } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { prepareWriteContract } from "wagmi/actions";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraJs } from "~/contexts";
import { TransactionFailedError } from "./error";
import {
  type IContractWrite,
  type IUseContractWrite,
  type useContractWriteApi,
} from "./types";

const useBeraContractWrite = ({
  onSuccess,
  onError,
  onLoading,
  onSubmission,
}: IUseContractWrite = {}): useContractWriteApi => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const write = useCallback(
    async ({
      address,
      abi,
      functionName,
      params,
    }: IContractWrite): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      onLoading && onLoading();
      let receipt: any | undefined;
      try {
        // const { request } = await prepareWriteContract({
        //   address: address,
        //   abi: abi,
        //   functionName: functionName,
        //   args: params,
        // });

        // console.log("REQUEST", request);

        receipt = await walletClient?.writeContract({
          address: address,
          abi: abi,
          functionName: functionName,
          args: [...params],
          account: account,
          chain: undefined,
        });
        dispatch({ type: ActionEnum.SUBMITTING });

        onSubmission && onSubmission(receipt);
        const confirmationReceipt: any =
          await publicClient.waitForTransactionReceipt({
            hash: receipt,
            pollingInterval: 200,
          });
        if (confirmationReceipt?.status === "success") {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess && onSuccess(receipt);
        } else {
          // TODO: Add error txn hash here
          const e = new TransactionFailedError();
          onError && onError(e);
        }
      } catch (e: any) {
        console.log(e);
        dispatch({ type: ActionEnum.ERROR });
        onError && onError(e);
      }
    },
    [
      walletClient,
      account,
      publicClient,
      onSuccess,
      onError,
      onLoading,
      onSubmission,
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
