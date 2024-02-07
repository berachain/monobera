"use client";

import React, { useState } from "react";
import {
  formatUsd,
  formatter,
  truncateHash,
  useBeraJs,
  type Token,
} from "@bera/berajs";
import { beraTokenAddress, blockExplorerUrl } from "@bera/config";
import {
  LIQUIDITY_CHANGED_TYPE,
  SWAP_DIRECTION,
  type Liquidity,
  type LiquidityChanged,
} from "@bera/graphql";
import { ApyTooltip, TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
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
import { formatUnits } from "viem";

import formatTimeAgo from "~/utils/formatTimeAgo";
import PoolHeader from "~/app/components/pool-header";
import { PoolChart } from "./PoolChart";
import { type PoolV2 } from "../pools/fetchPools";
import { Skeleton } from "@bera/ui/skeleton";
import { usePollUserPosition } from "~/hooks/usePollUserPosition";
interface IPoolPageContent {
  pool: PoolV2;
}

const getTokenDisplay = (event: LiquidityChanged, pool: PoolV2) => {
  if (event.type === LIQUIDITY_CHANGED_TYPE.SWAP) {
    const tokenIn =
      event.liquidity.find(
        (liq: Liquidity) => liq.swapDirection === SWAP_DIRECTION.IN,
      ) ?? ({} as any);
    const tokenOut =
      event.liquidity.find(
        (liq: Liquidity) => liq.swapDirection === SWAP_DIRECTION.OUT,
      ) ?? ({} as any);

    return (
      <div className="space-evenly flex flex-row items-center">
        <div className="flex items-center">
          <TokenIcon token={tokenIn.coin as Token} />
          <p className="ml-2">
            {Number(formatUnits(BigInt(tokenIn.amount), 18)).toFixed(4)}
          </p>
        </div>
        <Icons.chevronRight className="mx-2" />
        <div className="flex items-center">
          <TokenIcon token={tokenOut.coin as Token} />
          <p className="ml-2">
            {Number(formatUnits(BigInt(tokenOut.amount), 18)).toFixed(4)}
          </p>
        </div>
      </div>
    );
  }
  if (
    event.type === LIQUIDITY_CHANGED_TYPE.ADD ||
    event.type === LIQUIDITY_CHANGED_TYPE.REMOVE
  ) {
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

const getAction = (event: "SWAP" | "ADD" | "REMOVE") => {
  if (event === "SWAP") {
    return <p>Swap</p>;
  }
  if (event === "ADD") {
    return <p className="text-positive">Add</p>;
  }
  return <p className="text-destructive-foreground">Withdraw</p>;
};

const getValue = (pool: PoolV2 | undefined, event: LiquidityChanged) => {
  if (event.type === LIQUIDITY_CHANGED_TYPE.SWAP) {
    const tokenIn = event.liquidity.find(
      (liq: Liquidity) => liq.swapDirection === SWAP_DIRECTION.IN,
    );
    const formattedAmount = formatUnits(
      BigInt(tokenIn?.amount ?? 0),
      tokenIn?.coin.decimals ?? 18,
    );

    const price = Number(tokenIn?.latestPriceUsd.price);
    return price * Number(formattedAmount);
  }
  if (
    event.type === LIQUIDITY_CHANGED_TYPE.ADD ||
    event.type === LIQUIDITY_CHANGED_TYPE.REMOVE
  ) {
    const value = event.liquidity.reduce((acc, cur) => {
      const token = pool?.tokens.find(
        (token) =>
          token.address.toLowerCase() === cur.coin.address.toLowerCase(),
      );

      const price = Number(0);

      const tokenValue =
        Number(formatUnits(BigInt(cur.amount), token?.decimals ?? 18)) * price;
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

export const EventTable = ({
  pool,
  events,
  isLoading,
}: {
  pool: PoolV2;
  events: LiquidityChanged[];
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
          events?.map((event: LiquidityChanged) => {
            if (!event) return null;
            const txHash = event.id.split(":")[2];
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
                <TableCell>{getAction(event.type)}</TableCell>
                <TableCell>{formatUsd(getValue(pool, event) ?? "")}</TableCell>
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
                  {formatTimeAgo(event.timestamp ?? 0)}
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

export default function PoolPageContent({ pool }: IPoolPageContent) {
  // const { useBgtReward } = usePollBgtRewards([pool?.pool]);
  // const { data: bgtRewards } = useBgtReward(pool?.pool);

  const [_selectedTab, setSelectedTab] = useState(Selection.AllTransactions);
  // const {
  //   allData,
  //   allDataSize,
  //   setAllDataSize,
  //   isAllDataLoadingMore,
  //   isAllDataReachingEnd,
  //   swapData,
  //   swapDataSize,
  //   setSwapDataSize,
  //   isSwapDataLoadingMore,
  //   isSwapDataReachingEnd,
  //   provisionData,
  //   provisionDataSize,
  //   setProvisionDataSize,
  //   isProvisionDataLoadingMore,
  //   isProvisionDataReachingEnd,
  // } = usePoolEvents(pool?.pool);

  // const getLoadMoreButton = () => {
  //   if (selectedTab === Selection.AllTransactions) {
  //     return (
  //       <>
  //         {allData.length === 0 ? (
  //           false
  //         ) : (
  //           <Button
  //             onClick={() => setAllDataSize(allDataSize + 1)}
  //             disabled={isAllDataLoadingMore || isAllDataReachingEnd}
  //             variant="outline"
  //           >
  //             {isAllDataLoadingMore
  //               ? "Loading..."
  //               : isAllDataReachingEnd
  //                 ? "No more transactions"
  //                 : "Load more"}
  //           </Button>
  //         )}
  //       </>
  //     );
  //   }
  //   if (selectedTab === Selection.Swaps) {
  //     return (
  //       <>
  //         {swapData.length === 0 ? (
  //           false
  //         ) : (
  //           <Button
  //             onClick={() => setSwapDataSize(swapDataSize + 1)}
  //             disabled={isSwapDataLoadingMore || isSwapDataReachingEnd}
  //             variant="outline"
  //           >
  //             {isSwapDataLoadingMore
  //               ? "Loading..."
  //               : isSwapDataReachingEnd
  //                 ? "No more transactions"
  //                 : "Load more"}
  //           </Button>
  //         )}
  //       </>
  //     );
  //   }
  //   if (selectedTab === Selection.AddsWithdrawals) {
  //     return (
  //       <>
  //         {provisionData.length === 0 ? (
  //           false
  //         ) : (
  //           <Button
  //             onClick={() => setProvisionDataSize(provisionDataSize + 1)}
  //             disabled={
  //               isProvisionDataLoadingMore || isProvisionDataReachingEnd
  //             }
  //             variant="outline"
  //           >
  //             {isProvisionDataLoadingMore
  //               ? "Loading..."
  //               : isProvisionDataReachingEnd
  //                 ? "No more transactions"
  //                 : "Load more"}
  //           </Button>
  //         )}
  //       </>
  //     );
  //   }
  // };

  // usePositionSize({ pool });
  // const { isConnected } = useBeraJs();
  // const { isSmall, numericValue: formattedBGTRewards } =
  //   formatAmountSmall(bgtRewards);
  const { isReady } = useBeraJs();
  const { usePosition, isLoading: isPositionBreakdownLoading } =
    usePollUserPosition(pool);

  const userAmbientPosition = usePosition();
  const userPositionBreakdown = userAmbientPosition?.userPosition;
  // const { isLoading, useUserPool } = usePollUsersPools();
  // const userPool = useUserPool(pool.pool);

  return (
    <div className="flex flex-col gap-8">
      <PoolHeader pool={pool} />

      <div className="flex w-full grid-cols-5 flex-col-reverse gap-4 lg:grid">
        <div className="col-span-5 flex w-full flex-col gap-4 lg:col-span-3">
          <PoolChart
            currentTvl={Number(pool.tvlUsd) ?? 0}
            historicalData={[]}
          />
          <div className="mb-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="px-4 py-2">
              <div className="flex flex-row items-center justify-between">
                <div className="overflow-hidden truncate whitespace-nowrap text-sm ">
                  TVL
                </div>
              </div>
              <div className="overflow-hidden truncate whitespace-nowrap text-lg font-semibold">
                ${formatter.format(0)}
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
                <p className="mt-1 text-lg font-semibold text-foreground">
                  {isReady ? (
                    isPositionBreakdownLoading ? (
                      <Skeleton className="h-[32px] w-[150px]" />
                    ) : (
                      formatUsd(userPositionBreakdown?.estimatedHoneyValue ?? 0)
                    )
                  ) : (
                    <Skeleton className="h-[32px] w-[150px]" />
                  )}
                </p>
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
              {pool?.tokens?.map((token) => (
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
                    <div className="font-medium">{formatter.format(0)}</div>
                    <div className="text-sm text-muted-foreground">
                      {" "}
                      {formatUsd(Number(0) * Number(0))}
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
              <EventTable pool={pool} events={[]} isLoading={false} />
            </TabsContent>
            <TabsContent
              value={Selection.Swaps}
              className="mt-0 overflow-x-auto"
            >
              <EventTable pool={pool} events={[]} isLoading={false} />
            </TabsContent>
            <TabsContent
              value={Selection.AddsWithdrawals}
              className="mt-0 overflow-x-auto"
            >
              <EventTable pool={pool} events={[]} isLoading={false} />
            </TabsContent>
          </Card>
          {/* <div className="mt-4 flex justify-center">{getLoadMoreButton()}</div> */}
        </Tabs>
      </section>
    </div>
  );
}
