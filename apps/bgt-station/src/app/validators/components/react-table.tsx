import React from "react";
import { Card } from "@bera/ui/card";
import { useTable } from "react-table";

interface RTProps {
  columns: Columns;
  data: any[];
}
export default function RT({ columns, data }: RTProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Card>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={headerGroup}
              className="flex justify-between rounded-tl-[18px] rounded-tr-[18px] border border-l-0 border-r-0 border-t-0 border-b-border bg-muted px-8 py-3"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  key={column}
                  className="text-xs font-medium leading-tight text-muted-foreground"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row, index);
            console.log(row, index);
            return (
              <tr
                {...rows[0].getRowProps()}
                key={row}
                className={`flex justify-between border border-l-0 border-r-0 border-t-0 bg-background px-8 py-4 border-b-border${
                  index === rows.length - 1
                    ? "rounded-bl-[18px] rounded-br-[18px] border-0 "
                    : ""
                }`}
              >
                {rows[0].cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell}
                    className="text-xs font-medium leading-tight text-foreground"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
