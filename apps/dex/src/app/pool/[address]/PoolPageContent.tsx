"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import {
  REWARDS_PRECOMPILE_ABI,
  formatUsd,
  formatter,
  truncateHash,
  useBeraJs,
  usePollBankBalance,
  usePollBgtRewards,
  usePollPreviewBurnShares,
} from "@bera/berajs";
import { TokenIcon, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Card, CardContent } from "@bera/ui/card";
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
import { mutate } from "swr";
import { formatUnits, getAddress } from "viem";
import { type Address } from "wagmi";

import formatTimeAgo from "~/utils/formatTimeAgo";
import { SwapCard } from "~/components/swap-card";
import { blockExplorerName, blockExplorerUrl } from "~/config";
import { getWBeraPriceForToken } from "../api/getPrice";
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
  console.log(pool);
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
  const router = useRouter();
  const { useBankBalance } = usePollBankBalance(pool.shareAddress);

  const { useBgtRewards, isLoading, QUERY_KEY } = usePollBgtRewards(pool?.pool);
  const bgtRewards = useBgtRewards();
  const { account, isReady } = useBeraJs();

  const {
    write,
    isLoading: isTxnLoading,
    ModalPortal,
  } = useTxn({
    message: "Claiming BGT Rewards",
    onSuccess: () => {
      void mutate(QUERY_KEY);
    },
  });

  const shareBalance = useBankBalance();
  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    shareBalance,
    pool?.pool,
    pool?.poolShareDenomHex,
  );

  const burnShares: Record<string, bigint> = usePreviewBurnShares();

  const [userTotalValue, setUserTotalValue] = useState<number | undefined>(0);

  useEffect(() => {
    if (burnShares) {
      const totalValue = pool?.tokens.reduce((acc, token) => {
        const formattedAmount = burnShares
          ? Number(formatUnits(burnShares[token.address] ?? 0n, token.decimals))
          : 0;

        return acc + formattedAmount * (prices[token.address] ?? 0);
      }, 0);
      setUserTotalValue(totalValue ?? 0);
    }
  }, [burnShares]);

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
    if (selectedTab === Selection.Swaps) {
      return (
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
      );
    }
    if (selectedTab === Selection.AddsWithdrawals) {
      return (
        <Button
          onClick={() => setProvisionDataSize(provisionDataSize + 1)}
          disabled={isProvisionDataLoadingMore || isProvisionDataReachingEnd}
          variant="outline"
        >
          {isProvisionDataLoadingMore
            ? "Loading..."
            : isProvisionDataReachingEnd
            ? "No more transactions"
            : "Load more"}
        </Button>
      );
    }
  };
  return (
    <div className="container p-[52px]">
      {ModalPortal}
      <div className="mb-4 flex w-full flex-wrap items-center justify-between">
        <div className="w-full items-center sm:items-start">
          <p className="mb-3 w-full text-center text-3xl font-semibold sm:text-left">
            {pool?.poolName}
          </p>
          <div className="mb-2 flex w-full flex-row items-center justify-center gap-2 sm:items-center sm:justify-start">
            <Badge variant="secondary" className="text-xs font-medium">
              {Number(formatUnits(BigInt(pool.swapFee) ?? "", 18)) * 100}% swap
              fee
            </Badge>
            <Badge className="flex flex-row items-center gap-1 bg-amber-100 text-xs font-medium text-amber-800 hover:bg-amber-100">
              {pool?.bgtApy?.toFixed(2)}% BGT APY
            </Badge>
            <div
              className="hidden flex-row items-center gap-1 text-xs font-medium text-muted-foreground hover:cursor-pointer hover:underline sm:flex"
              onClick={() =>
                window.open(
                  `${blockExplorerUrl}/address/${pool?.poolShareDenomHex}`,
                )
              }
            >
              <Icons.newspaper className="h-3 w-3" />
              View LP Token on {blockExplorerName}
              <Icons.external className="h-3 w-3" />
            </div>
          </div>
          <p
            className="flex flex-row items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:underline sm:hidden"
            onClick={() =>
              window.open(`${blockExplorerUrl}/address/${pool?.pool}`)
            }
          >
            <Icons.newspaper className="h-3 w-3" />
            See Contract on {blockExplorerName}
            <Icons.external className="h-3 w-3" />
          </p>
        </div>
      </div>

      <div className=" mb-6 flex w-full grid-cols-5 flex-col-reverse gap-4 lg:grid">
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
            <Card className="p-4">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-xs font-medium text-muted-foreground">
                  Total liquidity (TVL)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                ${formatter.format(pool?.totalValue ?? 0)}
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-xs font-medium text-muted-foreground">
                  Volume (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                ${formatter.format(pool?.dailyVolume ?? 0)}
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-xs font-medium text-muted-foreground">
                  Fees (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                {pool.dailyVolume && Number(pool.dailyVolume) !== 0
                  ? formatUsd(pool.fees ?? "0")
                  : "$0"}
              </div>{" "}
            </Card>
            <Card className="p-4">
              <div className="flex flex-row items-center justify-between">
                <p className="overflow-hidden truncate whitespace-nowrap text-xs font-medium text-muted-foreground">
                  APR
                </p>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                {(pool?.totalApy ?? 0).toFixed(2)}%
              </div>
            </Card>
          </div>
          <section>
            <Tabs
              defaultValue={Selection.AllTransactions}
              onValueChange={(value: string) =>
                setSelectedTab(value as Selection)
              }
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
                <TabsContent value={Selection.AllTransactions} className="mt-0">
                  <EventTable
                    pool={pool}
                    prices={prices}
                    events={allData}
                    isLoading={isAllDataLoadingMore}
                  />
                </TabsContent>
                <TabsContent value={Selection.Swaps} className="mt-0">
                  <EventTable
                    pool={pool}
                    prices={prices}
                    events={swapData}
                    isLoading={isSwapDataLoadingMore}
                  />
                </TabsContent>
                <TabsContent value={Selection.AddsWithdrawals} className="mt-0">
                  <EventTable
                    pool={pool}
                    prices={prices}
                    events={provisionData}
                    isLoading={isProvisionDataLoadingMore}
                  />
                </TabsContent>
              </Card>
              <div className="mt-4 flex justify-center">
                {getLoadMoreButton()}
              </div>
            </Tabs>
          </section>
        </div>
        <div className="col-span-5 flex w-full flex-col gap-5 lg:col-span-2">
          {pool.bgtApy !== 0 && (
            <Card>
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div>
                  <h3 className="text-xs font-medium text-muted-foreground">
                    Rewards available
                  </h3>
                  <p className="text-lg font-semibold text-foreground">
                    {bgtRewards.toFixed(2) ?? 0} BGT
                  </p>
                </div>

                <Button
                  variant={"secondary"}
                  disabled={
                    isLoading || bgtRewards === 0 || isTxnLoading || !isReady
                  }
                  onClick={() => {
                    write({
                      address: process.env
                        .NEXT_PUBLIC_ERC20_REWARDS_ADDRESS as Address,
                      abi: REWARDS_PRECOMPILE_ABI,
                      functionName: "withdrawDepositorRewards",
                      params: [account, pool.pool],
                    });
                  }}
                >
                  Claim Rewards
                </Button>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="w-full">
                <h3 className="text-xs font-medium text-muted-foreground">
                  My pool balance
                </h3>
                <p className="text-lg font-semibold text-foreground">
                  {formatUsd(userTotalValue ?? 0)}
                </p>
              </div>

              <div className="flex w-full flex-row items-center justify-end gap-2">
                <Button
                  variant={"secondary"}
                  onClick={() =>
                    router.push(`/pool/${pool?.pool}/add-liquidity`)
                  }
                >
                  <Icons.add />
                  <span className="xs:hidden hidden sm:block md:block lg:block">
                    Add
                  </span>
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() => router.push(`/pool/${pool?.pool}/withdraw`)}
                >
                  <Icons.subtract />
                  <span className="xs:hidden hidden sm:block md:block lg:block">
                    Withdraw
                  </span>
                </Button>
                <Button
                  className="xs:hidden hidden sm:block md:block lg:hidden"
                  variant={"outline"}
                  onClick={() =>
                    router.push(
                      `?inputCurrency=${getAddress(
                        pool?.tokens[0]?.address as string,
                      )}`,
                    )
                  }
                >
                  Swap
                </Button>
              </div>
            </CardContent>
          </Card>
          <SwapCard
            showBear={false}
            isMainPage={false}
            inputCurrency={getAddress(pool?.tokens[0]?.address as string)}
            outputCurrency={getAddress(pool?.tokens[1]?.address as string)}
            className="hidden lg:contents"
          />
        </div>
      </div>
      <SwapCard
        showBear={true}
        isMainPage={false}
        inputCurrency={getAddress(pool?.tokens[0]?.address as string)}
        outputCurrency={getAddress(pool?.tokens[1]?.address as string)}
        className="xs:block block sm:hidden md:hidden lg:hidden"
      />
    </div>
  );
}
