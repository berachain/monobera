"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@bera/ui/input";
import { HeaderContext } from "@tanstack/react-table";
import _ from "lodash";

export interface StringFilterProps<TData, TValue>
  extends HeaderContext<TData, TValue> {}

export function StringFilter<TData, TValue>({
  column,
}: StringFilterProps<TData, TValue>) {
  const filterValue = column.getFilterValue() as string | undefined;

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(filterValue);

  useEffect(() => {
    if (!focused && filterValue !== value) {
      setValue(filterValue);
    }
  }, [focused, filterValue, value]);

  const onChange = useMemo(
    () =>
      _.debounce((filterValue) => {
        column.setFilterValue(filterValue);
      }, 200),
    [column],
  );

  return (
    <Input
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      value={value ?? ""}
      placeholder="Filter..."
      onChange={(evt: {
        target: { value: React.SetStateAction<string | undefined> };
      }) => {
        setValue(evt.target.value);
        onChange(evt.target.value);
      }}
    />
  );
}
