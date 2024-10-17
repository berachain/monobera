import { formatUsd, truncateHash } from "@bera/berajs";
import { Identicon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { type ColumnDef } from "@tanstack/react-table";
import { LEADERBOARD_TABS } from "~/utils/constants";

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

export const getColumns = (header: string, page?: number, perPage?: number) => {
  const leaderboardColumns: ColumnDef<{
    rank: string;
    trader: string;
    value: any;
  }>[] = [
    {
      header: "Rank",
      cell: ({ row }) => {
        return (
          <div className="text-xs">
            {row.original.rank
              ? positionToEmoji(row.original.rank)
              : positionToEmoji(
                  (
                    row.index +
                    1 +
                    ((page ?? 1) - 1) * (perPage ?? 10)
                  ).toString(),
                )}
          </div>
        );
      },
      accessorKey: "rank",
      enableSorting: false,
      minSize: 80,
      size: 80,
    },
    {
      header: "Trader",
      cell: ({ row }) => (
        <div className="flex w-full flex-row items-center gap-1 text-xs">
          <Identicon account={row.original.trader} />
          <span className="sm:hidden">{truncateHash(row.original.trader)}</span>
          <span className="hidden sm:block">{row.original.trader}</span>
        </div>
      ),
      accessorKey: "trader",
      enableSorting: false,
    },
    {
      header: header,
      cell: ({ row }) => {
        if (header === LEADERBOARD_TABS[0].header) {
          return (
            <p
              className={cn(
                "text-right",
                Number(row.original.value) > 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
            >
              {formatUsd(row.original.value)}
            </p>
          );
        }
        return <p className="w-full">{formatUsd(row.original.value)}</p>;
      },
      accessorKey: "value",
      enableSorting: false,
      minSize: 200,
      size: 200,
    },
  ];

  return leaderboardColumns;
};
