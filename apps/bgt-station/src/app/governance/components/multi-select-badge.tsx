import React from "react";
import { cn } from "@bera/ui";

import { VoteColorMap } from "../types";

type IMultiSelectBadge = {
  onSelect: (value: SelectedVotes) => void;
  className?: string;
};

type SelectedVotes = Array<"yes" | "no" | "veto" | "abstain">;

export function MultiSelectBadge({ onSelect, className }: IMultiSelectBadge) {
  const [selected, setSelected] = React.useState<SelectedVotes>([]);

  const updateSelected = (value: "yes" | "no" | "veto" | "abstain") => {
    const index = selected.findIndex((v) => v === value);
    if (index !== -1) {
      const newSelected = [...selected];
      newSelected.splice(index, 1);
      setSelected(newSelected);
    } else {
      const newSelected = [...selected];
      newSelected.push(value);
      setSelected(newSelected);
    }
  };

  React.useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <div className={cn("flex gap-2", className)}>
      <div
        className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
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
        className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
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
        className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
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
        className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
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
