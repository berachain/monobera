import React, { PropsWithChildren, useState } from "react";
import { cn } from "@bera/ui";
import { PlainTable as TableComponent } from "@bera/ui/table";

interface ReactTable {
  className?: string;
  flexTable?: boolean;
}

export function ReactTable(props: PropsWithChildren<ReactTable>) {
  return (
    <TableComponent
      className={cn(
        props.flexTable
          ? "flex-basis-auto h-full flex-grow-1 flex-shrink-1 flex flex-col"
          : "table",
        "relative w-full items-stretch overflow-auto",
        props.className,
      )}
    >
      {props.children}
    </TableComponent>
  );
}
