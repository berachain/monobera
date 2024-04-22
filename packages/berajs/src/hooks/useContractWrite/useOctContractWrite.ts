import { useCallback, useReducer } from "react";
import { jsonRpcUrl, perpsEndpoint } from "@bera/config";
import { Contract, Wallet, providers } from "ethers";
import { encodeFunctionData } from "viem";
import { usePublicClient, useWriteContract } from "wagmi";

import { getErrorMessage } from "~/utils/errorMessages";
import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { tradingAbi } from "~/abi";
import { useBeraJs } from "~/contexts";
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
  config,
}: IUseContractWrite): useContractWriteApi => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  if (!config) {
    throw new Error("Config is required");
  }

  const { isOctReady, octPrivKey } = useOct({
    config,
  });

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
            abi: abi,
            functionName: functionName,
            args: params,
            value: value,
            account: account,
          });

          hash = await writeContractAsync({ ...request, gas: 10000000n });
        } else if (isOctReady) {
          const provider = new providers.JsonRpcProvider(jsonRpcUrl);

          const ethersWallet = new Wallet(octPrivKey, provider);

          const contract = new Contract(address, tradingAbi, ethersWallet);

          const data = encodeFunctionData({
            abi: abi,
            functionName: functionName,
            args: params,
          });

          const payload = [account, data];
          // @ts-ignore
          const transaction = await contract.delegatedAction(...payload, {
            gasLimit: 10000000n,
          });
          const txResponse = await transaction.wait();
          hash = txResponse?.transactionHash;
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
          onError?.({ message: "Transaction has failed", hash: hash });
        }
      } catch (e: any) {
        // if (process.env.VERCEL_ENV !== "production") {
        console.log(e);
        // }
        dispatch({ type: ActionEnum.ERROR });
        const finalMsg = getErrorMessage(e);
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
