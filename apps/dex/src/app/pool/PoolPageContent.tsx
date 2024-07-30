"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useSearchParams } from "next/navigation";
import {
  Token,
  truncateHash,
  useBeraJs,
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
import { Address } from "viem";

import formatTimeAgo from "~/utils/formatTimeAgo";
import {
  getPoolAddLiquidityUrl,
  getPoolWithdrawUrl,
} from "../pools/fetchPools";
import { PoolChart } from "./PoolChart";
import { usePoolEvents } from "./usePoolEvents";
import { useSelectedPool } from "~/hooks/useSelectedPool";

const getTokenDisplay = (
  event: ISwapOrProvision | ISwaps | IProvision,
  pool: PoolV2 | undefined,
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
      {pool?.tokens.map((token: Token, i) => {
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
  isLoading,
}: {
  tokens: {
    address: string;
    symbol: string;
    value: string | number;
    valueUSD?: string | number;
  }[];
  isLoading: boolean;
}) => {
  return (
    <>
      <div className="mb-4 text-sm font-medium">Tokens</div>
      <div>
        {isLoading ? (
          <div>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full mt-2" />
          </div>
        ) : (
          tokens?.map((token, index) => {
            return (
              <div
                className="flex h-8 items-center justify-between"
                key={`token-list-${index}-${token.address}-${token.value}`}
              >
                <div
                  className="group flex cursor-pointer gap-1"
                  onClick={() => {
                    if (token.address) {
                      window.open(
                        `${blockExplorerUrl}/address/${token.address}`,
                      );
                    }
                  }}
                >
                  <TokenIcon address={token.address} symbol={token.symbol} />
                  <div className="ml-1 font-medium uppercase group-hover:underline">
                    {token.address === beraTokenAddress
                      ? "wbera"
                      : token.symbol}
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
          })
        )}
      </div>
    </>
  );
};

const EventTable = ({
  pool,
  events,
  isLoading,
}: {
  pool: PoolV2 | undefined;
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
                    value={event.estimatedUsdValue ?? 0}
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

export default function PoolPageContent({
  shareAddress,
}: { shareAddress: Address }) {
  const { data: pool, isLoading: isPoolLoading } =
    useSelectedPool(shareAddress);

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
      poolId: pool?.id,
    });

  const poolHistory = poolHistoryData;
  const timeCreated = pool?.timeCreate;

  return (
    <div className="flex flex-col gap-8">
      <PoolHeader
        title={
          isPoolLoading ? (
            <Skeleton className="h-10 w-40" />
          ) : (
            <>
              <TokenIconList tokenList={pool?.tokens ?? []} size="xl" />
              {pool?.poolName}
            </>
          )
        }
        subtitles={[
          {
            title: "BGT APY",
            content: isPoolLoading ? (
              <Skeleton className="h-4 w-8" />
            ) : (
              <FormattedNumber
                value={pool?.bgtApy ? parseFloat(pool.bgtApy) / 100 : 0}
                colored
                percent
              />
            ),
            color: "warning",
            tooltip: <ApyTooltip />,
          },
          {
            title: "Fee",
            content: isPoolLoading ? (
              <Skeleton className="h-4 w-8" />
            ) : (
              <>{pool?.feeRate.toFixed(2)}%</>
            ),
            color: "success",
          },
          {
            title: "Receipt Token",
            content: isPoolLoading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <>{truncateHash(pool?.shareAddress ?? "")}</>
            ),
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
      {isPoolLoading ? (
        <Skeleton className="h-16 w-full" />
      ) : (
        <BgtStationBanner
          receiptTokenAddress={pool?.shareAddress as Address}
          vaultAddress={pool?.vaultAddress as Address}
        />
      )}
      <div className="flex w-full grid-cols-5 flex-col gap-4 lg:grid">
        <div className="col-span-5 flex w-full flex-col gap-4 lg:col-span-3">
          <PoolChart
            pool={pool}
            currentTvl={pool?.tvlUsd}
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
                <FormattedNumber value={pool?.tvlUsd ?? 0} symbol="USD" />
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Volume (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                <FormattedNumber value={pool?.volume24h ?? 0} symbol="USD" />
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Fees (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                <FormattedNumber value={pool?.fees24h ?? 0} symbol="USD" />
              </div>{" "}
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1 overflow-hidden truncate whitespace-nowrap text-sm ">
                  BGT APY <ApyTooltip />
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold text-warning-foreground">
                <FormattedNumber
                  value={pool?.bgtApy ? parseFloat(pool.bgtApy) / 100 : 0}
                  colored
                  percent
                />
              </div>
            </Card>
          </div>
        </div>
        <div className="col-span-5 flex w-full flex-col gap-5 lg:col-span-2">
          <Card className="p-4">
            <div className="mb-4 flex h-8 w-full items-center justify-between text-lg font-semibold lg:mb-8">
              Pool Liquidity
              <div className="text-2xl">
                {isLoading || !pool?.tvlUsd ? (
                  <Skeleton className="h-10 w-20" />
                ) : (
                  <FormattedNumber value={pool?.tvlUsd ?? 0} symbol="USD" />
                )}
              </div>
            </div>
            <TokenView
              isLoading={isPoolLoading}
              tokens={
                !pool
                  ? []
                  : [
                      {
                        address: pool.baseInfo.address,
                        symbol: pool.baseInfo.symbol,
                        value: pool.baseTokens,
                        valueUSD:
                          parseFloat(pool.baseTokens) *
                          parseFloat(pool?.baseInfo?.usdValue ?? "0"),
                      },
                      {
                        address: pool.quoteInfo.address,
                        symbol: pool.quoteInfo.symbol,
                        value: pool.quoteTokens,
                        valueUSD:
                          parseFloat(pool.quoteTokens) *
                          parseFloat(pool?.quoteInfo?.usdValue ?? "0"),
                      },
                    ]
              }
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
                        isLoading={isPositionBreakdownLoading}
                        tokens={
                          !pool
                            ? []
                            : [
                                {
                                  address: pool.baseInfo.address,
                                  symbol: pool.baseInfo.symbol,
                                  value:
                                    truncateFloat(
                                      userPositionBreakdown?.formattedBaseAmount,
                                      6,
                                    )?.toString() ?? "0",
                                  valueUSD:
                                    userPositionBreakdown?.baseHoneyValue ??
                                    "0",
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
                                    userPositionBreakdown?.quoteHoneyValue ??
                                    "0",
                                },
                              ]
                        }
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
