import React from "react";
import { cn } from "@bera/ui";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";

export const Dropdown = ({
  selected,
  selectionList,
  onSelect,
  sortby = true,
  className,
  triggerClassName,
  contentClassname,
  ...props
}: {
  selected: string;
  selectionList: string[];
  onSelect: (selected: string) => void;
  sortby?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassname?: string;
}) => {
  return (
    <div {...props} className={cn("w-fit flex-shrink-0", className)}>
      <div className="flex items-center text-muted-foreground md:gap-1">
        {sortby && <div className="mr-2 text-sm font-medium">Sort by</div>}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                "flex w-fit items-center gap-1 rounded-md border border-border bg-background px-3 py-2 text-sm",
                triggerClassName,
              )}
            >
              {selected.replaceAll("-", " ")}
              <Icons.chevronDown className=" h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn(contentClassname)} align="start">
            {selectionList.map((selection) => (
              <DropdownMenuCheckboxItem
                key={selection}
                checked={selection === selected}
                onClick={() => onSelect(selection)}
                className="capitalize"
              >
                {selection.replaceAll("-", " ")}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
