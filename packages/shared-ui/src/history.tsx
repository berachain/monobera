"use client";

import React from "react";
import { useRecentTransactions, type Transaction } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";

import { TransactionIcon } from "./transaction-icon";

// function formatTimestamp(timestamp: number): JSX.Element {
//   const date = new Date(timestamp);

//   const formattedTimestamp = date.toLocaleString(undefined, {
//     month: "2-digit",
//     day: "2-digit",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   });
//   const [datePart, timePart] = formattedTimestamp.split(", ");
//   return (
//     <p className="text-right">
//       <span>{datePart}</span>
//       <br />
//       <span>{timePart}</span>
//     </p>
//   );
// }

function getTimeFromNow(timestamp: number) {
  const now = new Date();
  const date = new Date(timestamp);
  const years = now.getFullYear() - date.getFullYear();
  const months = now.getMonth() - date.getMonth();
  const days = now.getDate() - date.getDate();
  const hours = now.getHours() - date.getHours();
  const minutes = now.getMinutes() - date.getMinutes();

  if (years > 0) return `${years}yr`;
  if (months > 0) return `${months}mo`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return "Just now";
}

export function History() {
  const transactions = useRecentTransactions();
  return (
    <div className="grid gap-4">
      {transactions.length ? (
        transactions.map((txn: Transaction) => (
          <a
            key={txn.hash}
            target="_blank"
            href={`${blockExplorerUrl}/tx/${txn.hash}`}
            rel="noreferrer"
          >
            <div
              className="flex items-center justify-between gap-5"
              key={txn.hash}
            >
              <div className="flex gap-4">
                <TransactionIcon transaction={txn.actionType} />
                <div className="font-medium">
                  <div className="w-[190px] truncate text-sm font-medium leading-6">
                    {txn.description}{" "}
                    <Icons.external className="inline h-3 w-3" />
                  </div>
                  <div className="text-sm font-medium leading-6 text-muted-foreground">
                    {txn.actionType ?? ""} {txn.status}
                  </div>
                </div>
              </div>
              <div className="whitespace-nowrap text-xs font-medium text-muted-foreground">
                {getTimeFromNow(txn.timestamp)}
              </div>
            </div>
          </a>
        ))
      ) : (
        <div className="flex h-24 justify-center align-middle">
          <div className="flex flex-col items-center justify-center ">
            <Icons.empty className="h-4 w-4" />
            <div className="">No recent activity</div>
          </div>
        </div>
      )}
    </div>
  );
}
