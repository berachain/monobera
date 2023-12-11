import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";
import { usePollBHoneySupply } from "./usePollBHoneySupply";
import { usePollHoneyVaultBalance } from "./usePollHoneyVaultBalance";

export const usePollBHoneyCollateralization = () => {
	const { useFormattedHoneyVaultBalance } = usePollHoneyVaultBalance();

	const { useFormattedBHoneySupply } = usePollBHoneySupply();
	const honeyLocked = useFormattedHoneyVaultBalance();
	const bHoneySupply = useFormattedBHoneySupply();
	const method = "bhoney_collateralization";
	const QUERY_KEY = [method, honeyLocked, bHoneySupply];
	const { isLoading } = useSWR(
		QUERY_KEY,
		() => {
			try {
				if (honeyLocked !== 0 && bHoneySupply !== 0) {
					return Math.floor(honeyLocked / bHoneySupply) * 100 ?? 0;
				}
				return undefined;
			} catch (e) {
				console.error(e);
				return undefined;
			}
		},
		{
			refreshInterval: POLLING.FAST,
		},
	);

	const useBHoneyCollateralization = () => {
		const { data = undefined } = useSWRImmutable(QUERY_KEY);
		if (!data) return 0;
		return data;
	};

	return {
		useBHoneyCollateralization,
		isLoading,
	};
};
