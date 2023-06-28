"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  formatUsd,
  usePollBalance,
  usePollPools,
  type Pool,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";
import { Balancer } from "react-wrap-balancer";
import { formatUnits } from "viem";

export default function PoolPageContent({
  params,
}: {
  params: { address: string };
}) {
  const router = useRouter();
  const { useSelectedPool } = usePollPools();
  const pool: Pool | undefined = useSelectedPool(params.address);
  const { useBalance } = usePollBalance({ address: pool?.shareAddress });
  const shareBalance = useBalance();
  return (
    <div className="m-auto flex w-full flex-col px-12 pb-10">
      <h1 className="pb-2 text-left text-2xl font-semibold">Weighted Pool</h1>
      <div className="my-4 flex gap-2">
        {pool?.weights?.map((token) => (
          <div
            key={token.address}
            className="flex w-fit items-center gap-2 rounded bg-primary p-2"
          >
            <TokenIcon token={token} className="h-8 w-8 text-xs" />
            <p>
              {token.symbol}{" "}
              <span className="text-xs text-muted-foreground">
                {token.weight * 100}%
              </span>
            </p>
          </div>
        ))}
      </div>
      <p className="pb-2">
        Swap Fee:{" "}
        <span className="text-muted-foreground">
          {formatUnits(pool?.swapFee ?? "", 0)}%
        </span>
      </p>
      <div className="grid gap-5 lg:grid-cols-3 ">
        <div className="flex flex-col gap-5 lg:order-2 lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-2">
              <div className="text-left">
                <h3 className="text-md">Deposited</h3>
                <p className="text-xs text-muted-foreground">
                  Virtual Price (USD)
                </p>
              </div>
              <div className="text-right">
                <Balancer className="text-md">
                  {shareBalance?.formattedBalance} {pool?.name}
                </Balancer>
                <p className="text-xs text-muted-foreground">
                  {formatUsd(shareBalance?.formattedBalance ?? "0")}
                </p>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <Button
                size="lg"
                className="grow"
                onClick={() =>
                  router.push(`/pool/${pool?.address}/add-liquidity`)
                }
              >
                Add Liquidity
              </Button>
              <Button
                size="lg"
                variant={"secondary"}
                onClick={() => router.push(`/pool/${pool?.address}/withdraw`)}
              >
                Withdraw
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-5 lg:order-1 lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <p>Chart data goes here</p>
            </CardContent>
          </Card>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Pool value</h3>
              </CardHeader>
              <CardContent className="p-2">
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
          <section>
            <h2 className="pb-2 text-lg">Pool Composition</h2>
            <Card className="">
              <Table className="border-separate border-spacing-y-2 p-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Token</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="text-right">Weight %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pool?.weights?.map((token) => (
                    <TableRow
                      key={token.symbol}
                      className="rounded-md outline outline-secondary"
                    >
                      <TableCell className="flex flex-row items-center gap-2 font-medium">
                        <TokenIcon token={token} />
                        {token.name}
                      </TableCell>
                      <TableCell>{token.formattedAmountDeposited}</TableCell>
                      <TableCell>{formatUsd(token.totalPrice)}</TableCell>
                      <TableCell className="text-right">
                        {token.weight * 100}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>
          {/* <section>
            <h2 className="pb-2 text-lg">Liquidity Provision</h2>
            <Card>
              <Table className="border-separate border-spacing-y-2 p-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Action</TableHead>
                    <TableHead>
                      Virtual Price{" "}
                      <span className="text-xs text-muted-foreground">
                        (USD)
                      </span>
                    </TableHead>
                    <TableHead>Tokens</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {liquidityProvisions.map((provision, i) => (
                    <TableRow
                      key={i}
                      className="rounded-md outline outline-secondary"
                    >
                      <TableCell className="w-80 font-medium">
                        {provision.action}
                      </TableCell>
                      <TableCell>{provision.value}</TableCell>
                      <TableCell>{provision.tokenAmount}</TableCell>
                      <TableCell className="text-right">
                        {provision.timeStamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>
          <section>
            <h2 className="pb-2 text-lg">Swaps</h2>
            <Card>
              <Table className="border-separate border-spacing-y-2 p-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Wallet</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {swaps.map((swap, i) => (
                    <TableRow
                      key={i}
                      className="rounded-md outline outline-secondary"
                    >
                      <TableCell className="w-80 font-medium">
                        {truncateWalletAddress(swap.wallet)}
                      </TableCell>
                      <TableCell>{swap.value}</TableCell>
                      <TableCell>{swap.fromAmount}</TableCell>
                      <TableCell className="text-right">
                        {swap.timeStamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section> */}
          <section></section>
        </div>
      </div>
    </div>
  );
}
