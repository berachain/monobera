import * as React from "react";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@bera/ui/command";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";

export function Selector({
  list,
  selected,
  setSelected,
}: {
  list: any[];
  selected: any;
  setSelected: (selected: any) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected ? selected.name : "Select"}
          <Icons.chevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search by address..." className="h-9" />
          <CommandEmpty>No Result found.</CommandEmpty>
          <CommandGroup className="overflow-y-autos max-h-[600px]">
            {list.map((item) => (
              <CommandItem
                key={item.address}
                value={item.address}
                onSelect={(currentValue) => {
                  const item = list.find(
                    (item) => item.address.toLowerCase() === currentValue,
                  );
                  setSelected(item);
                  setOpen(false);
                }}
              >
                {item.name}
                <Icons.check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selected && selected.name === item.name
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
