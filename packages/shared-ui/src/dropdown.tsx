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
  className,
  ...props
}: {
  selected: string;
  selectionList: string[];
  onSelect: (selected: string) => void;
  className?: string;
}) => {
  return (
    <div {...props} className={cn("w-fit", className)}>
      <div className="flex items-center text-muted-foreground md:gap-1">
        <div className="hidden text-sm font-medium md:block">Sort by</div> 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex w-fit items-center gap-1 rounded-xl border border-border px-3 py-2 text-sm">
              {selected.replaceAll("-", " ")}
              <Icons.chevronDown className=" h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
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
