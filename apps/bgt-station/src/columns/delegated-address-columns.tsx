import { type ColumnDef } from "@tanstack/react-table";

export const delegatedAddressColumns: ColumnDef<any>[] = [
  {
    header: "Address",
    accessorKey: "address",
    enableSorting: false,
  },
  {
    header: "Boost (BGT)",
    accessorKey: "bgt",
    enableSorting: false,
  },
];
