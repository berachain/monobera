"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";

import { pools } from "~/utils/constants";

export default function PoolsTable() {
  const router = useRouter();
  return (
    <div className="p-5">
      <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow>
            <TableHead className="">Composition</TableHead>
            <TableHead>Pool value</TableHead>
            <TableHead>Volume (24h)</TableHead>
            <TableHead className="text-right">APR</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pools.map((pool) => (
            <TableRow
              key={pool.id}
              onClick={() => router.push(`/pool/${pool.id}`)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">{pool.name}</TableCell>
              <TableCell>{pool.value}</TableCell>
              <TableCell>{pool.volume}</TableCell>
              <TableCell className="text-right">{pool.apr}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
