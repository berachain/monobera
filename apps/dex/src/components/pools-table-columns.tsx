"use client";

import Link from "next/link";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIconList,
  apyTooltipText,
} from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import {
  getPoolAddLiquidityUrl,
  getPoolWithdrawUrl,
  type PoolV2,
} from "~/app/pools/fetchPools";
import {
  usePollUserDeposited,
  type IUserPool,
} from "~/hooks/usePollUserDeposited";

const PoolSummary = ({ pool }: { pool: PoolV2 }) => {
  const { useIsPoolDeposited } = usePollUserDeposited();
  const isDeposited = useIsPoolDeposited(pool);
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="w-[180px] truncate text-left">{pool?.poolName}</span>
      <TokenIconList tokenList={pool?.tokens} size="lg" />
      <div className="flex flex-row items-center gap-1">
        <Badge
          variant={"secondary"}
          className="border-none px-2 py-1 text-[10px] leading-[10px] text-foreground"
        >
          {Number(pool?.feeRate).toFixed(2)}%
        </Badge>
        {isDeposited && (
          <Badge
            variant="success"
            className="border-none bg-success px-2 py-1 text-[10px] leading-[10px] "
          >
            Provided Liquidity
          </Badge>
        )}
      </div>
    </div>
  );
};

export const columns: ColumnDef<PoolV2>[] = [
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
    cell: ({ row }) => <PoolSummary pool={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tvl",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        tooltip="Total amount of assets currently locked, in the Pool"
        title="TVL"
        className="min-w-[80px]"
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="text-sm leading-5">
          <FormattedNumber value={row.original?.tvlUsd ?? 0} symbol="USD" />
        </div>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "fees",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fees (24H)"
        tooltip="Total transaction fees this pool has generated in the last 24 hours"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="text-sm leading-5">
          <FormattedNumber value={row.original?.fees24h ?? 0} symbol="USD" />
        </div>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "volume",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Volume (24H)"
        tooltip="Total trading or transaction volume in the last 24 hours"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="text-sm leading-5">
          <FormattedNumber value={row.original?.volume24h ?? 0} symbol="USD" />
        </div>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "bgtApy",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="BGT Rewards"
        tooltip="Incentives distributed to users for providing liquidity to the pool."
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center text-sm text-warning-foreground">
        <FormattedNumber value={row.original.bgtApy ?? 0} percent />
      </div>
    ),
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.bgtApy ?? 0;
      const b = rowB.original.bgtApy ?? 0;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "totalApy",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="APY"
        tooltip={apyTooltipText()}
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center text-sm">
          <FormattedNumber value={row.original.totalApy ?? 0} percent colored />
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.totalApy ?? 0;
      const b = rowB.original.totalApy ?? 0;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
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
        href={getPoolAddLiquidityUrl(row.original)}
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

export const my_columns: ColumnDef<IUserPool>[] = [
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
          {row.original?.poolName}
        </span>
        <TokenIconList tokenList={row.original?.tokens} size="lg" />
        <Badge
          variant={"secondary"}
          className="border-none px-2 py-1 text-[10px] leading-[10px] text-foreground"
        >
          {Number(row.original?.feeRate).toFixed(2)}%
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userPosition.estimatedHoneyValue",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="My Balance"
        className="whitespace-nowrap"
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center text-sm">
        <FormattedNumber
          value={row.original?.userPosition?.estimatedHoneyValue ?? 0}
          symbol="USD"
        />
      </div>
    ),
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
    cell: ({ row }) => (
      <Badge variant={"warning"} className="border-none px-2 py-1 font-normal">
        <FormattedNumber value={"0"} symbol="BGT" />
      </Badge>
    ),

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
      <div className="w-100 flex flex-row items-center justify-center gap-1">
        <Link
          href={getPoolAddLiquidityUrl(row.original)}
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant={"outline"} className="flex gap-1">
            <Icons.add className="h-6 w-6" />
          </Button>
        </Link>
        <Link
          href={getPoolWithdrawUrl(row.original)}
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant={"outline"} className="flex gap-1">
            <Icons.subtract className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    ),
    enableSorting: false,
  },
];
