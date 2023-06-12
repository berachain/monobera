import React from "react";
import {
  truncateHash,
  useRecentTransactions,
  type NewTransaction,
} from "@bera/berajs";

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const formattedTimestamp = date.toLocaleString(undefined, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formattedTimestamp;
}

export function History() {
  const transactions = useRecentTransactions();
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-medium">Recent activity</h3>
      {transactions.map((txn: NewTransaction) => (
        <div
          className="flex justify-between border-t border-backgroundSecondary pt-2"
          key={txn.hash}
        >
          <div className="text-xs">
            <p className="font-medium text-primary-foreground/60">
              {txn.description}
            </p>
            <p className="text-backgroundSecondary">
              {truncateHash(txn.hash as `0x${string}`)}
            </p>
          </div>
          <div className="text-xs">{formatTimestamp(txn.timestamp)}</div>
        </div>
      ))}
    </div>
  );
}
