"use client";

import Link from "next/link";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { formatUsd, formatter } from "@bera/berajs";
import { DataTableColumnHeader, TokenIconList } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { type ColumnDef } from "@tanstack/react-table";

// import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { usePositionSize } from "~/hooks/usePositionSize";

export const columns: ColumnDef<Pool>[] = [
  {
    accessorKey: "poolName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="flex items-center gap-1"
        tooltip={
          <>
            Specific combination and ratio of assets in a liquidity pool, <br />
            influencing how users trade and liquidity providers earn fees
          </>
        }
        title={"Pool Composition"}
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-2">
        <span className="w-[180px] truncate text-left">
          {row.original.poolName}
        </span>
        <TokenIconList
          tokenList={row.original.tokens.map((t) => t.address)}
          size="lg"
        />
        <Badge
          variant={"secondary"}
          className="border-none px-2 py-1 text-[10px] leading-[10px] text-foreground"
        >
          {Number(row.original.formattedSwapFee).toFixed(2)}%
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        tooltip="Total amount of assets currently locked, in the Pool"
        title="TVL"
        className="min-w-[80px]"
      />
    ),
    cell: ({ row }) => {
      const totalValue = formatter.format(row.original.totalValue || 0);
      const tvl = row.original.weeklyTvl?.[6] || 0;
      const tvl24h = row.original.weeklyTvl?.[5] || 1;
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm leading-5">${totalValue}</div>
          <div
            className={cn(
              "text-[10px] leading-[10px]",
              tvl > tvl24h
                ? "text-success-foreground"
                : tvl < tvl24h
                ? "text-destructive-foreground"
                : " text-foreground",
            )}
          >
            {tvl > tvl24h && "+"}
            {(((tvl - tvl24h) / (tvl24h ?? 1)) * 100).toFixed(2)}%
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dailyFees",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fees (24H)"
        tooltip="Total transaction fees this pool has generated in the last 24 hours"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const dailyFees = formatter.format(row.original.dailyFees || 0);
      const fee = row.original.weeklyFees?.[6] || 0;
      const fee24h = row.original.weeklyFees?.[5] || 1;
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm leading-5">${dailyFees}</div>
          <div
            className={cn(
              "text-[10px] leading-[10px]",
              fee > fee24h
                ? "text-success-foreground"
                : fee < fee24h
                ? "text-destructive-foreground"
                : " text-foreground",
            )}
          >
            {fee > fee24h && "+"}
            {(((fee - fee24h) / fee24h) * 100).toFixed(2)}%
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dailyVolume",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Volume (24h)"
        tooltip="Total trading or transaction volume in the last 24 hours"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const dailyVolume = formatter.format(row.original.dailyVolume || 0);
      const volume = row.original.weeklyVolume?.[6] || 0;
      const volume24h = row.original.weeklyVolume?.[5] || 1;
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm leading-5">${dailyVolume}</div>
          <div
            className={cn(
              "text-[10px] leading-[10px]",
              volume > volume24h
                ? "text-success-foreground"
                : volume < volume24h
                ? "text-destructive-foreground"
                : " text-foreground",
            )}
          >
            {volume > volume24h && "+"}
            {(((volume - volume24h) / volume24h) * 100).toFixed(2)}%
          </div>
        </div>
      );
    },

    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "bgtApy",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT Rewards"
        tooltip="Incentives distributed to users for providing liquidity to the pool."
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-sm text-success-foreground">
          {row.original.bgtApy?.toFixed(2)}%
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.bgtApy ?? 0;
      const b = rowB.original.bgtApy ?? 0;
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "totalApy",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PRR"
        tooltip={
          <>
            PRR (Projected Reward Rate) is calculated based on the fees and
            rewards <br />
            generated by the pool over the last 24 hours. The PRR displayed is{" "}
            <br />
            algorithmic and subject to change
          </>
        }
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-sm">
          {row.original.totalApy?.toFixed(2)}%
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.totalApy ?? 0;
      const b = rowB.original.totalApy ?? 0;
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "btns",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <Link
        href={`/pool/${row.original.pool}/add-liquidity`}
        onClick={(e) => e.stopPropagation()}
      >
        <Button variant={"outline"} className="flex items-center gap-1">
          <Icons.add className="h-5 w-5" /> Add
        </Button>
      </Link>
    ),
    enableSorting: false,
  },
];

export const PositionSize = (pool: any) => {
  // console.log(pool);
  const { userTotalValue, isPositionSizeLoading } = usePositionSize({
    pool: pool.pool,
  });
  // console.log({
  //   userTotalValue,
  //   isPositionSizeLoading,
  // });
  return (
    <div className="text-sm font-medium">
      {isPositionSizeLoading ? (
        <Skeleton className="h-[32px] w-[140px]" />
      ) : (
        formatUsd(userTotalValue ?? 0)
      )}
    </div>
  );
};
export const my_columns: ColumnDef<any>[] = [
  {
    accessorKey: "poolName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        className="flex items-center gap-1"
        tooltip={
          <>
            Specific combination and ratio of assets in a liquidity pool, <br />
            influencing how users trade and liquidity providers earn fees
          </>
        }
        title={"Pool Composition"}
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col items-start gap-2">
        <span className="w-[180px] truncate text-left">
          {row.original.poolName}
        </span>
        <TokenIconList
          tokenList={row.original.tokens.map((t: any) => t.address)}
          size="lg"
        />
        <Badge
          variant={"secondary"}
          className="border-none px-2 py-1 text-[10px] leading-[10px] text-foreground"
        >
          {Number(row.original.formattedSwapFee).toFixed(2)}%
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalValue",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        tooltip="Total amount of user deposited assets"
        title="Position Size"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return <PositionSize pool={row.original as Pool} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: "fees",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fees Collected"
        tooltip="Your share of transaction fees the position has collected."
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      const fees = formatter.format(row.original.fees || 0);
      return <div className="flex items-center">${fees}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "totalApy",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="PRR"
        tooltip={
          <>
            PRR (Projected Reward Rate) is calculated based on the fees and
            rewards <br />
            generated by the pool over the last 24 hours. The PRR displayed is{" "}
            <br />
            algorithmic and subject to change
          </>
        }
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center text-sm">
          {row.original.totalApy?.toFixed(2)}%
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.totalApy ?? 0;
      const b = rowB.original.totalApy ?? 0;
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "bgtApy",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT Rewards"
        tooltip="Incentives distributed to users for providing liquidity to the pool."
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant={"warning"}
          className="border-none px-2 py-1 font-normal"
        >
          {formatter.format(Number(row.original.bgtRewards ?? "0"))} BGT
        </Badge>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.bgtApy ?? 0;
      const b = rowB.original.bgtApy ?? 0;
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "btns",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <div className="flex gap-1 ">
        <Link
          href={`/pool/${row.original.pool}/add-liquidity`}
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant={"outline"} className="flex gap-1">
            <Icons.add className="h-6 w-6" />
          </Button>
        </Link>
        <Link
          href={`/pool/${row.original.pool}/withdraw`}
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant={"outline"} className="flex gap-1">
            <Icons.subtract className="h-6 w-6" />
          </Button>
        </Link>
        {/* <Link href={`/pool/${row.original.pool}`}>
          <Button className="flex gap-1">Details</Button>
        </Link> */}
      </div>
    ),
    enableSorting: false,
  },
];
