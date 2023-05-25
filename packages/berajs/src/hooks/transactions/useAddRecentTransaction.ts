import { useCallback } from "react";

import { useBeraJs } from "../../contexts";
import { useChainId } from "../useChainId";
import { useTransactionStore } from "./TransactionStoreContext";
import { NewTransaction } from "./transactionStore";

export function useAddRecentTransaction(): (
  transaction: NewTransaction,
) => void {
  const store = useTransactionStore();
  const { account } = useBeraJs();
  const chainId = useChainId();

  console.log(account, chainId);
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
