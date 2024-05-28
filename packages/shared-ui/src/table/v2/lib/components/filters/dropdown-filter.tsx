"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@bera/ui/dropdown-menu";
import { HeaderContext } from "@tanstack/react-table";

export interface Item {
  label: string;
  value: string;
}

export interface DropdownProps {
  items: Item[];
  className?: string;
}

export interface DropdownFilterProps<TData, TValue>
  extends HeaderContext<TData, TValue>,
    DropdownProps {}

export function DropdownFilter<TData, TValue>({
  column,
  className,
  items,
}: DropdownFilterProps<TData, TValue>) {
  const filterValue = column.getFilterValue() as string | undefined;

  const [selectedItem, setSelectedItem] = useState<string>(filterValue ?? "");

  useEffect(() => {
    setSelectedItem(filterValue ?? "");
  }, [filterValue]);

  const handleValueChange = useCallback(
    (value: string) => {
      column.setFilterValue(value);
    },
    [column],
  );

  return (
    <DropdownMenuRadioGroup
      value={selectedItem}
      className={className}
      onValueChange={handleValueChange}
    >
      {items.map((item: Item) => (
        <DropdownMenuRadioItem
          className="relative flex select-none hover:cursor-pointer hover:bg-secondary data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          value={item.value}
          key={item.value}
        >
          <span
            style={{
              minWidth: "60px",
              maxWidth: "120px",
              textOverflow: "ellipsis",
            }}
            key={item.value}
            className="overflow-hidden"
          >
            {item.label}
          </span>
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );
}

export default DropdownFilter;
