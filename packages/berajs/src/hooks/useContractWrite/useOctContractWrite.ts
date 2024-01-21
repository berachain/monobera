"use client";

import { useCallback, useReducer } from "react";
import { perpsEndpoints } from "@bera/config";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { encodeFunctionData } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";
import { prepareWriteContract } from "wagmi/actions";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { TRADING_ABI } from "~/config";
import { useBeraConfig, useBeraJs } from "~/contexts";
import { useOct } from "../useOct";
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

  const { isOctReady, octPrivKey } = useOct();

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
        if (!isOctReady) {
          const { request: _request } = await prepareWriteContract({
            address: address,
            abi: abi,
            functionName: functionName,
            args: params,
          });

          hash = await walletClient?.writeContract({
            account: account,
            address: address,
            abi: abi,
            functionName: functionName,
            value: value,
            args: [...params],
            chain: undefined,
          });
        } else if (isOctReady) {
          const provider = new JsonRpcProvider(
            process.env.NEXT_PUBLIC_JSON_RPC_URL,
          );

          const ethersWallet = new Wallet(octPrivKey, provider);

          const contract = new Contract(address, TRADING_ABI, ethersWallet);

          const data = encodeFunctionData({
            abi: abi,
            functionName: functionName,
            args: params,
          });

          const payload = [account, data];
          // @ts-ignore
          const transaction = await contract["delegatedAction"](...payload, {
            gasLimit: 10000000n,
          });
          const txResponse = await transaction.wait();
          hash = txResponse.hash;
        }
        dispatch({ type: ActionEnum.SUBMITTING });

        onSubmission && onSubmission(hash);
        const confirmationReceipt: any =
          await publicClient.waitForTransactionReceipt({
            hash: hash,
            pollingInterval: 5000,
            timeout: 120000,
            confirmations: 2,
          });

        const botConfirmation = await fetch(
          `${perpsEndpoints}/canceled/${hash}`,
        );
        const botConfirmationResult = await botConfirmation.json();
        const cancelReason = botConfirmationResult.result.cancel_reason;
        if (confirmationReceipt?.status === "success" && cancelReason === "") {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess && onSuccess(hash);
        } else if (cancelReason !== "") {
          onError && onError(cancelReason);
        } else {
          onError && onError("Transaction has failed");
        }
      } catch (e: any) {
        console.log(e);
        dispatch({ type: ActionEnum.ERROR });
        onError && onError(undefined);
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
      isOctReady,
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
