import React, { PropsWithChildren } from "react";
import { cn } from "@bera/ui";

type TableHeaderGroupProps = PropsWithChildren<{
  className?: string;
  flexTable?: boolean;
}>;

export const TableHeaderGroup: React.FC<TableHeaderGroupProps> = (props) => (
  <tr
    className={cn(
      props.flexTable
        ? "inline-flex flex-1 flex-auto flex-shrink-0"
        : "table-row",
      "w-full",
      props.className,
    )}
  >
    {props.children}
  </tr>
);
