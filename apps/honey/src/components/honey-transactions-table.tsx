"use client";

import { useState } from "react";
import { formatUsd, truncateHash, useTokens } from "@bera/berajs";
import { blockExplorerUrl, honeyTokenAddress } from "@bera/config";
import { type HoneyMint, type HoneyRedemption } from "@bera/graphql";
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
import { formatUnits, getAddress } from "viem";

import { useHoneyEvents } from "~/hooks/useHoneyEvents";

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

function isMintData(obj: any): obj is HoneyMint {
  return obj.__typename === "HoneyMint";
}

function isBurnData(obj: any): obj is HoneyRedemption {
  return obj.__typename === "HoneyRedemption";
}

const getAction = (event: any) => {
  if (isMintData(event)) {
    return <p className="text-success-foreground">Mint</p>;
  } else if (isBurnData(event)) {
    return <p className="text-destructive-foreground">Redeem</p>;
  }
  return <p>IDK</p>;
};

const getTokenDisplay = (event: any, tokenDictionary: any) => {
  const honey =
    tokenDictionary && tokenDictionary[getAddress(honeyTokenAddress)];

  if (isMintData(event)) {
    // this should be fixed once backend updated
    const tokenIn =
      tokenDictionary &&
      tokenDictionary["0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5"];
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={tokenIn} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.collateralAmount),
                tokenIn?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={honey} />
          <p className="ml-2">
            {Number(
              formatUnits(BigInt(event.mintAmount), honey?.decimals ?? 18),
            ).toFixed(4)}
          </p>
        </div>
      </div>
    );
  } else if (isBurnData(event)) {
    // this should be fixed once backend updated
    const tokenOut =
      tokenDictionary &&
      tokenDictionary["0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5"];
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={honey} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.collateralAmount),
                honey?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={tokenOut} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.collateralAmount),
                tokenOut?.decimals ?? 18,
              ),
            ).toFixed(4)}
          </p>
        </div>
      </div>
    );
  }
};

const getValue = (event: HoneyMint | HoneyRedemption) => {
  if (isMintData(event)) {
    return formatUnits(BigInt(event.mintAmount), 18);
  }
  if (isBurnData(event)) {
    return formatUnits(BigInt(event.collateralAmount), 18);
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
    redemptionData,
    redemptionDataSize,
    isRedemptionDataLoadingMore,
    isRedemptionDataReachingEnd,
    setRedemptionDataSize,
  } = useHoneyEvents();

  const getLoadMoreButton = () => {
    if (selectedTab === Selection.AllTransactions) {
      return (
        <Button
          onClick={() => setAllDataSize(allDataSize + 1)}
          disabled={isAllDataLoadingMore || isAllDataReachingEnd}
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
          onClick={() => setRedemptionDataSize(redemptionDataSize + 1)}
          disabled={isRedemptionDataLoadingMore || isRedemptionDataReachingEnd}
          variant="outline"
        >
          {isRedemptionDataLoadingMore
            ? "Loading..."
            : isRedemptionDataReachingEnd
            ? "No more transactions"
            : "Load more"}
        </Button>
      );
    }
  };

  return (
    <section id="transactions">
      <Tabs
        defaultValue={Selection.AllTransactions}
        onValueChange={(value: string) => setSelectedTab(value as Selection)}
      >
        <TabsList
          className={cn(
            "w-full rounded-md ",
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
            {arcade && "🧾"} All {arcade ? "txns" : "transactions"}
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Mints}
            className={cn(
              "w-full text-xs text-stone-700  sm:text-sm",
              arcade && "data-[state=active]:bg-red-600",
            )}
          >
            {arcade && "🪙"} Mints
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Burns}
            className={cn(
              "w-full text-xs text-stone-700  sm:text-sm",
              arcade && "data-[state=active]:bg-red-600",
            )}
          >
            {arcade && "🔥"} Redeems
          </TabsTrigger>
        </TabsList>
        <div
          className={cn(
            "mt-4 overflow-hidden rounded-md border ",
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
              events={redemptionData}
              isLoading={isRedemptionDataLoadingMore}
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
  events: HoneyMint[] | HoneyRedemption[];
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
            TxnHash
          </TableHead>
          <TableHead className={cn("text-center", arcade && "text-blue-600")}>
            Time
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events && events.length && events[0] ? (
          events.map((event: HoneyMint | HoneyRedemption) => {
            if (!event) return null;
            return (
              <TableRow
                className={cn(
                  "hover:cursor-pointer",
                  arcade ? "hover:bg-blue-200" : "hover:bg-muted",
                )}
                key={event.id}
                onClick={() =>
                  window.open(
                    `${blockExplorerUrl}/tx/${event.id.split(":")[2]}`,
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
                  {truncateHash(event.id.split(":")[2] ?? "")}
                </TableCell>
                <TableCell
                  className="overflow-hidden truncate whitespace-nowrap text-right "
                  suppressHydrationWarning
                >
                  {formatDistance(
                    new Date(Number(event.timestamp) * 1000 ?? 0),
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
