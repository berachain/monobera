import React from "react";
import { cn } from "@bera/ui";
import { Card } from "@bera/ui/card";
import { useSortBy, useTable } from "react-table";

type Column = {
  header: React.ReactNode;
  accessor: string; // accessor is the "key" in the data
};

export type Columns = Column[];

interface RTProps {
  className?: string;
  columns: Columns;
  data: any[];
  emptyMessage?: string;
  rowOnClick?: (row: any) => void;
}
export default function RT({
  columns,
  data,
  rowOnClick,
  emptyMessage = "No data found.",
  className,
}: RTProps) {
  // allows for multi-column sorting
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns ?? [], data: data ?? [] }, useSortBy);

  return (
    <Card className="w-full overflow-x-scroll">
      <table {...getTableProps()} className={cn("w-full", className)}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={"headerGroup" + headerGroup.id}
              className="flex w-full justify-between rounded-tl-[18px] rounded-tr-[18px] border border-l-0 border-r-0 border-t-0 border-b-border bg-muted px-8 py-3"
            >
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  key={"headerGroup column" + column.id}
                  className="text-xs font-medium leading-tight text-muted-foreground"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows?.map((row: any, index: number) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={"tableGroup rows" + row.id}
                className={`flex w-full justify-between border border-l-0 border-r-0 border-t-0 bg-background px-8 py-4 hover:cursor-pointer hover:bg-muted border-b-border${
                  index === rows.length - 1
                    ? "rounded rounded-md border-0 "
                    : ""
                }`}
                onClick={() => rowOnClick && rowOnClick(row)}
              >
                {row.cells.map((cell: any, index: number) => (
                  <td
                    {...cell.getCellProps()}
                    key={"tableGroup" + index}
                    className="flex items-center text-xs font-medium leading-tight text-foreground"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <p className="my-4 w-full self-center text-center text-lg font-semibold text-muted-foreground">
              {emptyMessage}
            </p>
          )}
        </tbody>
      </table>
    </Card>
  );
}
