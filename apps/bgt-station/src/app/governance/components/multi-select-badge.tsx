import React from "react";
import { cn } from "@bera/ui";

import { VoteColorMap } from "../types";

type IMultiSelectBadge = {
  onSelect?: (value: string[]) => void;
  className?: string;
};

export function MultiSelectBadge({ onSelect, className }: IMultiSelectBadge) {
  const sharedCN =
    "flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 capitalize hover:cursor-pointer text-xs font-medium leading-tight hover:shadow";
  const [selected, setSelected] = React.useState([]);

  const updateSelected = (value: string) => {
    const index = selected.findIndex((v) => v === value);
    if (index !== -1) {
      const newSelected = [...selected];
      newSelected.splice(index, 1);
      setSelected(newSelected);
    } else {
      setSelected([...selected, value]);
    }
  };

  React.useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <div className={cn("flex gap-2", className)}>
      <div
        className={sharedCN}
        style={
          selected.includes("yes")
            ? {
                backgroundColor: VoteColorMap.yes_secondary,
                color: VoteColorMap.yes,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected("yes")}
      >
        Yes
      </div>
      <div
        className={sharedCN}
        style={
          selected.includes("no")
            ? {
                backgroundColor: VoteColorMap.no_secondary,
                color: VoteColorMap.no,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected("no")}
      >
        No
      </div>
      <div
        className={sharedCN}
        style={
          selected.includes("veto")
            ? {
                backgroundColor: VoteColorMap.veto_secondary,
                color: VoteColorMap.veto,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected("veto")}
      >
        No with veto
      </div>
      <div
        className={sharedCN}
        style={
          selected.includes("abstain")
            ? {
                backgroundColor: VoteColorMap.abstain_secondary,
                color: VoteColorMap.abstain,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected("abstain")}
      >
        Abstain
      </div>
    </div>
  );
}
