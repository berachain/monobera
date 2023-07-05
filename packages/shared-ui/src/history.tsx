import React from "react";
import {
  truncateHash,
  useBeraConfig,
  useRecentTransactions,
  type NewTransaction,
} from "@bera/berajs";

function formatTimestamp(timestamp: number): JSX.Element {
  const date = new Date(timestamp);

  const formattedTimestamp = date.toLocaleString(undefined, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const [datePart, timePart] = formattedTimestamp.split(", ");
  return (
    <p className="text-right">
      <span>{datePart}</span>
      <br />
      <span>{timePart}</span>
    </p>
  );
}

export function History() {
  const transactions = useRecentTransactions();
  const { networkConfig } = useBeraConfig();
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-medium">History</h3>
      {transactions.length ? (
        transactions.map((txn: NewTransaction) => (
          <a
            key={txn.hash}
            target="_blank"
            href={`http://${networkConfig.chain.blockExplorers?.default.url}/tx/${txn.hash}`}
          >
            <div
              className="flex justify-between border-t border-backgroundSecondary pt-2"
              key={txn.hash}
            >
              <div className="text-xs">
                <p className="font-medium">{txn.description}</p>
                <p>{truncateHash(txn.hash as `0x${string}`)}</p>
              </div>
              <div className="text-xs">{formatTimestamp(txn.timestamp)}</div>
            </div>
          </a>
        ))
      ) : (
        <p>No recent transactions</p>
      )}
    </div>
  );
}
