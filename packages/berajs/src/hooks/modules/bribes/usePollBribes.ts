import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, getAddress } from "viem";
import { erc20ABI, usePublicClient, type Address } from "wagmi";

import { BRIBE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";
import { usePollActiveValidators } from "../staking";

export interface RawBribe {
	validator: string;
	reward: {
		amount: bigint;
		token: string;
	}[];
}

export interface FormattedBribe {
	validatorName: string | undefined;
	validatorAddress: string | undefined;
	totalValue: number;
	rewards: {
		amount: number;
		token: string;
		price: number;
		value: number;
	}[];
}

export const usePollBribes = () => {
	const publicClient = usePublicClient();
	const { account } = useBeraJs();

	const method = "previewClaimValidatorBribes";
	const QUERY_KEY = [method, account];
	const { isLoading } = useSWR(
		QUERY_KEY,
		async () => {
			try {
				const result = (await publicClient.readContract({
					address: process.env.NEXT_PUBLIC_ERC20BRIBEMODULE_ADDRESS as Address,
					abi: BRIBE_PRECOMPILE_ABI,
					functionName: method,
					args: [account],
				})) as any[];
				return result;
			} catch (e) {
				console.log(e);
				return undefined;
			}
		},
		{
			refreshInterval: POLLING.NORMAL,
		},
	);

	const useBribes = () => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return data;
	};

	const useTotalBribes = (prices: any) => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return useMemo(() => {
			if (data === undefined || prices === undefined) return 0;
			let total = 0;
			data.forEach((bribe: any) => {
				const t = bribe.reward?.reduce(
					(acc: number, bribe: { amount: bigint; token: string }) => {
						return (
							acc +
							Number(formatUnits(bribe.amount, 18)) *
								prices[getAddress(bribe.token)]
						);
					},
					0,
				);
				total = total + t;
			});
			return total;
		}, [data, prices]);
	};

	const useBribeTokens = () => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return useMemo(() => {
			if (data === undefined) return [];
			const list: any[] = [];
			data.forEach((bribe: any) => {
				const t = bribe.reward?.map((bribe: { token: string }) => bribe.token);

				list.push(...t);
			});
			return [...new Set(list.flat())];
		}, [data]);
	};

	interface Call {
		abi: typeof erc20ABI;
		address: `0x${string}`;
		functionName: string;
		args: any[];
	}

	const useBribeTokensSymbol = () => {
		const tokens = useBribeTokens();
		const { networkConfig } = useBeraConfig();
		const QUERY_KEY = ["useBribeTokensSymbol", tokens];
		const { data, isLoading } = useSWRImmutable(QUERY_KEY, async () => {
			if (tokens === undefined || tokens.length === 0) return [];
			const call: Call[] = tokens?.map((address: string) => ({
				address: address as Address,
				abi: erc20ABI,
				functionName: "symbol",
				args: [],
			}));

			const result = await publicClient.multicall({
				contracts: call,
				multicallAddress: networkConfig.precompileAddresses
					.multicallAddress as Address,
			});

			const symbolDictionary: Record<string, string> = {};
			result.forEach((res: any, index) => {
				symbolDictionary[tokens[index]] = res.result;
			});

			return symbolDictionary;
		});
		return { data, isLoading };
		// const publicClient = usePublicClient();
		// const { networkConfig } = useBeraConfig();
		// return useMemo(async () => {
		//   const call: Call[] = tokens?.map((address: string) => ({
		//     address: address as `0x${string}`,
		//     abi: erc20ABI,
		//     functionName: "symbol",
		//     args: [address],
		//   }));
		//     const result = await publicClient.multicall({
		//       contracts: call,
		//       multicallAddress: networkConfig.precompileAddresses
		//         .multicallAddress as Address,
		//     });
		// }, [tokens])
	};
	const useValidatorBribeTotal = (validatorAddress: string, prices: any) => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return useMemo(() => {
			if (data === undefined || prices === undefined) return 0;
			const validatorBribe = data.find(
				(bribe: any) => bribe.validator === validatorAddress,
			);
			if (validatorBribe === undefined) return 0;
			return validatorBribe.reward?.reduce(
				(acc: number, bribe: { amount: bigint; token: string }) => {
					return (
						acc +
						Number(formatUnits(bribe.amount, 18)) *
							prices[getAddress(bribe.token)]
					);
				},
				0,
			);
		}, [data, validatorAddress, prices]);
	};

	const useValidatorUserBribes = (validatorAddress: string) => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return useMemo(() => {
			if (data === undefined) return [];
			const entry = data.find(
				(bribe: any) =>
					bribe.validator.toLowerCase() === validatorAddress.toLowerCase(),
			);
			if (entry === undefined) return [];
			return entry.reward?.map((bribe: { token: string }) => bribe.token);
		}, [data]);
	};

	const useFormattedValidatorUserBribes = (prices: any) => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		const { useActiveValidators } = usePollActiveValidators();
		const activeValidators = useActiveValidators();
		return useMemo(() => {
			if (
				data === undefined ||
				prices === undefined ||
				activeValidators === undefined
			)
				return [];
			return data.map((bribe: RawBribe) => {
				const validator = activeValidators.find(
					(validator: any) =>
						validator.operatorAddr.toLowerCase() ===
						bribe.validator.toLowerCase(),
				);
				const total = bribe.reward?.reduce(
					(acc: number, bribe: { amount: bigint; token: string }) => {
						return (
							acc +
							Number(formatUnits(bribe.amount, 18)) *
								prices[getAddress(bribe.token)]
						);
					},
					0,
				);

				const formattedRewards = bribe.reward?.map(
					(bribe: { amount: bigint; token: string }) => {
						return {
							amount: Number(formatUnits(bribe.amount, 18)),
							token: bribe.token,
							price: prices[getAddress(bribe.token)],
							value:
								Number(formatUnits(bribe.amount, 18)) *
								prices[getAddress(bribe.token)],
						};
					},
				);
				return {
					validatorName: validator?.description.moniker,
					validatorAddress: validator?.operatorAddr,
					totalValue: total,
					rewards: formattedRewards,
				};
			});
		}, [data, prices, activeValidators]);
	};
	return {
		useBribes,
		useTotalBribes,
		useBribeTokens,
		useValidatorBribeTotal,
		useValidatorUserBribes,
		useFormattedValidatorUserBribes,
		useBribeTokensSymbol,
		isLoading,
		QUERY_KEY,
	};
};
