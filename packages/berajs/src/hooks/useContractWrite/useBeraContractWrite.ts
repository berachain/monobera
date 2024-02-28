"use client";

import { useCallback, useReducer } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { prepareWriteContract } from "wagmi/actions";

import { getErrorMessage } from "~/utils/errorMessages";
import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraConfig, useBeraJs } from "~/contexts";
import { usePollTransactionCount } from "../usePollTransactionCount";
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
  const { networkConfig } = useBeraConfig();

  const { useTransactionCount, refresh } = usePollTransactionCount({
    address: account,
  });

  const userNonce = useTransactionCount();

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
      let receipt: any | undefined;
      try {
        // TODO: figure out clean way to early detect errors and effectively show them on the UI
        const { request: _request } = await prepareWriteContract({
          address: address,
          abi: abi,
          functionName: functionName,
          args: params,
          value: value,
          nonce: userNonce,
        });
        // Directly pass request to writeContract

        receipt = await walletClient?.writeContract(_request);
        dispatch({ type: ActionEnum.SUBMITTING });

        if (receipt) {
          onSubmission?.(receipt);
          const confirmationReceipt: any =
            await publicClient.waitForTransactionReceipt({
              hash: receipt,
              pollingInterval: 5000,
              timeout: 120000,
              confirmations: 2,
            });
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
      walletClient,
      account,
      publicClient,
      userNonce,
      networkConfig,
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
