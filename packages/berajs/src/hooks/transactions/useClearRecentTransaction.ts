import { useCallback } from "react";

import { useBeraJs } from "~/contexts";
import { useChainId } from "~/hooks/useChainId";
import { useTransactionStore } from "./TransactionStoreContext";

export function useClearRecentTransactions(): () => void {
	const store = useTransactionStore();
	const chainId = useChainId();
	const { account } = useBeraJs();

	return useCallback(() => {
		if (!account || !chainId) {
			throw new Error("No address or chain ID found");
		}

		store.clearTransactions(account, chainId);
	}, [store, account, chainId]);
}
