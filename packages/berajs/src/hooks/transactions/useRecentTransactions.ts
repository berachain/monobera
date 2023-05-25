import { useEffect, useState } from "react";

import { useBeraJs } from "../../contexts";
import { useChainId } from "../useChainId";
import { useTransactionStore } from "./TransactionStoreContext";
import type { Transaction } from "./transactionStore";

export function useRecentTransactions(): Transaction[] {
  const store = useTransactionStore();
  const { account } = useBeraJs();
  const chainId = useChainId();

  const [transactions, setTransactions] = useState(() =>
    store && account && chainId ? store.getTransactions(account, chainId) : [],
  );

  useEffect(() => {
    if (store && account && chainId) {
      setTransactions(store.getTransactions(account, chainId));

      return store.onChange(() => {
        setTransactions(store.getTransactions(account, chainId));
      });
    }
  }, [store, account, chainId]);

  return transactions;
}
