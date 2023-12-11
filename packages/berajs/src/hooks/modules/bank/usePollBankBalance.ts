import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BANK_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";

export const usePollBankBalance = (denom: string | undefined) => {
	const publicClient = usePublicClient();
	const { isConnected, account } = useBeraJs();
	const { networkConfig } = useBeraConfig();

	const method = "getBalance";
	const QUERY_KEY = [account, method, denom];
	const { isLoading } = useSWR(
		QUERY_KEY,
		async () => {
			if (isConnected && denom) {
				try {
					const result = await publicClient.readContract({
						address: networkConfig.precompileAddresses.bankAddress as Address,
						abi: BANK_PRECOMPILE_ABI,
						functionName: method,
						args: [account, denom],
					});
					return result;
				} catch (e) {
					console.error(e);
					return undefined;
				}
			}
		},
		{
			refreshInterval: POLLING.FAST,
		},
	);

	const useBankBalance = () => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return data;
	};

	const useFormattedBankBalance = () => {
		const { data = 0n } = useSWRImmutable(QUERY_KEY);
		return formatUnits(data, 18);
	};
	return {
		useFormattedBankBalance,
		useBankBalance,
		isLoading,
	};
};
