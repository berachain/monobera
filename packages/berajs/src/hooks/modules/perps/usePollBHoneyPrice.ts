import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BTOKEN_ABI } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollBHoneyPrice = () => {
	const publicClient = usePublicClient();
	const method = "shareToAssetsPrice";
	const QUERY_KEY = ["bhoney", method];
	const { isLoading } = useSWR(
		QUERY_KEY,
		async () => {
			try {
				const result = await publicClient.readContract({
					address: process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
					abi: BTOKEN_ABI,
					functionName: method,
					args: [],
				});
				return result;
			} catch (e) {
				console.error(e);
				return undefined;
			}
		},
		{
			refreshInterval: POLLING.FAST,
		},
	);

	const useHoneyPrice = () => {
		const { data = 0 } = useSWRImmutable(QUERY_KEY);
		return data;
	};

	const useFormattedHoneyPrice = () => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		if (!data) return 0;
		return 1 / Number(formatUnits(data, 18));
	};
	return {
		useFormattedHoneyPrice,
		useHoneyPrice,
		isLoading,
	};
};
