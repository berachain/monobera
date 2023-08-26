"use client";

import { useState } from "react";
import { formatUsd, truncateHash } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
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
import { honey, stgUsd } from "~/config/tokens";

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

const getTokenDisplay = (event: any) => {
  if (isMintData(event)) {
    const tokenIn = stgUsd;
    const tokenOut = honey;
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
    const tokenIn = honey;
    const tokenOut = stgUsd;
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
    return formatUnits(BigInt(event.mintAmount), honey?.decimals ?? 18);
  }
  if (isBurnData(event)) {
    return formatUnits(BigInt(event.redeemAmount), stgUsd?.decimals ?? 18);
  }
  return 0;
};

export default function HoneyTransactionsTable() {
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
      return !isAllDataReachingEnd ? (
        <Button
          onClick={() => setAllDataSize(allDataSize + 1)}
          disabled={isAllDataLoadingMore || isAllDataReachingEnd}
          variant="outline"
        >
          {isAllDataLoadingMore ? "Loading..." : "Load more"}
        </Button>
      ) : (
        <></>
      );
    }
    if (selectedTab === Selection.Mints) {
      return !isMintDataReachingEnd ? (
        <Button
          onClick={() => setMintDataSize(mintDataSize + 1)}
          disabled={isMintDataLoadingMore || isMintDataReachingEnd}
          variant="outline"
        >
          {isMintDataLoadingMore ? "Loading..." : "Load more"}
        </Button>
      ) : (
        <></>
      );
    }
    if (selectedTab === Selection.Burns) {
      return !isBurnDataReachingEnd ? (
        <Button
          onClick={() => setBurnDataSize(burnDataSize + 1)}
          disabled={isBurnDataLoadingMore || isBurnDataReachingEnd}
          variant="outline"
        >
          {isBurnDataLoadingMore ? "Loading..." : "Load more"}
        </Button>
      ) : (
        <></>
      );
    }
  };

  return (
    <section>
      <Tabs
        defaultValue={Selection.AllTransactions}
        onValueChange={(value: string) => setSelectedTab(value as Selection)}
      >
        <TabsList className="w-full rounded-xl border-2 border-dashed border-blue-900 bg-blue-50">
          <TabsTrigger
            value={Selection.AllTransactions}
            className="w-full text-xs text-stone-700 data-[state=active]:bg-red-600 sm:text-sm"
          >
            🧾 All txns
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Mints}
            className="w-full text-xs text-stone-700 data-[state=active]:bg-red-600 sm:text-sm"
          >
            🪙 Mints
          </TabsTrigger>
          <TabsTrigger
            value={Selection.Burns}
            className="w-full text-xs text-stone-700 data-[state=active]:bg-red-600 sm:text-sm"
          >
            🔥 Burns
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 overflow-hidden rounded-xl border border-blue-300 bg-blue-50">
          <TabsContent value={Selection.AllTransactions} className="mt-0">
            <EventTable
              prices={prices}
              events={allData}
              isLoading={isAllDataLoadingMore}
            />
          </TabsContent>
          <TabsContent value={Selection.Mints} className="mt-0">
            <EventTable
              prices={prices}
              events={mintData}
              isLoading={isMintDataLoadingMore}
            />
          </TabsContent>
          <TabsContent value={Selection.Burns} className="mt-0">
            <EventTable
              prices={prices}
              events={burnData}
              isLoading={isBurnDataLoadingMore}
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
}: {
  prices: MappedTokens;
  events: MintData[] | BurnData[];
  isLoading: boolean | undefined;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-blue-300 bg-blue-100 text-blue-600 hover:bg-blue-100">
          <TableHead className="text-blue-600">Action</TableHead>
          <TableHead className="text-blue-600">Value</TableHead>
          <TableHead className="hidden text-blue-600 sm:table-cell">
            Tokens
          </TableHead>
          <TableHead className="hidden text-blue-600 sm:table-cell">
            Account
          </TableHead>
          <TableHead className="text-right text-blue-600">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.length ? (
          events?.map((event: MintData | any | undefined) => {
            if (!event) return null;
            return (
              <TableRow
                className="hover:cursor-pointer hover:bg-blue-200"
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
                  {getTokenDisplay(event)}
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
