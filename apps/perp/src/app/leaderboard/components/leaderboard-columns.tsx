import { formatUsd } from "@bera/berajs";
import { DataTableColumnHeader } from "@bera/shared-ui";
import Identicon from "@bera/shared-ui/src/identicon";
import { cn } from "@bera/ui";
import { type ColumnDef } from "@tanstack/react-table";

const tableTitle: Record<string, string> = {
  ["pnl"]: "Profit & Loss",
  ["liquidation"]: "Liquidations",
  ["volume"]: "Volume",
};

export const getColumns = (type: string) => {
  const leaderboard_columns: ColumnDef<{
    trader: string;
    value: any;
  }>[] = [
    // {
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Rank" />
    //   ),
    //   cell: ({}) => (
    //     <div className="w-[70px] text-xs">{new Date().toLocaleDateString()}</div>
    //   ),
    //   accessorKey: "market",
    //   enableSorting: false,
    // },
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
          {row.original.trader}
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
