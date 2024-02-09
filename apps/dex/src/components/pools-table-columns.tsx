"use client";

import Link from "next/link";
import { formatAmountSmall, formatter } from "@bera/berajs";
import {
  DataTableColumnHeader,
  TokenIconList,
  apyTooltipText,
} from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";
import {
  type PoolV2,
  getPoolAddLiquidityUrl,
  getPoolWithdrawUrl,
} from "~/app/pools/fetchPools";
import { type IUserPool } from "~/hooks/usePollUserDeposited";

export const PoolSummary = ({ pool }: { pool: PoolV2 }) => {
  // const { data: myPools = [] } = usePollUsersPools();
  // const isDeposited = myPools?.find(
  //   (myPool: any) => getAddress(myPool.pool) === getAddress(pool?.pool),
  // );

  return (
    <div className="flex flex-col items-start gap-2">
      <span className="w-[180px] truncate text-left">{pool?.poolName}</span>
      <TokenIconList
        tokenList={pool?.tokens.map((t) => t?.address)}
        size="lg"
      />
      <div className="flex flex-row items-center gap-1">
        <Badge
          variant={"secondary"}
          className="border-none px-2 py-1 text-[10px] leading-[10px] text-foreground"
        >
          {/* {Number(pool?.formattedSwapFee).toFixed(2)}% */}
          dynamic
        </Badge>
        {/* {isDeposited && (
          <Badge
            variant="success"
            className="border-none bg-success px-2 py-1 text-xs"
          >
            Provided Liquidity
          </Badge>
        )} */}
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
    cell: ({ row }) => {
      const totalValue = formatter.format(row.original?.tvlUsd || 0);
      // const tvl = row.original.weeklyTvl?.[6] || 0;
      // const tvl24h = row.original.weeklyTvl?.[5] || 1;
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm leading-5">${totalValue}</div>
          {/* <div
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
          </div> */}
        </div>
      );
    },
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
    cell: ({ row }) => {
      const dailyFees = formatter.format(row.original.dailyFees || 0);
      // const fee = row.original.weeklyFees?.[6] || 0;
      // const fee24h = row.original.weeklyFees?.[5] || 1;
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm leading-5">${dailyFees}</div>
          {/* <div
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
          </div> */}
        </div>
      );
    },
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
    cell: ({ row }) => {
      const dailyVolume = formatter.format(row.original.dailyVolume || 0);
      // const volume = row.original.weeklyVolume?.[6] || 0;
      // const volume24h = row.original.weeklyVolume?.[5] || 1;
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm leading-5">${dailyVolume}</div>
          {/* <div
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
          </div> */}
        </div>
      );
    },

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
    cell: ({ row }) => {
      const bgtApy = row.original.bgtApy ?? 0;
      return (
        <div className="flex items-center text-sm text-success-foreground">
          {bgtApy === 0 ? bgtApy : bgtApy < 0.01 ? "<0.01" : bgtApy.toFixed(2)}%
        </div>
      );
    },
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
        <div className="flex items-center text-sm">
          {row.original.totalApy?.toFixed(2)}%
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

// export const PositionSize = (pool: any) => {
//   const { userTotalValue, isPositionSizeLoading } = usePositionSize({
//     pool: pool.pool,
//   });
//   return (
//     <div className="text-sm font-medium">
//       {isPositionSizeLoading ? (
//         <Skeleton className="h-[32px] w-[140px]" />
//       ) : (
//         formatUsd(userTotalValue ?? 0)
//       )}
//     </div>
//   );
// };
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
        <TokenIconList
          tokenList={row.original?.tokens.map((t: any) => t.address)}
          size="lg"
        />
        <Badge
          variant={"secondary"}
          className="border-none px-2 py-1 text-[10px] leading-[10px] text-foreground"
        >
          {Number(0).toFixed(2)}%
        </Badge>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "totalValue",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       tooltip="Total amount of user deposited assets"
  //       title="Position Size"
  //       className="whitespace-nowrap"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return <PositionSize pool={row.original as Pool} />;
  //   },
  //   enableSorting: false,
  // },
  // {
  //   accessorKey: "fees",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="Fees Collected"
  //       tooltip="Your share of transaction fees the position has collected."
  //       className="whitespace-nowrap"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     const fees = formatter.format(row.original.fees || 0);
  //     return <div className="flex items-center">${fees}</div>;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
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
        {formatter.format(row.original.userPosition?.estimatedHoneyValue ?? 0)}{" "}
        USD
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
    cell: ({ row }) => {
      const { isSmall, numericValue: formattedBGTRewards } =
        formatAmountSmall("0");
      return (
        <Badge
          variant={"warning"}
          className="border-none px-2 py-1 font-normal"
        >
          {isSmall
            ? `< ${formattedBGTRewards} BGT`
            : `${formattedBGTRewards.toFixed(2)} BGT`}
        </Badge>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.bgtRewards ?? 0;
      const b = rowB.original.bgtRewards ?? 0;
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
        {/* <Link href={`/pool/${row.original.pool}`}>
          <Button className="flex gap-1">Details</Button>
        </Link> */}
      </div>
    ),
    enableSorting: false,
  },
];
