import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollPreviewAddLiquidityStaticPrice = (
	poolAddress: `0x${string}`,
	assets: Token[],
	amounts: number[],
) => {
	const publicClient = usePublicClient();
	const { networkConfig } = useBeraConfig();

	const method = "getPreviewAddLiquidityStaticPrice";
	const addresses = assets.map((asset: Token) => asset.address);
	const formattedAmounts = amounts.map((amount: number, i) =>
		parseUnits(`${amount}`, assets[i]?.decimals ?? 18),
	);
	const QUERY_KEY = [poolAddress, ...addresses, ...formattedAmounts, method];
	useSWR(
		QUERY_KEY,
		async () => {
			const result = await publicClient.readContract({
				address: networkConfig.precompileAddresses.erc20DexAddress as Address,
				abi: DEX_PRECOMPILE_ABI,
				functionName: method,
				args: [poolAddress, addresses, formattedAmounts],
			});

			return result;
		},
		{
			refreshInterval: POLLING.FAST,
		},
	);

	const usePreviewAddLiquidityStaticPrice = () => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		return data;
	};
	return {
		usePreviewAddLiquidityStaticPrice,
	};
};
