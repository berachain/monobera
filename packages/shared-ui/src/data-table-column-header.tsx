import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { type Column } from "@tanstack/react-table";

import { Tooltip } from "./tooltip";

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
      <div className={cn("font-bold", className)}>
        {title}
        {tooltip && <Tooltip text={tooltip} />}
      </div>
    );
  }

  return (
    <div className={cn("flex w-full items-center space-x-2", className)}>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild> */}
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-sm hover:bg-hover data-[state=open]:bg-hover"
        onClick={() => {
          if (column.getIsSorted() === "desc") {
            column.toggleSorting(false);
          } else if (column.getIsSorted() === "asc") {
            column.toggleSorting(true);
          } else {
            column.toggleSorting(true);
          }
        }}
      >
        <span>
          {title}
          {tooltip && <Tooltip text={tooltip} />}
        </span>
        {column.getIsSorted() === "desc" ? (
          <Icons.sortDesc className="ml-2 h-4 w-4 text-accent" />
        ) : column.getIsSorted() === "asc" ? (
          <Icons.sortAsc className="ml-2 h-4 w-4 text-accent" />
        ) : (
          <Icons.arrowDownUp className="ml-2 h-4 w-4" />
        )}
      </Button>
      {/* </DropdownMenuTrigger>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 text-sm hover:bg-hover data-[state=open]:bg-hover"
          >
            <span className="flex items-center gap-1 font-bold">
              {title}
              {tooltip && <Tooltip text={tooltip} />}
            </span>
            {column.getIsSorted() === "desc" ? (
              <Icons.sortDesc className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === "asc" ? (
              <Icons.sortAsc className="ml-2 h-4 w-4" />
            ) : (
              <Icons.arrowDownUp className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icons.sortAsc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icons.sortDesc className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
