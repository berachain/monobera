import { FormattedNumber, TokenIcon } from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";

export const validatorIncentivesColumns: ColumnDef<any>[] = [
  {
    header: "Token",
    accessorKey: "symbol",
    cell: ({ row }) => {
      return (
        <div className="flex w-48 items-center gap-1">
          <TokenIcon
            symbol={row.original.token.symbol}
            address={row.original.token.address}
            className="mr-2 h-6 w-6"
            key={row.original.token.address}
          />
          <p className="">{`${row.original.token.symbol}`}</p>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    header: "Earned",
    accessorKey: "totalUsdValueTokenRewarded",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <FormattedNumber
            value={row.original.totalTokenRewarded}
            className="text-semibold flex"
          />
          <div className="flex text-muted-foreground">
            {"("}
            <FormattedNumber
              value={row.original.totalUsdValueTokenRewarded}
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
