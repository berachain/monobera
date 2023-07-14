"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { formatUsd, type Token } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";
import { formatUnits } from "viem";

export default function PoolsTable({
  pools,
}: {
  pools: Pool[];
  mappedTokens: { [key: string]: string };
}) {
  const router = useRouter();

  return (
    <div className="rounded-lg border border-border shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Composition</TableHead>
            <TableHead>Pool name</TableHead>
            <TableHead>Pool value</TableHead>
            <TableHead>Volume (24h)</TableHead>
            <TableHead className="text-right">Fees</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools.length > 0 ? (
            pools?.map((pool: Pool) => (
              <TableRow
                key={pool.pool}
                onClick={() => router.push(`/pool/${pool.pool}`)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">
                  <div className="ml-2 flex flex-row justify-start">
                    {pool?.tokens.map((token: Token) => (
                      <TokenIcon
                        key={token.address}
                        token={token}
                        className="ml-[-15px] h-10 w-10  border-2 border-border "
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{pool.poolName}</TableCell>
                <TableCell>{formatUsd(pool.totalValue || 0)}</TableCell>
                <TableCell>$-</TableCell>
                <TableCell className="text-right">
                  {Number(formatUnits(BigInt(pool.swapFee) ?? "", 18)) * 100}%
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No pools</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
