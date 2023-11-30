"use client";

import React, { useState } from "react";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  formatUsd,
  formatter,
  truncateHash,
  useBeraJs,
  usePollBgtRewards,
} from "@bera/berajs";
import { beraTokenAddress, blockExplorerUrl } from "@bera/config";
import { RewardBtn, TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import BigNumber from "bignumber.js";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import formatTimeAgo from "~/utils/formatTimeAgo";
import { getWBeraPriceForToken } from "~/app/api/getPrices/api/getPrices";
import PoolHeader from "~/app/components/pool-header";
import { usePositionSize } from "~/hooks/usePositionSize";
import { PoolChart } from "./PoolChart";
import {
  type AddLiquidityData,
  type MappedTokens,
  type SwapData,
  type WithdrawLiquidityData,
} from "./types";
import { usePoolEvents } from "./usePoolEvents";

interface IPoolPageContent {
  prices: MappedTokens;
  pool: Pool;
}

function isSwapData(obj: any): obj is SwapData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "metadata" in obj &&
    "pool" in obj &&
    "swapIn" in obj &&
    "swapOut" in obj &&
    "sender" in obj
  );
}

function isAddLiquidity(obj: any): obj is SwapData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "metadata" in obj &&
    "pool" in obj &&
    "liquidityIn" in obj &&
    "sharesOut" in obj &&
    "sender" in obj
  );
}

function isRemoveLiquidity(obj: any): obj is SwapData {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "metadata" in obj &&
    "pool" in obj &&
    "liquidityOut" in obj &&
    "sharesIn" in obj &&
    "sender" in obj
  );
}

const getTokenDisplay = (event: any, pool: Pool) => {
  if (isSwapData(event)) {
    const tokenIn = pool.tokens.find(
      (token) => token.address === event.swapIn.denom,
    );
    const tokenOut = pool.tokens.find(
      (token) => token.address === event.swapOut.denom,
    );
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={tokenIn} />
          <p className="ml-2">
            {Number(formatUnits(BigInt(event.swapIn.amount), 18)).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={tokenOut} />
          <p className="ml-2">
            {Number(formatUnits(BigInt(event.swapOut.amount), 18)).toFixed(4)}
          </p>
        </div>
      </div>
    );
  } else if (isAddLiquidity(event)) {
    return (
      <div className="space-evenly flex flex-row items-center">
        {pool.tokens.map((token, i) => {
          return (
            <div
              className={cn("flex flex-row", i !== 0 && "ml-[-10px]")}
              key={i}
            >
              <TokenIcon token={token} />
            </div>
          );
        })}
      </div>
    );
  } else if (isRemoveLiquidity(event)) {
    return (
      <div className="space-evenly flex flex-row items-center">
        {pool.tokens.map((token, i) => {
          return (
            <div
              className={cn("flex flex-row", i !== 0 && "ml-[-10px]")}
              key={i}
            >
              <TokenIcon token={token} />
            </div>
          );
        })}
      </div>
    );
  }
};

const getAction = (event: any) => {
  if (isSwapData(event)) {
    return <p>Swap</p>;
  } else if (isAddLiquidity(event)) {
    return <p className="text-positive">Add</p>;
  }
  return <p className="text-destructive-foreground">Withdraw</p>;
};

const getValue = (
  pool: Pool | undefined,
  event: SwapData | AddLiquidityData | WithdrawLiquidityData,
  prices: MappedTokens,
) => {
  if (isSwapData(event)) {
    const decimals = pool?.tokens.find(
      (token) => token.address === event.swapIn.denom,
    )?.decimals;
    const formattedAmount = formatUnits(
      BigInt(event.swapIn.amount),
      decimals ?? 18,
    );
    return getWBeraPriceForToken(
      prices,
      event.swapIn.denom as Address,
      Number(formattedAmount),
    );
  }
  if (isAddLiquidity(event)) {
    const value = (event as AddLiquidityData).liquidityIn.reduce((acc, cur) => {
      const token = pool?.tokens.find((token) => token.address === cur.denom);
      const tokenValue = getWBeraPriceForToken(
        prices,
        cur.denom as Address,
        Number(formatUnits(BigInt(cur.amount), token?.decimals ?? 18)),
      );
      if (!tokenValue) {
        return acc;
      }
      const totalTokenValue = tokenValue;
      return acc + totalTokenValue;
    }, 0);
    return value;
  }
  if (isRemoveLiquidity(event)) {
    const value = (event as WithdrawLiquidityData).liquidityOut.reduce(
      (acc, cur) => {
        const token = pool?.tokens.find((token) => token.address === cur.denom);
        const tokenValue = getWBeraPriceForToken(
          prices,
          cur.denom as Address,
          Number(formatUnits(BigInt(cur.amount), token?.decimals ?? 18)),
        );
        if (!tokenValue) {
          return acc;
        }
        const totalTokenValue = tokenValue;
        return acc + totalTokenValue;
      },
      0,
    );
    return value;
  }
  return 0;
};

