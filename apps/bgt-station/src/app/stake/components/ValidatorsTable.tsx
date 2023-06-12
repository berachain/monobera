"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePollRawValidators, type Validator } from "@bera/berajs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@bera/ui/table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";


interface ValidatorsTableProps {
  columns: ColumnDef<Validator>[];
}

export default function ValidatorsTable({ columns }: ValidatorsTableProps) {
  const { useValidators } = usePollRawValidators();
  const validators: Validator[] = useValidators();
  console.log(validators);
  const table = useReactTable({
    data: validators,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { useActiveValidators } = usePollRawValidators();
  const validators = useActiveValidators();
  console.log(validators);
  const router = useRouter();
  return (
    <div className="p-5">
      <Table className="border-separate border-spacing-y-2 p-1">
        <TableHeader>
          {table?.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* <TableBody>
          {table?.getRowModel().rows?.length ? (
            table?.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer "
                data-state={row.getIsSelected() && "selected"}
                onClick={() => router.push(`/stake/${row.original.address}`)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody> */}
      </Table>
    </div>
  );
}
