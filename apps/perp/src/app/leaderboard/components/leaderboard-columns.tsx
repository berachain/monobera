import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import Identicon from "@bera/shared-ui/src/identicon";
import { cn } from "@bera/ui";
import { type ColumnDef } from "@tanstack/react-table";

const tableTitle: Record<string, string> = {
  "1": "Realized Profit & Loss",
  "2": "Liquidations",
  "3": "Volume",
};

function truncateAddress(address: string, length = 4) {
  if (address.length <= length * 2) {
    return address;
  }
  return `${address.substring(0, length)}...${address.substring(
    address.length - length,
  )}`;
}

const positionToEmoji = (rank: string) => {
  switch (rank) {
    case "1":
      return "🥇";
    case "2":
      return "🥈";
    case "3":
      return "🥉";
    default:
      return rank;
  }
};

export const getColumns = (type: string, mobile: boolean) => {
  const leaderboard_columns: ColumnDef<{
    rank: string;
    trader: string;
    value: any;
  }>[] = [
    {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Rank" />
      ),
      cell: ({ row }) => {
        return (
          <div className="text-xs">
            {row.original.rank
              ? positionToEmoji(row.original.rank)
              : positionToEmoji((row.index + 1).toString())}
          </div>
        );
      },
      accessorKey: "rank",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Trader"
          className="w-full"
        />
      ),
      cell: ({ row }) => (
        <div className="flex w-full flex-row items-center gap-1 text-xs">
          <Identicon account={row.original.trader} />
          {mobile ? truncateAddress(row.original.trader) : row.original.trader}
        </div>
      ),
      accessorKey: "trader",
      enableSorting: false,
    },
    {
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={tableTitle[type ?? ""] as string}
          className="w-full text-right"
        />
      ),
      cell: ({ row }) => {
        if (type === "pnl") {
          return (
            <p
              className={cn(
                "w-full text-right",
                Number(row.original.value) > 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
            >
              {formatUsd(row.original.value)}
            </p>
          );
        }
        return (
          <p className="w-full text-right">{formatUsd(row.original.value)}</p>
        );
      },
      accessorKey: "value",
      enableSorting: false,
    },
  ];

  return leaderboard_columns;
};
