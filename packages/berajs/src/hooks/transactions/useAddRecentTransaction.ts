import { useCallback } from "react";

import { useBeraJs } from "~/contexts";
import { useChainId } from "~/hooks/useChainId";
import { useTransactionStore } from "./TransactionStoreContext";
import { type NewTransaction } from "./transactionStore";

export function useAddRecentTransaction(): (
  transaction: NewTransaction,
) => void {
  const store = useTransactionStore();
  const { account } = useBeraJs();
  const chainId = useChainId();

  return useCallback(
    (transaction: NewTransaction) => {
      if (!account || !chainId) {
        throw new Error("No address or chain ID found");
      }

      store.addTransaction(account, chainId, transaction);
    },
    [store, account, chainId],
  );
}
