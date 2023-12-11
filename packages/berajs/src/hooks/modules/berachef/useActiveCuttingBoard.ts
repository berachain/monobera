import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { BGT_PRECOMPILE_ABI } from "~/config";
import { useBeraConfig } from "~/contexts";

export const useActiveCuttingBoard = (validatorAddress: `0x${string}`) => {
	const publicClient = usePublicClient();
	const { networkConfig } = useBeraConfig();

	const method = "getActiveCuttingBoard";
	const QUERY_KEY = [validatorAddress, method];
	return useSWRImmutable(QUERY_KEY, async () => {
		const result = await publicClient.readContract({
			address: networkConfig.precompileAddresses
				.erc20BgtAddress as `0x${string}`,
			abi: BGT_PRECOMPILE_ABI,
			functionName: method,
			args: [validatorAddress],
		});

		return result;
	});
};
