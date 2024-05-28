import React, { PropsWithChildren } from "react";
import { cn } from "@bera/ui";
import { TableCaption as TableCaptionComponent } from "@bera/ui/table";

type TableCaptionProps = PropsWithChildren<{
  className?: string;
  title?: string;
  style?: React.CSSProperties;
  flexTable?: boolean;
}>;

export const TableCaption: React.FC<TableCaptionProps> = (props) => (
  <TableCaptionComponent
    style={props.style}
    className={cn(
      props.flexTable ? "flex" : "table-caption",
      "w-full text-lg sm:text-2xl",
      props.className,
    )}
  >
    {props.title}
  </TableCaptionComponent>
);
