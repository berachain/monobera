"use client";

import { useCallback, useReducer } from "react";
import { usePublicClient, useWalletClient } from "wagmi";
import { prepareWriteContract } from "wagmi/actions";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraJs } from "~/contexts";
import { usePollTransactionCount } from "../usePollTransactionCount";
import { TransactionFailedError } from "./error";
import Details from '../../../../../apps/bgt-station/src/app/dashboard/components/details';
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
      onLoading && onLoading();
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

        receipt = await walletClient?.writeContract({
          address: address,
          abi: abi,
          functionName: functionName,
          value: value === 0n ? undefined : value,
          args: [...params],
          account: account,
          nonce: userNonce,
          // chain: undefined,
        });
        dispatch({ type: ActionEnum.SUBMITTING });

        onSubmission && onSubmission(receipt);
        const confirmationReceipt: any =
          await publicClient.waitForTransactionReceipt({
            hash: receipt,
            pollingInterval: 5000,
            timeout: 120000,
            confirmations: 2,
          });
        if (confirmationReceipt?.status === "success") {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess && onSuccess(receipt);
        } else {
          // TODO: Add error txn hash here (reverted txns broken on polaris anyways)
          const e = new TransactionFailedError();
          onError && onError(e);
        }
      } catch (e: any) {
        console.log('reee',e.details);
        let finalMsg = 'Something went wrong. Please Try again'
        const errormsg = e?.details
        if(errormsg?.contains('gasLimit')) {
          finalMsg = 'It seems an RPC error has occurred. Please try your request once more later.'
        } else if (
          errormsg?.contains('internal')
        ) {

        }
        dispatch({ type: ActionEnum.ERROR });
        onError && onError({
          message: finalMsg
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
