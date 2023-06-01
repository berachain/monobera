import { useCallback, useReducer } from "react";
import { EthSignType } from "@keplr-wallet/types";
import axios from "axios";
import { encodeFunctionData, toHex } from "viem";
import { useFeeData, usePublicClient } from "wagmi";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraConfig, useBeraJs } from "~/contexts";
import { getBaseAccount, type BaseAccount } from "~/services";
import { TransactionFailedError } from "./error";
import { type IContractWrite, type IUseContractWrite } from "./types";

async function broadcastTransaction(dynamicFeeTx: any) {
  try {
    const jsonRpcPayload = {
      jsonrpc: "2.0",
      method: "eth_sendRawTransaction",
      params: [dynamicFeeTx],
      id: 1,
    };

    // Send the JSON-RPC request to the Ethereum node
    const response = await axios.post("http://localhost:8545", jsonRpcPayload);
    return response;
  } catch (e) {
    throw e;
  }
}

// a hook for only using keplr contract write
const useKeplrContractWrite = ({
  onSuccess,
  onError,
  onLoading,
  onSubmission,
}: IUseContractWrite = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { bech32Address, account } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const { data: feeData } = useFeeData();
  const publicClient = usePublicClient();

  const write = useCallback(
    async ({
      address,
      abi,
      functionName,
      params,
    }: // txnName = "",
    IContractWrite) => {
      try {
        if (!account) throw new Error("Need an account");
        dispatch({ type: ActionEnum.LOADING });
        onLoading && onLoading();
        const baseAccount: BaseAccount = await getBaseAccount(
          networkConfig.rest,
          bech32Address,
        );

        const encodedData = encodeFunctionData({
          abi: abi,
          functionName: functionName,
          args: params,
        });

        const gas = await publicClient.estimateContractGas({
          address: address,
          abi: abi,
          functionName: functionName,
          args: params,
          account: account,
        });

        const dynamicFeeTx = {
          data: encodedData,
          gasLimit: toHex(gas),
          maxPriorityFeePerGas: toHex(feeData?.maxPriorityFeePerGas ?? ""), // eth_maxPriorityFeePerGas (eip 1559)
          maxFeePerGas: toHex(feeData?.maxFeePerGas ?? ""), // eth_baseFee + maxPriorityFeePerGas)*somescalingfactor maybe 1.01 (the max gwei the user is willing to pay)
          nonce: toHex(Number(baseAccount.sequence)),
          to: address,
          chainId: toHex(networkConfig.chain.id),
          type: 2,
        };

        const signature = await window.keplr
          ?.signEthereum(
            networkConfig.chainId,
            bech32Address ?? "",
            JSON.stringify(dynamicFeeTx),
            EthSignType.TRANSACTION,
          )
          .catch((e: any) => {
            console.log("error", e);
          });
        onSubmission && onSubmission();

        const receipt: any = await broadcastTransaction(toHex(signature ?? ""));

        if (receipt?.status === 200) {
          dispatch({ type: ActionEnum.SUCCESS });
          onSuccess && onSuccess(receipt.data.result);
          return receipt.data.result;
        } else {
          dispatch({ type: ActionEnum.ERROR });
          const e = new TransactionFailedError();
          onError && onError(e);
          throw e;
        }
      } catch (e: any) {
        onError && onError(e);
        return;
      }
    },
    [
      onLoading,
      networkConfig.rest,
      networkConfig.chain.id,
      networkConfig.chainId,
      bech32Address,
      publicClient,
      account,
      feeData?.maxPriorityFeePerGas,
      feeData?.maxFeePerGas,
      onSubmission,
      onSuccess,
      onError,
    ],
  );

  return {
    isLoading: state.confirmState === "loading",
    isSuccess: state.confirmState === "success",
    isError: state.confirmState === "fail",
    write,
  };
};

export default useKeplrContractWrite;
