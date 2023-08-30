"use client";

import { useState } from "react";
import { formatUsd, truncateHash, useTokens } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { formatDistance } from "date-fns";
import { formatUnits } from "viem";

import { useHoneyEvents } from "~/app/api/useHoneyEvents";
import { blockExplorerUrl } from "~/config";

enum Selection {
  AllTransactions = "allTransactions",
  Mints = "mints",
  Burns = "burns",
}

export interface MappedTokens {
  [key: string]: number;
}

const prices = {
  ahoney: 1,
  stgusdc: 1,
};

interface Metadata {
  blockNum: string;
  txHash: string;
  blockHash: string;
  blockTime: string;
}

interface Collateral {
  denom: string;
  amount: string;
}

interface MintData {
  metadata: Metadata;
  from: string;
  to: string;
  collateral: Collateral;
  mintAmount: string;
  honeyTotalSupply: string;
}

interface BurnData {
  metadata: Metadata;
  from: string;
  redeemAmountOut: Collateral;
  redeemAmount: string;
  honeyTotalSupply: string;
}

function isMintData(obj: any): obj is MintData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "metadata" in obj &&
    "mintAmount" in obj
  );
}

function isBurnData(obj: any): obj is BurnData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "metadata" in obj &&
    "redeemAmount" in obj
  );
}

const getAction = (event: any) => {
  if (isMintData(event)) {
    return <p className="text-success-foreground">Mint</p>;
  } else if (isBurnData(event)) {
    return <p className="text-destructive-foreground">Burn</p>;
  }
  return <p>IDK</p>;
};

const getTokenDisplay = (event: any, tokenDictionary: any) => {
  const tokenIn =
    tokenDictionary &&
    tokenDictionary["0x1d0f659fF50d1830e449dD88E533cb11FB7a25E4"];
  const tokenOut =
    tokenDictionary &&
    tokenDictionary["0xa85579e75a7ba99d00cce02441a5e21661b63a98"];
  if (isMintData(event)) {
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={tokenIn} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.collateral.amount),
                tokenIn?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={tokenOut} />
          <p className="ml-2">
            {Number(
              formatUnits(BigInt(event.mintAmount), tokenOut?.decimals ?? 18),
            ).toFixed(4)}
          </p>
        </div>
      </div>
    );
  } else if (isBurnData(event)) {
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={tokenIn} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.redeemAmountOut.amount),
                tokenIn?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={tokenOut} />
          <p className="ml-2">
            {Number(
              formatUnits(BigInt(event.redeemAmount), tokenOut?.decimals ?? 18),
            ).toFixed(4)}
          </p>
        </div>
      </div>
    );
  }
};

const getValue = (event: MintData | BurnData) => {
  if (isMintData(event)) {
    return formatUnits(BigInt(event.mintAmount), 18);
  }
  if (isBurnData(event)) {
    return formatUnits(BigInt(event.redeemAmount), 18);
  }
  return 0;
};

