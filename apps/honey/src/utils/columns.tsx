import React from "react";
import { truncateHash } from "@bera/berajs";
import { honeyTokenAddress } from "@bera/config";
import {
  DataTableColumnHeader,
  FormattedNumber,
  TokenIcon,
} from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { formatUnits } from "viem";

export const transaction_history_columns: ColumnDef<any>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Action" />
    ),
    cell: ({ row }) =>
      row.original.__typename === "HoneyMint" ? "Mint" : "Redeem",
    accessorKey: "action",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Value" />
    ),
    cell: ({ row }) => {
      const amount =
        row.original.__typename === "HoneyMint"
          ? row.original.mintAmount
          : row.original.collateralAmount;
      return (
        <FormattedNumber value={formatUnits(BigInt(amount), 18)} symbol="USD" />
      );
    },
    accessorKey: "value",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tokens" />
    ),
    cell: ({ row }) => {
      const mint = row.original.__typename === "HoneyMint";
      if (mint) {
        return (
          <div className="space-evenly flex flex-row items-center">
            <div className="flex items-center">
              <TokenIcon address={row.original.collateralCoin.address} />
              <p className="ml-2">
                {Number(
                  formatUnits(
                    BigInt(row.original.collateralAmount),
                    row.original.collateralCoin.decimals ?? 18,
                  ),
                ).toFixed(4)}
              </p>
            </div>
            <Icons.chevronRight className="mx-2" />
            <div className="flex items-center">
              <TokenIcon address={honeyTokenAddress} />
              <p className="ml-2">
                {Number(
                  formatUnits(BigInt(row.original.mintAmount), 18),
                ).toFixed(4)}
              </p>
            </div>
          </div>
        );
      }

      return "";
    },
    accessorKey: "tokens",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TxnHash" />
    ),
    cell: ({ row }) => truncateHash(row.original.id.split(":")[2] ?? ""),
    accessorKey: "id",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) =>
      formatDistance(
        new Date(Number(row.original.timestamp) * 1000 ?? 0),
        new Date(),
      ),
    accessorKey: "timestamp",
    enableSorting: false,
  },
];
