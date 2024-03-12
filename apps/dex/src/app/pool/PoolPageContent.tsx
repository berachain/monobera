"use client";

import React, { useEffect, useMemo, useState } from "react";
import { formatUsd, formatter, truncateHash, useBeraJs } from "@bera/berajs";
import {
  beraTokenAddress,
  blockExplorerUrl,
  chainId,
  crocIndexerEndpoint,
} from "@bera/config";
import { ApyTooltip, TokenIcon } from "@bera/shared-ui";
import { useAnalytics } from "@bera/shared-ui/src/utils/analytics";
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

import formatTimeAgo from "~/utils/formatTimeAgo";
import PoolHeader from "~/app/components/pool-header";
import { usePollUserPosition } from "~/hooks/usePollUserPosition";
import {
  usePoolRecentProvisions,
  type IProvisions,
} from "~/hooks/usePoolRecentProvisions";
import { usePoolRecentSwaps, type ISwaps } from "~/hooks/usePoolRecentSwaps";
import { formatNumber } from "../../../../../packages/berajs/src/utils/formatNumber";
import { type PoolV2 } from "../pools/fetchPools";
import { PoolChart } from "./PoolChart";
import { usePoolEvents } from "./usePoolEvents";

interface IPoolPageContent {
  pool: PoolV2;
}

