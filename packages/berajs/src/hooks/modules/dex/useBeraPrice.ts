import { type Address } from "viem";

import { usePollSwaps } from "./usePollSwaps";

export const useBeraPrice = () => {
	const { data } = usePollSwaps({
		tokenIn: process.env.NEXT_PUBLIC_WBERA_ADDRESS as Address,
		tokenOut: process.env.NEXT_PUBLIC_HONEY_ADDRESS as Address,
		swapKind: 0,
		amount: 1,
	});
	return Number(data?.formattedReturnAmount);
};