enum Selection {
  AllTransactions = "allTransactions",
  Swaps = "swaps",
  AddsWithdrawals = "addsWithdrawals",
}

export const EventTable = ({
  pool,
  prices,
  events,
  isLoading,
}: {
  pool: Pool;
  prices: MappedTokens;
  events: SwapData[] | AddLiquidityData[] | WithdrawLiquidityData[];
  isLoading: boolean | undefined;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="xs:hidden	 hidden	 sm:table-cell	 md:table-cell	 lg:table-cell">
            Tokens
          </TableHead>
          <TableHead className="xs:hidden	 hidden	 sm:table-cell	 md:table-cell	 lg:table-cell">
            Account
          </TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events?.length ? (
          events?.map((event: SwapData | any | undefined) => {
            if (!event) return null;
            return (
              <TableRow
                key={event?.metadata?.txHash}
                onClick={() =>
                  window.open(
                    `${blockExplorerUrl}/tx/${event?.metadata?.txHash ?? ""}`,
                    "_blank",
                  )
                }
              >
                <TableCell>{getAction(event)}</TableCell>
                <TableCell>
                  {formatUsd(getValue(pool, event, prices) ?? "")}
                </TableCell>
                <TableCell className="xs:hidden	 hidden	 font-medium	 sm:table-cell	 md:table-cell lg:table-cell">
                  {getTokenDisplay(event, pool)}
                </TableCell>
                <TableCell className="xs:hidden	 hidden	 sm:table-cell	 md:table-cell	 lg:table-cell">
                  {truncateHash(event?.sender ?? "")}
                </TableCell>
                <TableCell
                  className="overflow-hidden truncate whitespace-nowrap text-right "
                  suppressHydrationWarning
                >
                  {formatTimeAgo(event.metadata?.blockTime ?? 0)}
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
export default function PoolPageContent({ prices, pool }: IPoolPageContent) {
  const { useBgtReward } = usePollBgtRewards([pool?.pool]);
  const { data: bgtRewards } = useBgtReward(pool?.pool);

  const [selectedTab, setSelectedTab] = useState(Selection.AllTransactions);
  const {
    allData,
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
    swapData,
    swapDataSize,
    setSwapDataSize,
    isSwapDataLoadingMore,
    isSwapDataReachingEnd,
    provisionData,
    provisionDataSize,
    setProvisionDataSize,
    isProvisionDataLoadingMore,
    isProvisionDataReachingEnd,
  } = usePoolEvents(pool?.pool);

  const getLoadMoreButton = () => {
    if (selectedTab === Selection.AllTransactions) {
      return (
        <>
          {allData.length === 0 ? (
            false
          ) : (
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
          )}
        </>
      );
    }
    if (selectedTab === Selection.Swaps) {
      return (
        <>
          {swapData.length === 0 ? (
            false
          ) : (
            <Button
              onClick={() => setSwapDataSize(swapDataSize + 1)}
              disabled={isSwapDataLoadingMore || isSwapDataReachingEnd}
              variant="outline"
            >
              {isSwapDataLoadingMore
                ? "Loading..."
                : isSwapDataReachingEnd
                ? "No more transactions"
                : "Load more"}
            </Button>
          )}
        </>
      );
    }
    if (selectedTab === Selection.AddsWithdrawals) {
      return (
        <>
          {provisionData.length === 0 ? (
            false
          ) : (
            <Button
              onClick={() => setProvisionDataSize(provisionDataSize + 1)}
              disabled={
                isProvisionDataLoadingMore || isProvisionDataReachingEnd
              }
              variant="outline"
            >
              {isProvisionDataLoadingMore
                ? "Loading..."
                : isProvisionDataReachingEnd
                ? "No more transactions"
                : "Load more"}
            </Button>
          )}
        </>
      );
    }
  };

  const { userTotalValue, isPositionSizeLoading } = usePositionSize({
    pool: pool,
  });

  const { isConnected } = useBeraJs();
  return (
    <div className="flex flex-col gap-8">
      <PoolHeader pool={pool} />

      <div className="flex w-full grid-cols-5 flex-col-reverse gap-4 lg:grid">
        <div className="col-span-5 flex w-full flex-col gap-4 lg:col-span-3">
          <PoolChart
            currentTvl={pool.totalValue ?? 0}
            weeklyTvl={pool.weeklyTvl ?? []}
            weeklyVolume={pool.weeklyVolume ?? []}
            weeklyFees={pool.weeklyFees ?? []}
            weeklyVolumeTotal={pool.weeklyVolumeTotal ?? 0}
            monthlyTvl={pool.monthlyTvl ?? []}
            monthlyVolume={pool.monthlyVolume ?? []}
            monthlyFees={pool.monthlyFees ?? []}
            monthlyVolumeTotal={pool.monthlyVolumeTotal ?? 0}
            quarterlyTvl={pool.quarterlyTvl ?? []}
            quarterlyVolume={pool.quarterlyVolume ?? []}
            quarterlyFees={pool.quarterlyFees ?? []}
            quarterlyVolumeTotal={pool.quarterlyVolumeTotal ?? 0}
            weeklyFeesTotal={pool.weeklyFeesTotal ?? 0}
            monthlyFeesTotal={pool.monthlyFeesTotal ?? 0}
            quarterlyFeesTotal={pool.quarterlyFeesTotal ?? 0}
          />
          <div className="mb-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  TVL
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                ${formatter.format(pool?.totalValue ?? 0)}
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Volume (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                ${formatter.format(pool?.dailyVolume ?? 0)}
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Fees (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                {pool.dailyVolume && Number(pool.dailyVolume) !== 0
                  ? formatUsd(pool.fees ?? "0")
                  : "$0"}
              </div>{" "}
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  PRR
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                {(pool?.totalApy ?? 0) > 100000
                  ? formatter.format(pool?.totalApy ?? 0)
                  : (pool?.totalApy ?? 0).toFixed(2)}
                %
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-5 flex w-full flex-col gap-5 lg:col-span-2">
          <Card>
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="w-full">
                <h3 className="text-xs font-medium text-muted-foreground">
                  My pool balance
                </h3>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {isConnected ? (
                    isPositionSizeLoading ? (
                      <Skeleton className="h-[32px] w-[150px]" />
                    ) : (
                      formatUsd(userTotalValue ?? 0)
                    )
                  ) : (
                    formatUsd(0)
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
          {pool.bgtApy !== 0 && (
            <Card>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Rewards available
                  </h3>
                  <p className="text-lg font-semibold text-foreground">
                    {Number(Number.isNaN(bgtRewards) ? 0 : bgtRewards).toFixed(
                      2,
                    ) ?? 0}{" "}
                    BGT
                  </p>
                </div>
                {/* @ts-ignore */}
                <RewardBtn poolAddress={pool.pool} variant={"secondary"} />
              </CardContent>
            </Card>
          )}
          <Card className="p-4">
            <div className="mb-8 flex h-8 w-full items-center justify-between text-lg font-semibold">
              Pool Liquidity
              <div className="text-2xl">
                ${formatter.format(pool?.totalValue ?? 0)}
              </div>
            </div>
            <div className="mb-4 text-sm font-medium">Tokens</div>
            <div>
              {pool?.tokens.map((token) => (
                <div
                  key={token.address}
                  className="flex h-8 items-center justify-between"
                >
                  <div className="flex gap-1">
                    <TokenIcon token={token} />
                    <div className="ml-1 font-medium uppercase">
                      {token.address === beraTokenAddress
                        ? "wbera"
                        : token.symbol}
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {token.weight}%
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="font-medium">
                      {formatter.format(token.balance)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {" "}
                      {formatUsd(
                        // @ts-ignore
                        BigNumber(token.balance)
                          .times(prices[token.address] ?? 0)
                          .toFixed(18),
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <section>
        <Tabs
          defaultValue={Selection.AllTransactions}
          onValueChange={(value: string) => setSelectedTab(value as Selection)}
        >
          <TabsList className="w-full">
            <TabsTrigger
              value={Selection.AllTransactions}
              className="w-full text-xs sm:text-sm"
            >
              All transactions
            </TabsTrigger>
            <TabsTrigger
              value={Selection.Swaps}
              className="w-full text-xs sm:text-sm"
            >
              Swaps
            </TabsTrigger>
            <TabsTrigger
              value={Selection.AddsWithdrawals}
              className="w-full text-xs sm:text-sm"
            >
              Adds &amp; Withdraws
            </TabsTrigger>
          </TabsList>
          <Card className="mt-4">
            <TabsContent
              value={Selection.AllTransactions}
              className="mt-0 overflow-x-auto"
            >
              <EventTable
                pool={pool}
                prices={prices}
                events={allData}
                isLoading={isAllDataLoadingMore}
              />
            </TabsContent>
            <TabsContent
              value={Selection.Swaps}
              className="mt-0 overflow-x-auto"
            >
              <EventTable
                pool={pool}
                prices={prices}
                events={swapData}
                isLoading={isSwapDataLoadingMore}
              />
            </TabsContent>
            <TabsContent
              value={Selection.AddsWithdrawals}
              className="mt-0 overflow-x-auto"
            >
              <EventTable
                pool={pool}
                prices={prices}
                events={provisionData}
                isLoading={isProvisionDataLoadingMore}
              />
            </TabsContent>
          </Card>
          <div className="mt-4 flex justify-center">{getLoadMoreButton()}</div>
        </Tabs>
      </section>
    </div>
  );
}
