"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatUsd, usePollPools, type Pool } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";

export default function PoolsTable() {
  const router = useRouter();
  const { usePools } = usePollPools();
  const pools: Pool[] | undefined = usePools();
  return (
    <div className="p-5">
      <Table className="border-separate border-spacing-y-2 p-1">
        <TableHeader>
          <TableRow>
            <TableHead className="">
              <div className="flex">
                <Icons.circle />
                <Icons.circle className="ml-[-15px]" />
              </div>
            </TableHead>
            <TableHead className="">Composition</TableHead>
            <TableHead>Pool value</TableHead>
            <TableHead>Volume (24h)</TableHead>
            <TableHead className="text-right">APR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools?.map((pool: Pool) => (
            <TableRow
              key={pool.address}
              onClick={() => router.push(`/pool/${pool.address}`)}
              className="cursor-pointer rounded-md outline outline-secondary"
            >
              <TableCell className="font-medium">
                <div className="ml-2 flex flex-row justify-start">
                  {pool?.weights.map((token) => (
                    <TokenIcon
                      key={token.address}
                      token={token}
                      className="ml-[-15px] h-10 w-10  border-2 border-white "
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="font-medium">
                <div className="ml-2 flex flex-row justify-start gap-2">
                  {pool?.weights.map((token) => (
                    <div
                      className="items-center rounded-sm bg-gray-400 p-2 text-center "
                      key={token.address}
                    >
                      <p>
                        {token.symbol}-{token.weight * 100}%
                      </p>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>{formatUsd(pool.totalValue)}</TableCell>
              <TableCell>$-</TableCell>
              <TableCell className="text-right">-%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
