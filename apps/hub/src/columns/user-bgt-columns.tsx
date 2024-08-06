import React from "react";
import {
  BERA_VAULT_REWARDS_ABI,
  type IContractWrite,
  useBeraJs,
} from "@bera/berajs";
import { DataTableColumnHeader, FormattedNumber } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import { GaugeHeaderWidget } from "~/components/gauge-header-widget";

export const getUserBgtColumns = ({
  isLoading,
  write,
}: {
  isLoading: boolean;
  write: (props: IContractWrite) => void;
}) => {
  const user_bgt_columns: ColumnDef<any>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Gauge" />
      ),
      cell: ({ row }) => (
        <GaugeHeaderWidget
          address={row.original.vaultAddress}
          className="w-[200px]"
        />
      ),
      accessorKey: "gauge",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Amount Deposited"
          className="items-center whitespace-nowrap text-center"
        />
      ),
      cell: ({ row }) => (
        <>
          <FormattedNumber
            value={row.original.balance}
            compact
            showIsSmallerThanMin
            className="text-md font-medium"
          />
          <span className="ml-1 text-xs text-muted-foreground">
            {row.original.name}
          </span>
        </>
      ),
      accessorKey: "amountDeposited",
      enableSorting: true,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="BGT Rewards"
          className="items-center whitespace-nowrap text-center"
        />
      ),
      cell: ({ row }) => (
        <div className="flex w-fit items-center gap-1 rounded-full bg-success bg-opacity-10 px-2 py-1 text-sm font-medium text-success-foreground">
          <Icons.bgt className="h-6 w-6" />
          <FormattedNumber
            value={row.original.unclaimedBgt}
            showIsSmallerThanMin
          />
        </div>
      ),
      accessorKey: "unclaimedBgt",
      enableSorting: true,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Incentives"
          className="w-20 items-center text-center"
        />
      ),
      cell: ({ row }) => {
        const { account } = useBeraJs();
        return (
          <Button
            size="sm"
            className="leading-5"
            variant="ghost"
            disabled={isLoading || row.original.unclaimedBgt === "0"}
            onClick={(e: any) => {
              e.stopPropagation();
              write({
                address: row.original.vaultAddress,
                abi: BERA_VAULT_REWARDS_ABI,
                functionName: "getReward",
                params: [account],
              });
            }}
          >
            Claim BGT
          </Button>
        );
      },
      accessorKey: "inflation",
      enableSorting: false,
    },
  ];
  return user_bgt_columns;
};
