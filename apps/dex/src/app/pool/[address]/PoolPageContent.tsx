"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  formatUsd,
  truncateHash,
  usePollBalance,
  usePollPools,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
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

type LiquidityEvent = {
  metadata: {
    blockNum: string;
    txHash: string;
    blockHash: string;
    blockTime: string;
    txIndex: string;
  };
  pool: string;
  input: { denom: string; amount: string };
  output: { denom: string; amount: string };
};

export default function PoolPageContent({
  params,
  liquidityEvents,
}: {
  params: { address: string };
  liquidityEvents: LiquidityEvent[];
}) {
  const router = useRouter();
  const { useSelectedPool } = usePollPools();
  const { data: pool, isLoading } = useSelectedPool(params.address);
  const { useBalance } = usePollBalance({ address: pool?.shareAddress });
  const shareBalance = useBalance();

  if (isLoading) {
    // TODO loading skeleton state
    return <p>Loading...</p>;
  }
  console.log("LIQUIDITY EVENTS: ", liquidityEvents);
  console.log("POOL: ", pool);
  return (
    <div className="container">
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <div>
          <h1 className="pb-2 text-left text-4xl font-extrabold lg:text-6xl">
            {pool?.name}
          </h1>
          <div className="flex flex-row gap-2">
            <Badge variant="outline">
              <Link href={`/pool/${pool?.address}`} target="_blank">
                <p className="text-left text-sm text-muted-foreground">
                  {truncateHash(pool?.address)}
                  <Icons.external className="ml-1 inline-block h-5 w-5" />
                </p>
              </Link>
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {formatUnits(pool?.swapFee ?? "", 18)}% swap fee
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
                onClick={() =>
                  router.push(`/pool/${pool?.address}/add-liquidity`)
                }
              >
                Deposit
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => router.push(`/pool/${pool?.address}/withdraw`)}
              >
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
                {pool?.weights?.map((token) => (
                  <TableRow key={token.symbol}>
                    <TableCell className="flex flex-row items-center gap-2 font-medium">
                      <TokenIcon token={token} />
                    </TableCell>
                    <TableCell>{token.weight * 100}%</TableCell>
                    <TableCell className="text-right">
                      {token.formattedAmountDeposited} {token.name} (
                      {formatUsd(token.totalPrice)})
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <p>Chart data goes here</p>
            </CardContent>
          </Card>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card className="p-2">
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Total liquidity </h3>
              </CardHeader>
              <CardContent className="p-2 text-xl font-semibold">
                {formatUsd(pool?.totalValue ?? "0")}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Volume (24h)</h3>
              </CardHeader>
              <CardContent className="p-2">$-</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Fees (24h)</h3>
              </CardHeader>
              <CardContent className="p-2">$-</CardContent>
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
        <Tabs defaultValue="allTransactions">
          <TabsList>
            <TabsTrigger value="allTransactions">All transactions</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
            <TabsTrigger value="addsWithdrawals">
              Swaps &amp; Withdrawals
            </TabsTrigger>
          </TabsList>
          <Card>
            <TabsContent value="allTransactions">
              <Table className="border-separate border-spacing-y-2 p-2">
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
                  {liquidityEvents.length
                    ? liquidityEvents.map((event) => (
                        <TableRow
                          key={event.metadata.txHash}
                          className="rounded-md outline outline-secondary"
                        >
                          <TableCell>Action</TableCell>
                          <TableCell>value</TableCell>
                          <TableCell>tokens</TableCell>
                          <TableCell>account</TableCell>
                          <TableCell className="text-right">time</TableCell>
                        </TableRow>
                      ))
                    : "No transactions yet"}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="swaps">stuff</TabsContent>
            <TabsContent value="addsWithdrawals">stuff</TabsContent>
          </Card>
        </Tabs>
      </section>
    </div>
  );
}
