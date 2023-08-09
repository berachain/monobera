"use client";

 
// TODO fix any
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { formatUsd, truncateHash, usePollBalance } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
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
import { Balancer } from "react-wrap-balancer";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import formatTimeAgo from "~/utils/formatTimeAgo";
import { blockExplorerName, blockExplorerUrl } from "~/config";
import { getWBeraPriceForToken } from "../api/getPrice";
import { PoolChart } from "./PoolChart";
import {
  type WithdrawLiquidityData,
  type AddLiquidityData,
  type MappedTokens,
  type SwapData,
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
            {Number(
              formatUnits(BigInt(event.swapIn.amount), tokenIn?.decimals ?? 18),
            ).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={tokenOut} />
          <p className="ml-2">
            {Number(
              formatUnits(
                BigInt(event.swapOut.amount),
                tokenOut?.decimals ?? 18,
              ),
            ).toFixed(4)}
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
  } else if(isRemoveLiquidity(event)) {
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
  return <p className="text-destructive">Withdraw</p>;
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
    const value = (event as WithdrawLiquidityData).liquidityOut.reduce((acc, cur) => {
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
  return 0;
};

enum Selection {
  AllTransactions = "allTransactions",
  Swaps = "swaps",
  AddsWithdrawals = "addsWithdrawals",
}

export default function PoolPageContent({
  prices,
  pool,
}: IPoolPageContent) {
  const router = useRouter();
  const { useBalance } = usePollBalance({ address: pool?.shareAddress });
  const shareBalance = useBalance();

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
        isProvisionDataReachingEnd
  } = usePoolEvents(pool?.pool);


  const getLoadMoreButton = () => {
    if(selectedTab === Selection.AllTransactions) {
      return (
        <Button
        onClick={() => setAllDataSize(allDataSize + 1)}
        disabled={isAllDataLoadingMore || isAllDataReachingEnd}
      >
        {isAllDataLoadingMore
          ? "Loading..."
          : isAllDataReachingEnd
          ? "No more transactions"
          : "Load more"}
      </Button>
      )
    }
    if(selectedTab === Selection.Swaps) {
      return (
        <Button
        onClick={() => setSwapDataSize(swapDataSize + 1)}
        disabled={isSwapDataLoadingMore || isSwapDataReachingEnd}
      >
        {isSwapDataLoadingMore
          ? "Loading..."
          : isSwapDataReachingEnd
          ? "No more transactions"
          : "Load more"}
      </Button>
      )


    }
    if(selectedTab === Selection.AddsWithdrawals) {
      return (
        <Button
        onClick={() => setProvisionDataSize(provisionDataSize + 1)}
        disabled={isProvisionDataLoadingMore || isProvisionDataReachingEnd}
      >
        {isProvisionDataLoadingMore
          ? "Loading..."
          : isProvisionDataReachingEnd
          ? "No more transactions"
          : "Load more"}
      </Button>
      )
    }
  }
  return (
    <div className="container">
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <div>
          <p className="text-left text-3xl font-semibold">
            {pool?.poolName}
          </p>
          <div className="mb-2 flex flex-row gap-2 items-center">
            <p className="text-xs font-medium hover:underline text-muted-foreground flex flex-row gap-2">
              <Icons.newspaper className="w-4 h-4"/>
              See Contract on {blockExplorerName}
            </p>
            <Badge variant="secondary" className="text-sm" >
              {Number(formatUnits(BigInt(pool.swapFee) ?? "", 18)) * 100}% swap
              fee
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Card>
            <CardContent className="flex items-center gap-4 p-4">
              <div>
                <h3 className="mb-2 font-medium">My pool balance</h3>
                <p className="text-xl font-medium">
                  {formatUsd(shareBalance?.formattedBalance ?? "0")} -{" "}
                  {shareBalance?.formattedBalance}
                </p>
              </div>

              <div className="text-right">
                <Balancer className="text-md"></Balancer>
              </div>
              <Button
                onClick={() => router.push(`/pool/${pool?.pool}/add-liquidity`)}
              >
                <Icons.add />
                Add
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => router.push(`/pool/${pool?.pool}/withdraw`)}
              >
                                <Icons.subtract />

                Withdraw
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-6 grid gap-5 lg:grid-cols-3">
        <div className="col-span-1">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead className="text-right">Liquidity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pool?.tokens?.map((token) => (
                  <TableRow
                    key={token.symbol}
                    onClick={() =>
                      router.push(
                        `${blockExplorerUrl}/address/${token.address}`,
                      )
                    }
                  >
                    <TableCell className="flex flex-row items-center gap-2 font-medium">
                      <TokenIcon token={token} />
                    </TableCell>
                    <TableCell>{token.normalizedWeight}%</TableCell>
                    <TableCell className="text-right">
                      {Number(
                        formatUnits(token.balance, token.decimals),
                      ).toFixed(2)}{" "}
                      {token.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <PoolChart
            weeklyVolume={pool.weeklyVolume ?? []}
            weeklyFees={pool.weeklyFees ?? []}
            weeklyVolumeTotal={pool.weeklyVolumeTotal ?? 0}
            monthlyVolume={pool.monthlyVolume ?? []}
            monthlyFees={pool.monthlyFees ?? []}
            monthlyVolumeTotal={pool.monthlyVolumeTotal ?? 0}
            quarterlyVolume={pool.quarterlyVolume ?? []}
            quarterlyFees={pool.quarterlyFees ?? []}
            quarterlyVolumeTotal={pool.quarterlyVolumeTotal ?? 0}
            weeklyFeesTotal={pool.weeklyFeesTotal ?? 0}
            monthlyFeesTotal={pool.monthlyFeesTotal ?? 0}
            quarterlyFeesTotal={pool.quarterlyFeesTotal ?? 0}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card className="p-2">
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Total liquidity </h3>
              </CardHeader>
              <CardContent className="p-2 text-xl font-semibold">
                {formatUsd(pool.totalValue ?? "0")}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Volume (24h)</h3>
              </CardHeader>
              <CardContent className="p-2 text-xl font-semibold">
                {formatUsd(pool?.dailyVolume ?? "0")}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Fees (24h)</h3>
              </CardHeader>
              <CardContent className="p-2 text-xl font-semibold">
                {pool.dailyVolume && Number(pool.dailyVolume) !== 0
                  ? formatUsd(
                      (Number(pool.formattedSwapFee) / 100) *
                        Number(pool.dailyVolume),
                    )
                  : "$0"}
              </CardContent>{" "}
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>APR</h3>
              </CardHeader>
              <CardContent className="p-2">-%</CardContent>
            </Card>
          </div>
        </div>
      </div>
      <section>
        <Tabs defaultValue={Selection.AllTransactions} onValueChange={(value: string) => setSelectedTab(value as Selection)}>
          <TabsList>
            <TabsTrigger value={Selection.AllTransactions}>All transactions</TabsTrigger>
            <TabsTrigger value={Selection.Swaps}>Swaps</TabsTrigger>
            <TabsTrigger value={Selection.AddsWithdrawals}>
              Adds &amp; Withdrawals
            </TabsTrigger>
          </TabsList>
          <Card className="mt-4">
            <TabsContent value={Selection.AllTransactions} className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Tokens</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allData?.length ? (
                    allData?.map((event: SwapData | any | undefined) => {
                      if(!event) return null
                      return (
                        <TableRow
                        key={event?.metadata?.txHash}
                        onClick={() =>
                          router.push(
                            `${blockExplorerUrl}/tx/${event?.metadata?.txHash ?? ''}`,
                          )
                        }
                      >
                        <TableCell>{getAction(event)}</TableCell>
                        <TableCell>
                          {formatUsd(getValue(pool,event, prices) ?? "")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {getTokenDisplay(event, pool)}
                        </TableCell>
                        <TableCell>{truncateHash(event?.sender ?? '')}</TableCell>
                        <TableCell
                          className="text-right"
                          suppressHydrationWarning
                        >
                          {formatTimeAgo(event.metadata?.blockTime ?? 0)}
                        </TableCell>
                      </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value={Selection.Swaps} className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Tokens</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {swapData?.length ? (
                    swapData.map((event: SwapData | any | undefined) => {
                      if(!event) return null
                      return (
                        <TableRow
                        key={event?.metadata?.txHash}
                        onClick={() =>
                          router.push(
                            `${blockExplorerUrl}/tx/${event?.metadata?.txHash ?? ''}`,
                          )
                        }
                      >
                        <TableCell>Swap</TableCell>
                        <TableCell>
                          {formatUsd(getValue(pool,event, prices) ?? "")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {getTokenDisplay(event, pool)}
                        </TableCell>
                        <TableCell>{truncateHash(event?.sender ?? '')}</TableCell>
                        <TableCell
                          className="text-right"
                          suppressHydrationWarning
                        >
                          {formatTimeAgo(event?.metadata?.blockTime ?? 0)}
                        </TableCell>
                      </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value={Selection.AddsWithdrawals} className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Tokens</TableHead>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {provisionData?.length ? (
                    provisionData.map((event: SwapData | any |undefined) => {
                      if(!event) return null
                      return (
                        <TableRow
                        key={event?.metadata?.txHash}
                        onClick={() =>
                          router.push(
                            `${blockExplorerUrl}/tx/${event?.metadata?.txHash ?? ''}`,
                          )
                        }
                      >
                        <TableCell>{getAction(event)}</TableCell>
                        <TableCell>
                          {formatUsd(getValue(pool, event, prices) ?? "")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {getTokenDisplay(event, pool)}
                        </TableCell>
                        <TableCell>{truncateHash(event?.sender ?? '')}</TableCell>
                        <TableCell
                          className="text-right"
                          suppressHydrationWarning
                        >
                          {formatTimeAgo(event?.metadata?.blockTime ?? 0)}
                        </TableCell>
                      </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Card>
          <div className="flex justify-center mt-4">
          {getLoadMoreButton()}
          </div>
        </Tabs>
      </section>
    </div>
  );
}
