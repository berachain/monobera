import { parseUnits } from "ethers";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

const EMPTY_INFO = [[""], [0n]];
export const usePollPreviewRemoveLiquidityOneSideOut = (
	poolAddress: `0x${string}` | undefined,
	assetOut: Token | undefined,
	sharesIn: string,
) => {
	const publicClient = usePublicClient();
	const { networkConfig } = useBeraConfig();

	const method = "getRemoveLiquidityOneSideOut";
	const QUERY_KEY = [poolAddress, assetOut?.address, sharesIn, method];
	useSWR(
		QUERY_KEY,
		async () => {
			if (!poolAddress || !assetOut) return EMPTY_INFO;
			const result = await publicClient
				.readContract({
					address: networkConfig.precompileAddresses.erc20DexAddress as Address,
					abi: DEX_PRECOMPILE_ABI,
					functionName: method,
					args: [poolAddress, assetOut.address, parseUnits(sharesIn, 18)],
				})
				.catch((e) => {
					console.log(e);
					return EMPTY_INFO;
				});

			return result ?? EMPTY_INFO;
		},
		{
			refreshInterval: POLLING.FAST,
			fallbackData: EMPTY_INFO,
		},
	);

	const usePreviewRemoveLiquidityOneSideOut = () => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return data;
	};
	return {
		usePreviewRemoveLiquidityOneSideOut,
	};
};
