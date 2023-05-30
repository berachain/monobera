"use client";

import { Checkbox } from "@bera/ui/checkbox";
import { Icons } from "@bera/ui/icons";
import { type ColumnDef } from "@tanstack/react-table";

import { type Reward } from "~/utils/constants";

export const columns: ColumnDef<Reward>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) =>
      row.getCanExpand() && (
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
    accessorKey: "pool",
    header: "Pools",
  },
  {
    accessorKey: "deposited",
    header: "Deposited",
  },
  {
    accessorKey: "claimable",
    header: "Claimable",
  },
  {
    id: "actions",
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <div className="text-right">
          <button
            {...{
              onClick: row.getToggleExpandedHandler(),
              style: { cursor: "pointer" },
            }}
          >
            {row.getIsExpanded() ? <Icons.chevronUp /> : <Icons.chevronDown />}
          </button>
        </div>
      ) : null,
  },
];
