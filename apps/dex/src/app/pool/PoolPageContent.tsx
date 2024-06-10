"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  truncateHash,
  useBeraJs,
  useBgtApy,
  usePoolHistoricalData,
  usePoolRecentProvisions,
  usePoolRecentSwaps,
  usePoolUserPosition,
  type IProvision,
  type ISwaps,
  type PoolV2,
} from "@bera/berajs";
import { beraTokenAddress, blockExplorerUrl } from "@bera/config";
import {
  ApyTooltip,
  BgtStationBanner,
  FormattedNumber,
  PoolHeader,
  TokenIcon,
  TokenIconList,
} from "@bera/shared-ui";
import { truncateFloat } from "@bera/shared-ui/src/utils";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Separator } from "@bera/ui/separator";
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
import { Address, getAddress } from "viem";

import formatTimeAgo from "~/utils/formatTimeAgo";
import {
  getPoolAddLiquidityUrl,
  getPoolWithdrawUrl,
} from "../pools/fetchPools";
import { PoolChart } from "./PoolChart";
import { usePoolEvents } from "./usePoolEvents";

interface IPoolPageContent {
  pool: PoolV2;
}

const getTokenDisplay = (
  event: ISwapOrProvision | ISwaps | IProvision,
  pool: PoolV2,
) => {
  if ((event as IProvision).changeType === undefined) {
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon
            address={(event as ISwaps).swapIn?.address ?? "0x"}
            symbol={(event as ISwaps).swapIn?.symbol ?? ""}
          />
          <p className="ml-2">
            <FormattedNumber value={(event as ISwaps).swapInAmount} />
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon
            address={(event as ISwaps).swapOut?.address ?? "0x"}
            symbol={(event as ISwaps).swapOut?.symbol ?? ""}
          />
          <p className="ml-2">
            <FormattedNumber value={(event as ISwaps).swapOutAmount} />
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-evenly flex flex-row items-center">
      {pool.tokens.map((token, i) => {
        return (
          <div className={cn("flex flex-row", i !== 0 && "ml-[-10px]")} key={i}>
            <TokenIcon address={token.address} symbol={token.symbol} />
          </div>
        );
      })}
    </div>
  );
};

const getAction = (event: ISwapOrProvision | ISwaps | IProvision) => {
  if ((event as IProvision).changeType === undefined) {
    return <p>Swap</p>;
  }
  if ((event as IProvision).changeType === "mint") {
    return <p className="text-positive">Add</p>;
  }
  return <p className="text-destructive-foreground">Withdraw</p>;
};

enum Selection {
  AllTransactions = "allTransactions",
  Swaps = "swaps",
  AddsWithdrawals = "addsWithdrawals",
}

