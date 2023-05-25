import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
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

import {
  liquidityProvisions,
  poolDetails,
  swaps,
  tokens,
} from "~/utils/constants";
import { generateDataForPast90Days } from "~/utils/generateData";
import { truncateWalletAddress } from "~/utils/truncateWalletAddress";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function PoolPage({ params }: { params: { poolId: string } }) {
  return (
    <div className="m-auto flex w-full flex-col pb-10">
      <h1 className="text-left text-2xl font-semibold">{params.poolId}</h1>
      <div className="grid gap-5 lg:grid-cols-3 ">
        <div className="flex flex-col gap-5 lg:order-2 lg:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between p-2">
              <h3>My pool balance</h3>
              <h4>$420.69</h4>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 p-4">
              <Button size="lg" className="grow">
                Add Liquidity
              </Button>
              <Button size="lg" variant={"secondary"}>
                Withdraw
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center gap-5">
                      <Icons.check className="h-5 w-5 rounded-full border-2 border-positive fill-positive p-1" />{" "}
                      Lock LP for BGT
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <p>Locked LP tokens</p>
                    <p>Unlocked LP tokens</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button variant={"secondary"}>Lock</Button>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-5 lg:order-1 lg:col-span-2">
          <Card>
            <CardContent className="p-4">
              <DynamicChart
                chartData={generateDataForPast90Days()}
                type="bar"
                pool={params.poolId}
                showXAxis
              />
            </CardContent>
          </Card>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Pool value</h3>
              </CardHeader>
              <CardContent className="p-2">$207,608,532</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Volume (24h)</h3>
              </CardHeader>
              <CardContent className="p-2">$2,818,901</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>Fees (24h)</h3>
              </CardHeader>
              <CardContent className="p-2">$1,127.56</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-2">
                <h3>APR</h3>
              </CardHeader>
              <CardContent className="p-2">2.89% – 4.54%</CardContent>
            </Card>
          </div>
          <section>
            <h2>Pool composition</h2>
            <h3>Total composition</h3>
            <Card className="p-2">
              <Table className="border-separate border-spacing-y-2 p-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Token</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="text-right">Token %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokens.map((token) => (
                    <TableRow
                      key={token.symbol}
                      className="rounded-md outline outline-secondary"
                    >
                      <TableCell className="flex flex-row items-center gap-2 font-medium">
                        <Image
                          src={token.icon}
                          alt={token.name}
                          width={32}
                          height={32}
                        />
                        {token.name}
                      </TableCell>
                      <TableCell>{token.weight}</TableCell>
                      <TableCell>{token.balance}</TableCell>
                      <TableCell>{token.value}</TableCell>
                      <TableCell className="text-right">
                        {token.tokenP}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>
          <section>
            <h2>Liquidity provision</h2>
            <h3>All liquidity provision</h3>
            <Card>
              <Table className="border-separate border-spacing-y-2 p-2">
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Action</TableHead>
                    <TableHead>Value</TableHead>
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
                      <TableCell className="font-medium">
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
            <h2>Swaps</h2>
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
                      <TableCell className="font-medium">
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
          </section>
          <section>
            <h2>Pool details</h2>
            <Card>
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center justify-between">
                    <h3>Attribute</h3>
                    <h3>Details</h3>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h3>Pool name</h3>
                    <h3>{poolDetails.name}</h3>
                  </div>
                </div>
              </div>
            </Card>
          </section>
          <section>
            <h2>Pool management</h2>
            <p>
              The attributes of this pool are immutable, except for swap fees
              which can be edited via Governance.
            </p>
          </section>
          <section>
            <h2>Pool risks</h2>
            <p>Liquidity Providers in this pool face the following risks:</p>
            <ul>
              <li>Weighted pool risks</li>
              <li>Mutable attributes risks</li>
              <li>General Balancer protocol risks</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
