"use client";

import { useCallback, useReducer } from "react";
import {
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { prepareWriteContract } from "wagmi/actions";

import { isConnectionKeplr } from "~/utils/isConnectionKeplr";
import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraJs } from "~/contexts";
import { TransactionFailedError } from "./error";
import {
  type IContractWrite,
  type IUseContractWrite,
  type useContractWriteApi,
} from "./types";
import useKeplrContractWrite from "./useKeplrContractWrite";

// used for writing to contract when both keplr and wagmi connectors are available
const useBeraContractWrite = ({
  onSuccess,
  onError,
  onLoading,
  onSubmission,
}: IUseContractWrite = {}): useContractWriteApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { write: keplrWrite } = useKeplrContractWrite();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const write = useCallback(
    async ({
      address,
      abi,
      functionName,
      params,
    }: // txnName = "",
    IContractWrite): Promise<void> => {
      dispatch({ type: ActionEnum.LOADING });
      onLoading && onLoading();
      let receipt: any | undefined;
      try {
        const { request } = await prepareWriteContract({
          address: address,
          abi: abi,
          functionName: functionName,
          args: params,
        });

        console.log("ERRROR", request);

        if (isConnectionKeplr()) {
          receipt = await keplrWrite({ abi, address, params, functionName });
        } else {
          receipt = await walletClient?.writeContract({
            address: address,
            abi: abi,
            functionName: functionName,
            args: [...params],
            account: account,
            chain: undefined,
          });
        }
        onSubmission && onSubmission();
        const confirmationReceipt: any =
          await publicClient.waitForTransactionReceipt({
            hash: receipt,
            pollingInterval: 200,
          });
        if (confirmationReceipt?.status === "success") {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess && onSuccess(receipt);
          return;
        } else {
          const e = new TransactionFailedError();
          onError && onError(e);
          return;
        }
      } catch (e: any) {
        console.log(e);
        dispatch({ type: ActionEnum.ERROR });
        onError && onError(e);
        return;
      }
    },
    [
      keplrWrite,
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
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    write,
  };
};

export default useBeraContractWrite;
