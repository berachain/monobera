import { type ColumnDef } from "@tanstack/react-table";

export const validatorEventColumns: ColumnDef<any>[] = [
  {
    header: "Event Type",
    accessorKey: "eventType",
    enableSorting: false,
  },
  {
    header: "Timestamp",
    accessorKey: "timestamp",
    enableSorting: false,
  },
  {
    header: "Info",
    accessorKey: "info",
    enableSorting: false,
  },
];
