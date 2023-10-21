import Image from "next/image";
import { type HoneyWithdrawalRequest } from "@bera/proto/src";
import { DataTableColumnHeader } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

export const withdraw_queue_columns: ColumnDef<HoneyWithdrawalRequest>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
        {row.original.shares}{" "}
        <Image
          src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
          alt="Honey"
          width={20}
          height={20}
        />
      </div>
    ),
    accessorKey: "amount",
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Epoch" />
    ),
    cell: ({ row }) => {
      <div>{row.original.epochCreated}</div>;
    },
    accessorKey: "open_epoch",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unlock Epoch" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[88px] flex-col gap-1">
          {row.original.unlockEpoch}
        </div>
      );
    },
    accessorKey: "unlock_epocj",
    enableSorting: true,
  },
  {
    header: () => <></>,
    cell: () => {
      return (
        <div className="flex w-[88px] flex-col gap-1">
          <button>cancel</button>
        </div>
      );
    },
    accessorKey: "cancel",
    enableSorting: false,
  },
];
