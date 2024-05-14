import React from "react";
import {
  DataTableColumnHeader,
  FormattedNumber,
  IconList,
  TokenIcon,
  Tooltip,
} from "@bera/shared-ui";
import { type ColumnDef } from "@tanstack/react-table";
import { AggregatedBribe } from "~/hooks/useAggregatedBribes";
import { type Vault } from "@bera/berajs";

// const SourceVaultsTooltip = ({
//   vaults,
// }: {
//   vaults: Vault[];
// }) => {
//   return (
//     <div className="flex flex-col items-start gap-1">
//       {vaults.map((vault) => (
//         <div className="flex flex-row gap-1 text-muted-foreground text-md">
//           {vault.name}
//         </div>
//       ))}
//     </div>
//   );
// };

// export const SourceVaultsPopover =({
//   vaults,
// }: {
//   vaults: Vault[];
// }) => {

//   return (
//     <Tooltip
//       toolTipTrigger={
//         <div className="rounded-lg border rounded-lg hover:bg-muted p-1 w-fit">
//           <IconList iconList={[]} showCount={3} />
//         </div>
//       }
//       children={<SourceVaultsTooltip vaults={vaults ?? []} />}
//     />
//   );
// };

export const validatorIncentivesColumns: ColumnDef<AggregatedBribe>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      const token = row.original.token;
      return (
        <div className="flex flex-row items-center gap-1">
          <TokenIcon address={token.address} />
          {token.symbol}{" "}
        </div>
      );
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validator" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-row gap-1 text-muted-foreground text-md">
            <FormattedNumber
              value={row.original.bribeTotalAmountLeft}
              symbol={row.original.token.symbol}
            />
          </div>
        </div>
      );
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sources" />
    ),
    cell: ({ row }) => {
      const token = row.original.token;
      return (
        <div className="flex flex-row items-center gap-1">
          TODO: LIST VAULTS HERE
        </div>
      );
    },
    accessorKey: "token.symbol",
    enableSorting: true,
  },
];
