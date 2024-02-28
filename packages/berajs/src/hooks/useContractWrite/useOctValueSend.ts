"use client";

import { useCallback, useReducer } from "react";
import { Wallet, providers } from "ethers";
import { usePublicClient } from "wagmi";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useOct } from "../useOct";
import { TransactionFailedError } from "./error";
import {
  type IUseContractWrite,
  type IValueSend,
  type useTxnSendWriteApi,
} from "./types";

const useOctValueSend = ({
  onSuccess,
  onError,
  onLoading,
  onSubmission,
}: IUseContractWrite = {}): useTxnSendWriteApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const publicClient = usePublicClient();
  const { isOctEnabled, octPrivKey } = useOct();

  const write = useCallback(
    async ({ address, value }: IValueSend): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      onLoading?.();
      let hash: any | undefined;
      try {
        const provider = new providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_JSON_RPC_URL,
        );

        const ethersWallet = new Wallet(octPrivKey, provider);

        const transaction = await ethersWallet.sendTransaction({
          to: address,
          value: value,
        });
        const txResponse = await transaction.wait();
        hash = txResponse?.transactionHash;

        dispatch({ type: ActionEnum.SUBMITTING });

        onSubmission?.(hash);
        const confirmationReceipt: any =
          await publicClient.waitForTransactionReceipt({
            hash: hash,
            pollingInterval: 5000,
            timeout: 120000,
          });

        if (confirmationReceipt?.status === "success") {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess?.(confirmationReceipt);
          return;
        }
        onError?.({ message: "Transaction failed", hash: hash });
      } catch (e: any) {
        console.log(e);
        dispatch({ type: ActionEnum.ERROR });
        onError?.({
          message: e?.message ?? "Transaction failed",
          hash: e?.transactionHash,
        });
      }
    },
    [
      publicClient,
      onSuccess,
      onError,
      isOctEnabled,
      octPrivKey,
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

export default useOctValueSend;
