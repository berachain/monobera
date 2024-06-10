import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type Column } from "@tanstack/react-table";

import { Tooltip } from "../../tooltip";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: any;
  tooltip?: any;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  tooltip,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div className={cn("w-full font-medium", className)}>
        {title}
        {tooltip && <Tooltip text={tooltip} className="ml-1" />}
      </div>
    );
  }

  return (
    <div className={cn("flex w-full items-center space-x-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-sm hover:bg-hover data-[state=open]:bg-hover"
        onClick={() => {
          if (column.getIsSorted() === "desc") {
            column.toggleSorting(false);
          } else if (column.getIsSorted() === "asc") {
            column.clearSorting();
          } else {
            column.toggleSorting(true);
          }
        }}
      >
        <span>
          {title}
          {tooltip && <Tooltip text={tooltip} className="ml-1" />}
        </span>
        {column.getIsSorted() === "desc" ? (
          <Icons.sortDesc className="ml-2 h-4 w-4 text-accent" />
        ) : column.getIsSorted() === "asc" ? (
          <Icons.sortAsc className="ml-2 h-4 w-4 text-accent" />
        ) : (
          <Icons.arrowDownUp className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
