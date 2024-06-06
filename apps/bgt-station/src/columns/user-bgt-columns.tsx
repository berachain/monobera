import React from "react";
import {
  ActionButton,
  DataTableColumnHeader,
  FormattedNumber,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { Icons } from "@bera/ui/icons";
import { GaugeHeaderWidget } from "~/components/gauge-header-widget";
import {
  BERA_VAULT_REWARDS_ABI,
  IContractWrite,
  useBeraJs,
} from "@bera/berajs";

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
          title="BGT Rewards"
          className="items-center text-center"
        />
      ),
      cell: ({ row }) => (
        <div className="py-1 px-2 flex gap-1 rounded-full text-success-foreground bg-success-foreground bg-opacity-10 w-fit text-sm font-medium items-center">
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
            disabled={isLoading || row.original.unclaimedBgt === ""}
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
    },
  ];
  return user_bgt_columns;
};
