import React, { createContext } from "react";

export interface ReceiptContextIF {
  sessionReceipts: Array<string>;
  pendingTransactions: Array<string>;
  transactionsByType: Array<TransactionByType>;
  addTransactionByType: (txByType: TransactionByType) => void;
  addReceipt: (receipt: string) => void;
  addPendingTx: (tx: string) => void;
  updateTransactionHash: (oldHash: string, newHash: string) => void;
  removePendingTx: (pendingTx: string) => void;
  removeReceipt: (txHash: string) => void;
  resetReceiptData: () => void;
}

interface TransactionByType {
  txHash: string;
  txAction?:
    | "Sell"
    | "Buy"
    | "Add"
    | "Remove"
    | "Harvest"
    | "Claim"
    | "Reposition";
  txType:
    | "Market"
    | "Limit"
    | "Range"
    | "Deposit"
    | "Withdraw"
    | "Transfer"
    | "Init"
    | "Approve";
  txDescription: string;
  txDetails?: {
    baseAddress: string;
    quoteAddress: string;
    poolIdx: number;
    baseSymbol?: string;
    quoteSymbol?: string;
    baseTokenDecimals?: number;
    quoteTokenDecimals?: number;
    isAmbient?: boolean;
    lowTick?: number;
    highTick?: number;
    isBid?: boolean;
    gridSize?: number;
  };
}

export const ReceiptContext = createContext<ReceiptContextIF>(
  {} as ReceiptContextIF,
);

const ReceiptContextProvider = (props: { children: React.ReactNode }) => {
  const [sessionReceipts, setSessionReceipts] = React.useState<string[]>([]);
  const [pendingTransactions, setPendingTransactions] = React.useState<
    string[]
  >([]);

  const [transactionsByType, setTransactionsByType] = React.useState<
    TransactionByType[]
  >([]);

  const addTransactionByType = (txByType: TransactionByType) => {
    setTransactionsByType((prev) => [...prev, txByType]);
  };
  const addReceipt = (receipt: string) => {
    setSessionReceipts((prev) => [receipt, ...prev]);
  };
  const addPendingTx = (tx: string) => {
    setPendingTransactions((prev) => [tx, ...prev]);
  };
  const updateTransactionHash = (oldHash: string, newHash: string) => {
    const txIndex = transactionsByType.findIndex((tx) => tx.txHash === oldHash);
    if (txIndex !== -1) {
      console.log("txIndex", txIndex, newHash);
    }
  };

  const removePendingTx = (pendingTx: string) => {
    const updatedPendingTransactions = pendingTransactions.filter(
      (p) => p !== pendingTx,
    );
    setPendingTransactions(updatedPendingTransactions);
  };

  const removeReceipt = (txHash: string) => {
    removePendingTx(txHash);

    const updatedReceipts = sessionReceipts.filter(
      (r) =>
        JSON.parse(r).transactionHash.toLowerCase() !== txHash.toLowerCase(),
    );
    setSessionReceipts(updatedReceipts);
  };

  const resetReceiptData = () => {
    setSessionReceipts([]);
    setPendingTransactions([]);
    setTransactionsByType([]);
  };

  const receiptContext: ReceiptContextIF = {
    sessionReceipts,
    transactionsByType,
    pendingTransactions,
    addTransactionByType,
    addReceipt,
    addPendingTx,
    updateTransactionHash,
    removePendingTx,
    removeReceipt,
    resetReceiptData,
  };

  return (
    <ReceiptContext.Provider value={receiptContext}>
      {props.children}
    </ReceiptContext.Provider>
  );
};

export default ReceiptContextProvider;