export default function HoneyTransactionsTable({
  arcade,
}: {
  arcade: boolean;
}) {
  const [selectedTab, setSelectedTab] = useState(Selection.AllTransactions);
  const {
    allData,
    allDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
    setAllDataSize,
    mintData,
    mintDataSize,
    isMintDataLoadingMore,
    isMintDataReachingEnd,
    setMintDataSize,
    burnData,
    burnDataSize,
    isBurnDataLoadingMore,
    isBurnDataReachingEnd,
    setBurnDataSize,
  } = useHoneyEvents();
  const getLoadMoreButton = () => {
    if (selectedTab === Selection.AllTransactions) {
      return (
        <Button
          onClick={() => setAllDataSize(allDataSize + 1)}
          disabled={isAllDataLoadingMore}
          variant="outline"
        >
          {isAllDataLoadingMore
            ? "Loading..."
            : isAllDataReachingEnd
            ? "No more transactions"
            : "Load more"}
        </Button>
      );
    }
    if (selectedTab === Selection.Mints) {
      return (
        <Button
          onClick={() => setMintDataSize(mintDataSize + 1)}
          disabled={isMintDataLoadingMore || isMintDataReachingEnd}
          variant="outline"
        >
          {isMintDataLoadingMore
            ? "Loading..."
            : isMintDataReachingEnd
            ? "No more transactions"
            : "Load more"}
        </Button>
      );
    }
    if (selectedTab === Selection.Burns) {
      return (
        <Button
          onClick={() => setBurnDataSize(burnDataSize + 1)}
          disabled={isBurnDataLoadingMore || isBurnDataReachingEnd}
          variant="outline"
        >
          {isBurnDataLoadingMore
            ? "Loading..."
            : isBurnDataReachingEnd
            ? "No more transactions"
            : "Load more"}
        </Button>
      );
    }
  };
  // console.log("allData", allData);
  return (
    <section>
      <Tabs
        defaultValue={Selection.AllTransactions}
        onValueChange={(value: string) => setSelectedTab(value as Selection)}
      >
        <TabsList
          className={cn(
            "w-full rounded-xl ",
            arcade && "border-2 border-dashed border-blue-900 bg-blue-50",
          )}
        >
          <TabsTrigger
            value={Selection.AllTransactions}
            className={cn(
              "w-full text-xs text-stone-700  sm:text-sm",
              arcade && "data-[state=active]:bg-red-600",
            )}
          >
            🧾 All {arcade ? "txns" : "transactions"}
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Mints}
            className={cn(
              "w-full text-xs text-stone-700  sm:text-sm",
              arcade && "data-[state=active]:bg-red-600",
            )}
          >
            🪙 Mints
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Burns}
            className={cn(
              "w-full text-xs text-stone-700  sm:text-sm",
              arcade && "data-[state=active]:bg-red-600",
            )}
          >
            🔥 Burns
          </TabsTrigger>
        </TabsList>
        <div
          className={cn(
            "mt-4 overflow-hidden rounded-xl border ",
            arcade && "border-blue-300 bg-blue-50",
          )}
        >
          <TabsContent value={Selection.AllTransactions} className="mt-0">
            <EventTable
              prices={prices}
              events={allData}
              isLoading={isAllDataLoadingMore}
              arcade={arcade}
            />
          </TabsContent>
          <TabsContent value={Selection.Mints} className="mt-0">
            <EventTable
              prices={prices}
              events={mintData}
              isLoading={isMintDataLoadingMore}
              arcade={arcade}
            />
          </TabsContent>
          <TabsContent value={Selection.Burns} className="mt-0">
            <EventTable
              prices={prices}
              events={burnData}
              isLoading={isBurnDataLoadingMore}
              arcade={arcade}
            />
          </TabsContent>
        </div>
        <div className="mt-4 flex justify-center">{getLoadMoreButton()}</div>
      </Tabs>
    </section>
  );
}

export const EventTable = ({
  events,
  isLoading,
  arcade,
}: {
  prices: MappedTokens;
  events: MintData[] | BurnData[];
  isLoading: boolean | undefined;
  arcade: boolean;
}) => {
  const { tokenDictionary } = useTokens();

  return (
    <Table>
      <TableHeader>
        <TableRow
          className={cn(
            arcade &&
              "border-b border-blue-300 bg-blue-100 text-blue-600 hover:bg-blue-100",
          )}
        >
          <TableHead className={cn(arcade && "text-blue-600")}>
            Action
          </TableHead>
          <TableHead className={cn(arcade && "text-blue-600")}>Value</TableHead>
          <TableHead
            className={cn("hidden sm:table-cell", arcade && "text-blue-600")}
          >
            Tokens
          </TableHead>
          <TableHead
            className={cn("hidden sm:table-cell", arcade && "text-blue-600")}
          >
            Account
          </TableHead>
          <TableHead className={cn("text-center", arcade && "text-blue-600")}>
            Time
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.length && events[0] && Object.keys(events[0]).length !== 0 ? (
          events?.map((event: MintData | any | undefined) => {
            if (!event) return null;
            return (
              <TableRow
                className={cn(
                  "hover:cursor-pointer",
                  arcade ? "hover:bg-blue-200" : "hover:bg-muted",
                )}
                key={event?.metadata?.txHash}
                onClick={() =>
                  window.open(
                    `${blockExplorerUrl}/tx/${event?.metadata?.txHash ?? ""}`,
                    "_blank",
                  )
                }
              >
                <TableCell>{getAction(event)}</TableCell>
                <TableCell>{formatUsd(getValue(event) ?? "")}</TableCell>
                <TableCell className="hidden font-medium sm:table-cell">
                  {getTokenDisplay(event, tokenDictionary)}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {truncateHash(event?.from ?? "")}
                </TableCell>
                <TableCell
                  className="overflow-hidden truncate whitespace-nowrap text-right "
                  suppressHydrationWarning
                >
                  {formatDistance(
                    new Date(event.metadata?.blockTime * 1000 ?? 0),
                    new Date(),
                  )}{" "}
                  ago
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              {isLoading && (events === undefined || events.length === 0) ? (
                <p>Loading...</p>
              ) : (
                <p>No transactions found</p>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
