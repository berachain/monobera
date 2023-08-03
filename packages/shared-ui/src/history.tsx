import React from "react";
import {
  truncateHash,
  useRecentTransactions,
  type NewTransaction,
} from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { Balancer } from "react-wrap-balancer";

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

  return (
    <div className="grid gap-4">
      <h3 className="text-md font-medium">Recent activity</h3>
      {transactions.length ? (
        transactions.slice(0, 5).map((txn: NewTransaction) => (
          <a
            key={txn.hash}
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/tx/${txn.hash}`}
          >
            <div
              className="flex justify-between border-t border-backgroundSecondary pt-3"
              key={txn.hash}
            >
              <div className="text-xs">
                <p className="font-medium">
                  <Balancer>{txn.description}</Balancer>
                </p>

                <p>{truncateHash(txn.hash as `0x${string}`)}</p>
              </div>
              <div className="text-xs">{formatTimestamp(txn.timestamp)}</div>
            </div>
          </a>
        ))
      ) : (
        <div className="flex h-24 justify-center align-middle">
          <div className="flex flex-col items-center justify-center gap-4">
            <Icons.empty className="h-4 w-4" />
            <p className="">No recent activity</p>
          </div>
        </div>
      )}
    </div>
  );
}
