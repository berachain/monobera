"use client";

import { RewardPool } from "@bera/berajs";
import { Checkbox } from "@bera/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<RewardPool>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Pools",
  },
  {
    accessorKey: "deposited",
    header: "Deposited",
  },
  {
    accessorKey: "claimable",
    header: "Claimable (BGT)",
  },
];
