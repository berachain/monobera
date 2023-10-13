"use client";

import { useCallback, useReducer } from "react";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { usePublicClient, useWalletClient } from "wagmi";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraConfig, useBeraJs } from "~/contexts";
import { useOct } from "../useOct";
import { TransactionFailedError } from "./error";
import {
  type IContractWrite,
  type IUseContractWrite,
  type useContractWriteApi,
} from "./types";

const useOctContractWrite = ({
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

  const { isOctEnabled, octPrivKey } = useOct();

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
      let hash: any | undefined;
      try {
        if (!isOctEnabled()) {
          hash = await walletClient?.writeContract({
            account: account,
            address: address,
            abi: abi,
            functionName: functionName,
            value: value,
            args: [...params],
            chain: undefined,
          });
        } else if (isOctEnabled()) {
          const provider = new JsonRpcProvider(
            process.env.NEXT_PUBLIC_JSON_RPC_URL,
          );

          const ethersWallet = new Wallet(octPrivKey, provider);

          const contract = new Contract(address, abi, ethersWallet);

          // @ts-ignore
          const transaction = await contract[functionName](...params);
          const txResponse = await transaction.wait();
          hash = txResponse.hash;
        }
        dispatch({ type: ActionEnum.SUBMITTING });

        onSubmission && onSubmission(hash);
        const confirmationReceipt: any =
          await publicClient.waitForTransactionReceipt({
            hash: hash,
            pollingInterval: 200,
          });

        if (confirmationReceipt?.status === "success") {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess && onSuccess(hash);
        } else {
          // TODO: Add error txn hash here (reverted txns broken on polaris anyways)
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
      isOctEnabled,
      networkConfig,
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
