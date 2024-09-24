"use client";

import Link from "next/link";
import {
  type IUserPool,
  type PoolV2,
  useSubgraphTokenInformation,
  TransactionActionType,
  ADDRESS_ZERO,
  BERA_VAULT_REWARDS_ABI,
  useBeraJs,
} from "@bera/berajs";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIconList,
  apyTooltipText,
  useTxn,
} from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import { getPoolAddLiquidityUrl } from "~/app/pools/fetchPools";
import { beraTokenAddress, bgtUrl } from "@bera/config";
import { Address } from "viem";

const PoolSummary = ({ pool }: { pool: PoolV2 }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="w-[180px] truncate text-left">{pool?.poolName}</span>
      <TokenIconList tokenList={pool?.tokens} size="lg" />
      <div className="flex flex-row items-center gap-1">
        <Badge
          variant={"secondary"}
          className="border-none px-2 py-1 text-[10px] leading-[10px] text-foreground"
        >
          <span>{Number(pool?.feeRate).toFixed(2)}%</span>
        </Badge>
        {pool.isDeposited && (
          <Badge
            variant="success"
            className="border-none bg-success px-2 py-1 text-[10px] leading-[10px] "
          >
            <span>Provided Liquidity</span>
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
        tooltip={"Base and Quote assets in the liquidity pool."}
        title={"Pool Composition"}
      />
    ),
    cell: ({ row }) => <PoolSummary pool={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tvlUsd",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        tooltip="Total amount of assets currently locked in the Pool, valued in HONEY"
        title="TVL"
        className="min-w-[95px]"
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
    sortingFn: (rowA, rowB) => {
      return 0;
    },
  },
  {
    accessorKey: "latestPoolDayData__feesUsd",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Fees (24H)"
        tooltip="Total trading fees this pool has generated in the last 24 hours, valued in HONEY"
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
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "latestPoolDayData__volumeUsd",
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
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "bgtApy",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader
  //       column={column}
  //       title="BGT APY"
  //       tooltip={apyTooltipText()}
  //       className="whitespace-nowrap"
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center justify-start text-sm text-warning-foreground">
  //         <FormattedNumber
  //           value={row.original.bgtApy ?? 0}
  //           compact
  //           showIsSmallerThanMin
  //         />
  //         %
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   sortingFn: (rowA, rowB) => {
  //     return 0;
  //   },
  // },
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

export const getUserPoolColumns = (
  refresh: () => void,
): ColumnDef<IUserPool>[] => {
  return [
    {
      accessorKey: "poolName",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          className="flex items-center gap-1"
          tooltip={"Base and quote assets in the liquidity pool."}
          title={"Pool Composition"}
        />
      ),
      cell: ({ row }) => (
        <div className="flex flex-col items-start gap-2">
          <span className="w-[180px] truncate text-left">
            {row.original?.poolName}
          </span>
          <TokenIconList
            tokenList={row.original?.tokens}
            size="lg"
            key={row.original.id}
          />
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
      accessorKey: "estimatedHoneyValue",
      accessorFn: (row) => row.userPosition?.estimatedHoneyValue,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="In Wallet"
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
      accessorKey: "estimatedDepositedHoneyValue",
      accessorFn: (row) => row.userPosition?.estimatedDepositedHoneyValue,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="In Vault"
          className="whitespace-nowrap"
        />
      ),
      cell: ({ row }) => (
        <div className="flex items-center text-sm">
          {row.original.vaultAddress ? (
            <FormattedNumber
              value={
                row.original?.userPosition?.estimatedDepositedHoneyValue ?? 0
              }
              compact
              symbol="USD"
            />
          ) : (
            <p className="text-muted-foreground">no vault</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "bgtEarned",
      accessorFn: (row) => row.userPosition?.bgtEarned,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Rewards"
          className="whitespace-nowrap"
        />
      ),
      cell: ({ row }) => {
        const { data: beraToken } = useSubgraphTokenInformation({
          tokenAddress: beraTokenAddress,
        });
        return (
          <div className="flex items-center text-sm">
            {row.original.vaultAddress ? (
              row.original.userPosition?.estimatedDepositedHoneyValue !== 0 ? (
                <div className="flex flex-col gap-0">
                  <FormattedNumber
                    value={row.original?.userPosition?.bgtEarned ?? 0}
                    compact
                    symbol="BGT"
                  />
                  <FormattedNumber
                    value={
                      parseFloat(row.original?.userPosition?.bgtEarned ?? "0") *
                      parseFloat(beraToken?.usdValue ?? "0")
                    }
                    compact
                    className="text-xs text-muted-foreground"
                    symbol="USD"
                  />
                </div>
              ) : (
                <div className="w-40 flex flex-col">
                  <span className="font-medium">
                    {" "}
                    Deposit balance in vault to start earning rewards
                  </span>
                  <div className="flex flex-row items-center text-success-foreground">
                    <Icons.bgt className="w-4 h-4 mr-1" />
                    <FormattedNumber value={row.original.bgtApy ?? 0} compact />
                    % APY
                  </div>
                </div>
              )
            ) : (
              <p className="text-muted-foreground">--</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "btns",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title=""
          className="text-center"
        />
      ),
      cell: ({ row }) => {
        const { account } = useBeraJs();
        const { write } = useTxn({
          message: "Claim BGT Rewards",
          actionType: TransactionActionType.CLAIMING_REWARDS,
          onSuccess: () => {
            refresh();
          },
        });
        return (
          <div className="w-100 flex flex-row items-center justify-center gap-1">
            {row.original.vaultAddress ? (
              row.original.userPosition?.estimatedDepositedHoneyValue !== 0 ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    write({
                      address: (row.original.vaultAddress ??
                        ADDRESS_ZERO) as Address,
                      abi: BERA_VAULT_REWARDS_ABI,
                      functionName: "getReward",
                      params: [account],
                    });
                  }}
                >
                  Claim
                </Button>
              ) : (
                <Link
                  href={`${bgtUrl}/gauge/${row.original.vaultAddress}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant={"outline"} size="sm">
                    Deposit
                  </Button>
                </Link>
              )
            ) : (
              <></>
            )}
          </div>
        );
      },
      enableSorting: false,
    },
  ];
};