const getTokenDisplay = (
  event: ISwapOrProvision | ISwaps | IProvisions,
  pool: PoolV2,
) => {
  if ((event as IProvisions).changeType === undefined) {
    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon
            address={(event as ISwaps).swapIn.address}
            symbol={(event as ISwaps).swapIn.symbol}
          />
          <p className="ml-2">{formatNumber((event as ISwaps).swapInAmount)}</p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon
            address={(event as ISwaps).swapOut.address}
            symbol={(event as ISwaps).swapOut.symbol}
          />
          <p className="ml-2">
            {formatNumber((event as ISwaps).swapOutAmount)}
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

const getAction = (event: ISwapOrProvision | ISwaps | IProvisions) => {
  if ((event as IProvisions).changeType === undefined) {
    return <p>Swap</p>;
  }
  if ((event as IProvisions).changeType === "mint") {
    return <p className="text-positive">Add</p>;
  }
  return <p className="text-destructive-foreground">Withdraw</p>;
};

enum Selection {
  AllTransactions = "allTransactions",
  Swaps = "swaps",
  AddsWithdrawals = "addsWithdrawals",
}

export const EventTable = ({
  pool,
  events,
  isLoading,
}: {
  pool: PoolV2;
  events: (ISwapOrProvision[] | ISwaps[] | IProvisions[]) | undefined;
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
          events?.map((event: ISwapOrProvision | ISwaps | IProvisions) => {
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
                  {formatUsd(event.estimatedHoneyValue ?? "0")}
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

type ISwapOrProvision = ISwaps | IProvisions;
export default function PoolPageContent({ pool }: IPoolPageContent) {
  // const { useBgtReward } = usePollBgtRewards([pool?.pool]);
  // const { data: bgtRewards } = useBgtReward(pool?.pool);

  const { useRecentSwaps, isLoading: isRecentSwapsLoading } =
    usePoolRecentSwaps(pool);

  const { useRecentProvisions, isLoading: isRecentProvisionsLoading } =
    usePoolRecentProvisions(pool);

  const isLoading = isRecentSwapsLoading || isRecentProvisionsLoading;

  const swaps = useRecentSwaps();
  const provisions = useRecentProvisions();

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

  // const { isSmall, numericValue: formattedBGTRewards } =
  //   formatAmountSmall(bgtRewards);
  const { isReady } = useBeraJs();
  const { usePosition, isLoading: isPositionBreakdownLoading } =
    usePollUserPosition(pool);

  const { captureException } = useAnalytics();

  const userAmbientPosition = usePosition();
  const userPositionBreakdown = userAmbientPosition?.userPosition;

  const [poolHistory, setPoolHistory] = useState<any | null>(null);

  const fetchPoolHistory = (pool: PoolV2) => {
    if (!pool) return;
    return fetch(
      `${crocIndexerEndpoint}/v2/pool_history?chainId=0x${chainId.toString(
        16,
      )}&base=${pool.base}&quote=${pool.quote}&poolIdx=${pool.poolIdx}&days=7`,
    )
      .then((data) => data.json())
      .then((data) => {
        setPoolHistory(data?.data);
      })
      .catch((e) => {
        captureException(e);
      });
  };

  useEffect(() => {
    fetchPoolHistory(pool);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool]);

  return (
    <div className="flex flex-col gap-8">
      <PoolHeader pool={pool} />

      <div className="flex w-full grid-cols-5 flex-col-reverse gap-4 lg:grid">
        <div className="col-span-5 flex w-full flex-col gap-4 lg:col-span-3">
          <PoolChart
            currentTvl={
              pool?.baseTokenHoneyTvl && pool?.quoteTokenHoneyTvl
                ? Number(pool.baseTokenHoneyTvl) +
                  Number(pool.quoteTokenHoneyTvl)
                : 0
            }
            historicalData={poolHistory}
          />
          <div className="mb-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  TVL
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                ${formatter.format(pool.tvlUsd)}
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Volume (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                ${formatter.format(0)}
              </div>
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  Fees (24h)
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                {pool.volumeUsd && Number(pool.volumeUsd) !== 0
                  ? formatUsd(pool.fees ?? "0")
                  : "$0"}
              </div>{" "}
            </Card>
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-1 overflow-hidden truncate whitespace-nowrap text-sm ">
                  APY <ApyTooltip />
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                {/* {(pool?.totalApy ?? 0) > 100000
                  ? formatter.format(pool?.totalApy ?? 0)
                  : (pool?.totalApy ?? 0).toFixed(2)} */}
                0%
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
                <span className="mt-1 text-lg font-semibold text-foreground">
                  {isReady ? (
                    isPositionBreakdownLoading ? (
                      <Skeleton className="h-[32px] w-[150px]" />
                    ) : (
                      formatUsd(userPositionBreakdown?.estimatedHoneyValue ?? 0)
                    )
                  ) : (
                    <Skeleton className="h-[32px] w-[150px]" />
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
          {
            false && false
            // <Card>
            //   <CardContent className="flex items-center justify-between gap-4 p-4">
            //     <div>
            //       <h3 className="text-xs font-medium text-muted-foreground">
            //         Rewards available
            //       </h3>
            //       <div className="flex items-center gap-1">
            //         <p className="text-lg font-semibold text-foreground">
            //           {isSmall
            //             ? `< ${formattedBGTRewards} BGT`
            //             : `${formattedBGTRewards.toFixed(2)} BGT`}
            //         </p>
            //         <Tooltip text="Please note: If your accrued BGT Rewards are less than 0.01, your balance will be displayed as '< 0.01'." />
            //       </div>
            //     </div>
            //     {/* @ts-ignore */}
            //     <RewardBtn poolAddress={pool?.pool} variant={"warning"} />
            //   </CardContent>
            // </Card>
          }
          <Card className="p-4">
            <div className="mb-8 flex h-8 w-full items-center justify-between text-lg font-semibold">
              Pool Liquidity
              <div className="text-2xl">
                ${formatter.format(pool?.tvlUsd ?? 0)}
              </div>
            </div>
            <div className="mb-4 text-sm font-medium">Tokens</div>
            <div>
              <div className="flex h-8 items-center justify-between">
                <div className="flex gap-1">
                  <TokenIcon
                    address={pool.baseInfo.address}
                    symbol={pool.baseInfo.symbol}
                  />
                  <div className="ml-1 font-medium uppercase">
                    {pool.base === beraTokenAddress
                      ? "wbera"
                      : pool.baseInfo.symbol}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="font-medium">
                    {formatter.format(Number(pool.baseTokens))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {" "}
                    {formatUsd(pool.baseTokenHoneyTvl)}
                  </div>
                </div>
              </div>
              <div className="flex h-8 items-center justify-between">
                <div className="flex gap-1">
                  <TokenIcon
                    address={pool.quoteInfo.address}
                    symbol={pool.quoteInfo.symbol}
                  />
                  <div className="ml-1 font-medium uppercase">
                    {pool.quote === beraTokenAddress
                      ? "wbera"
                      : pool.quoteInfo.symbol}
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="font-medium">
                    {formatter.format(Number(pool.quoteTokens))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {" "}
                    {formatUsd(pool.quoteTokenHoneyTvl)}
                  </div>
                </div>
              </div>
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
              <EventTable pool={pool} events={allData} isLoading={isLoading} />
            </TabsContent>
            <TabsContent
              value={Selection.Swaps}
              className="mt-0 overflow-x-auto"
            >
              <EventTable pool={pool} events={swaps} isLoading={isLoading} />
            </TabsContent>
            <TabsContent
              value={Selection.AddsWithdrawals}
              className="mt-0 overflow-x-auto"
            >
              <EventTable
                pool={pool}
                events={provisions}
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
