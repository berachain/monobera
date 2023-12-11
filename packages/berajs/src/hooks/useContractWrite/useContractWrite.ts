"use client";

import { useCallback, useReducer } from "react";
import { usePublicClient, useWalletClient } from "wagmi";

import { ActionEnum, initialState, reducer } from "~/utils/stateReducer";
import { useBeraJs } from "~/contexts";
import { TransactionFailedError } from "./error";
import {
	type IContractWrite,
	type IUseContractWrite,
	type useContractWriteApi,
} from "./types";

// just a wrapper around wagmi
const useContractWrite = ({
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
		}: // txnName = "",
		IContractWrite): Promise<void> => {
			dispatch({ type: ActionEnum.LOADING });
			onLoading?.();
			let receipt: any | undefined;
			try {
				receipt = await walletClient?.writeContract({
					address: address,
					abi: abi,
					functionName: functionName,
					args: [...params],
					account: account,
					chain: undefined,
				});
				onSubmission?.(receipt);
				const confirmationReceipt: any =
					await publicClient.waitForTransactionReceipt({
						hash: receipt,
						pollingInterval: 200,
					});

				if (confirmationReceipt?.status === "success") {
					dispatch({ type: ActionEnum.SUCCESS });
					onSuccess?.(receipt);
				} else {
					dispatch({ type: ActionEnum.ERROR });
					const e = new TransactionFailedError();
					onError?.(e);
					throw e;
				}
			} catch (e: any) {
				dispatch({ type: ActionEnum.SUCCESS });
				onError?.(e);
				return;
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

export default useContractWrite;