const TokenView = ({
  tokens,
}: {
  tokens: {
    address: string;
    symbol: string;
    value: string | number;
    valueUSD?: string | number;
  }[];
}) => {
  return (
    <>
      <div className="mb-4 text-sm font-medium">Tokens</div>
      <div>
        {tokens?.map((token, index) => {
          return (
            <div
              className="flex h-8 items-center justify-between"
              key={`token-list-${index}-${token.address}-${token.value}`}
            >
              <div
                className="group flex cursor-pointer gap-1"
                onClick={() => {
                  if (token.address) {
                    window.open(`${blockExplorerUrl}/address/${token.address}`);
                  }
                }}
              >
                <TokenIcon address={token.address} symbol={token.symbol} />
                <div className="ml-1 font-medium uppercase group-hover:underline">
                  {token.address === beraTokenAddress ? "wbera" : token.symbol}
                </div>
              </div>

              <div className="flex gap-2">
                <div className="font-medium">
                  <FormattedNumber value={token.value} />
                </div>
                <div className="text-sm text-muted-foreground">
                  <FormattedNumber value={token.valueUSD ?? 0} symbol="USD" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const EventTable = ({
  pool,
  events,
  isLoading,
}: {
  pool: PoolV2;
  events: (ISwapOrProvision[] | ISwaps[] | IProvision[]) | undefined;
  isLoading: boolean | undefined;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="xs:hidden hidden sm:table-cell	 md:table-cell	 lg:table-cell">
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
          events?.map((event: ISwapOrProvision | ISwaps | IProvision) => {
            if (!event) return null;
            const txHash = event.transactionHash;
            return (
              <TableRow
                key={txHash}
                onClick={() =>
                  window.open(
                    `${blockExplorerUrl}/tx/${txHash ?? ""}`,
                    "_blank",
                  )
                }
              >
                <TableCell>{getAction(event)}</TableCell>
                <TableCell>
                  <FormattedNumber
                    value={event.estimatedHoneyValue ?? 0}
                    symbol="USD"
                  />
                </TableCell>
                <TableCell className="xs:hidden	 hidden	 font-medium	 sm:table-cell	 md:table-cell lg:table-cell">
                  {getTokenDisplay(event, pool)}
                </TableCell>
                <TableCell className="xs:hidden	 hidden	 sm:table-cell	 md:table-cell	 lg:table-cell">
                  {truncateHash(event?.user ?? "")}
                </TableCell>
                <TableCell
                  className="overflow-hidden truncate whitespace-nowrap text-right "
                  suppressHydrationWarning
                >
                  {formatTimeAgo(event.time ?? 0)}
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

type ISwapOrProvision = ISwaps | IProvision;
export default function PoolPageContent({ pool }: IPoolPageContent) {
  // const { useBgtReward } = usePollBgtRewards([pool?.pool]);
  // const { data: bgtRewards } = useBgtReward(pool?.pool);

  const { data: swaps, isLoading: isRecentSwapsLoading } = usePoolRecentSwaps({
    pool,
  });

  const { data: provisions, isLoading: isRecentProvisionsLoading } =
    usePoolRecentProvisions({ pool });

  const isLoading = isRecentSwapsLoading || isRecentProvisionsLoading;

  const combinedEvents: ISwapOrProvision[] | undefined = useMemo(() => {
    if (!swaps || !provisions) return undefined;
    return [...swaps, ...provisions].sort((a, b) => b.time - a.time);
  }, [swaps, provisions]);
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
  } = usePoolEvents({
    pool,
    swaps,
    provisions,
    combinedEvents,
  });

  const { data: bgtApr } = useBgtApy({
    receiptTokenAddress: pool.shareAddress as Address,
    tvlInHoney: Number(pool.tvlUsd),
  });

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

  const { isReady, isConnected, isWrongNetwork } = useBeraJs();

  const { data: userPositionBreakdown, isLoading: isPositionBreakdownLoading } =
    usePoolUserPosition({
      pool,
    });

  const { data: poolHistoryData, isLoading: isPoolHistoryLoading } =
    usePoolHistoricalData({
      shareAddress: pool.shareAddress,
    });

  const poolHistory = poolHistoryData?.history;
  const timeCreated = poolHistoryData?.info?.timeCreate
    ? new Date(parseInt(poolHistoryData?.info.timeCreate) * 1000)
    : null;

  const params = useSearchParams();
  const isMyPool = params.get("back") && params.get("back") === "my-pools";

  return (
    <div className="flex flex-col gap-8">
      <PoolHeader
        back={{
          backURL: isMyPool ? "/pools?pool=userPools" : "/pools",
          backTitle: isMyPool ? "My Pools" : "All Pools",
        }}
        title={
          <>
            <TokenIconList tokenList={pool?.tokens ?? []} size="xl" />
            {pool?.poolName}
          </>
        }
        subtitles={[
          // {
          //   title: "APY",
          //   content: <>{pool?.totalApy?.toFixed(2)}%</>,
          //   color: "success",
          // },
          {
            title: "BGT APY",
            content: <FormattedNumber value={bgtApr ?? 0} percent colored />,
            color: "warning",
            tooltip: <ApyTooltip />,
          },
          {
            title: "Fee",
            content: <>{pool.feeRate.toFixed(2)}%</>,
            color: "success",
          },
          {
            title: "Pool Contract",
            content: <>{truncateHash(pool?.shareAddress ?? "")}</>,
            externalLink: `${blockExplorerUrl}/address/${pool?.shareAddress}`,
          },
        ]}
        actions={
          <>
            <Link href={getPoolAddLiquidityUrl(pool)} target="_self">
              <Button variant="outline">
                <Icons.add />
                <span className="ml-1">Add</span>
              </Button>
            </Link>
            <Link href={getPoolWithdrawUrl(pool)} target="_self">
              <Button variant="outline">
                <Icons.subtract />
                <span className="ml-1">Withdraw</span>
              </Button>
            </Link>
          </>
        }
      />
      <Separator />
      <BgtStationBanner
        receiptTokenAddress={
          pool?.shareAddress ? getAddress(pool?.shareAddress) : undefined
        }
      />
      <div className="flex w-full grid-cols-5 flex-col gap-4 lg:grid">
        <div className="col-span-5 flex w-full flex-col gap-4 lg:col-span-3">
          <PoolChart
            pool={pool}
            currentTvl={
              pool?.baseTokenHoneyTvl && pool?.quoteTokenHoneyTvl
                ? Number(pool.baseTokenHoneyTvl) +
                  Number(pool.quoteTokenHoneyTvl)
                : 0
            }
            historicalData={poolHistory}
            timeCreated={timeCreated}
            isLoading={isPoolHistoryLoading}
          />
          <div className="mb-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  TVL
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                <FormattedNumber value={pool?.tvlUsd} symbol="USD" />
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Volume (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                <FormattedNumber value={pool?.volume24h} symbol="USD" />
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Fees (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                <FormattedNumber value={pool?.fees24h} symbol="USD" />
              </div>{" "}
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1 overflow-hidden truncate whitespace-nowrap text-sm ">
                  BGT APY <ApyTooltip />
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold text-warning-foreground">
                <FormattedNumber value={bgtApr ?? 0} percent colored />
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-5 flex w-full flex-col gap-5 lg:col-span-2">
          <Card className="p-4">
            <div className="mb-4 flex h-8 w-full items-center justify-between text-lg font-semibold lg:mb-8">
              Pool Liquidity
              <div className="text-2xl">
                <FormattedNumber value={pool?.tvlUsd} symbol="USD" />
              </div>
            </div>
            <TokenView
              tokens={[
                {
                  address: pool.baseInfo.address,
                  symbol: pool.baseInfo.symbol,
                  value: pool.baseTokens,
                  valueUSD: pool.baseTokenHoneyTvl,
                },
                {
                  address: pool.quoteInfo.address,
                  symbol: pool.quoteInfo.symbol,
                  value: pool.quoteTokens,
                  valueUSD: pool.quoteTokenHoneyTvl,
                },
              ]}
            />
          </Card>
          {isConnected &&
            !isWrongNetwork &&
            userPositionBreakdown &&
            userPositionBreakdown.estimatedHoneyValue > 0 && (
              <Card>
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <div className="w-full ">
                    <div className="mb-4 flex h-8 w-full items-center justify-between text-lg font-semibold lg:mb-8">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        My pool balance
                      </h3>
                      <div className="text-2xl">
                        {isReady ? (
                          isPositionBreakdownLoading ? (
                            <Skeleton className="h-[32px] w-[150px]" />
                          ) : (
                            <FormattedNumber
                              value={
                                userPositionBreakdown?.estimatedHoneyValue ?? 0
                              }
                              symbol="USD"
                            />
                          )
                        ) : (
                          <Skeleton className="h-[32px] w-[150px]" />
                        )}
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-8">
                      <TokenView
                        tokens={[
                          {
                            address: pool.baseInfo.address,
                            symbol: pool.baseInfo.symbol,
                            value:
                              truncateFloat(
                                userPositionBreakdown?.formattedBaseAmount,
                                6,
                              )?.toString() ?? "0",
                            valueUSD:
                              userPositionBreakdown?.baseHoneyValue ?? "0",
                          },
                          {
                            address: pool.quoteInfo.address,
                            symbol: pool.quoteInfo.symbol,
                            value:
                              truncateFloat(
                                userPositionBreakdown?.formattedQuoteAmount,
                                6,
                              )?.toString() ?? "0",
                            valueUSD:
                              userPositionBreakdown?.quoteHoneyValue ?? "0",
                          },
                        ]}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      </div>
      <Separator />
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
              <EventTable pool={pool} events={allData} isLoading={isLoading} />
            </TabsContent>
            <TabsContent
              value={Selection.Swaps}
              className="mt-0 overflow-x-auto"
            >
              <EventTable pool={pool} events={swapData} isLoading={isLoading} />
            </TabsContent>
            <TabsContent
              value={Selection.AddsWithdrawals}
              className="mt-0 overflow-x-auto"
            >
              <EventTable
                pool={pool}
                events={provisionData}
                isLoading={isLoading}
              />
            </TabsContent>
          </Card>
          <div className="mt-4 flex justify-center">{getLoadMoreButton()}</div>
        </Tabs>
      </section>
    </div>
  );
}
