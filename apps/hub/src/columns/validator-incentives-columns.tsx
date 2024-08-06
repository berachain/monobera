import { FormattedNumber } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

export const validatorIncentivesColumns: ColumnDef<any>[] = [
  {
    header: "Token",
    accessorKey: "symbol",
    cell: ({ row }) => {
      return (
        <div className="flex w-48 gap-1 items-center">
          {row.original.symbol === "BGT" ? (
            <Icons.bgt className="h-4 w-4 " />
          ) : row.original.symbol === "HONEY" ? (
            <Icons.honey className="h-4 w-4" />
          ) : (
            <Icons.bera className="h-4 w-4" />
          )}
          <p className="">{`${row.original.symbol}`}</p>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    header: "Earned",
    accessorKey: "earned",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <FormattedNumber
            value={row.original.earned}
            className="text-semibold flex"
          />
          <div className="flex text-muted-foreground">
            {"("}
            <FormattedNumber
              value={row.original.value}
              symbol="USD"
              className="text-semibold flex"
            />
            {")"}
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
];
