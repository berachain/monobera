import React from "react";
import { VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { cn } from "@bera/ui";

import { VoteColorMap } from "../types";

type IMultiSelectBadge = {
  onSelect: (value: SelectedVotes) => void;
  className?: string;
};

type SelectedVotes = Array<0 | 1 | 2 | 3 | 4>;

export function MultiSelectBadge({ onSelect, className }: IMultiSelectBadge) {
  const [selected, setSelected] = React.useState<SelectedVotes>([]);

  const updateSelected = (value: 0 | 1 | 2 | 3 | 4) => {
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
          selected.includes(VoteOption.VOTE_OPTION_YES)
            ? {
                backgroundColor: VoteColorMap.yes_secondary,
                color: VoteColorMap.yes,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected(VoteOption.VOTE_OPTION_YES)}
      >
        Yes
      </div>
      <div
        className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
        style={
          selected.includes(VoteOption.VOTE_OPTION_NO)
            ? {
                backgroundColor: VoteColorMap.no_secondary,
                color: VoteColorMap.no,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected(VoteOption.VOTE_OPTION_NO)}
      >
        No
      </div>
      <div
        className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
        style={
          selected.includes(VoteOption.VOTE_OPTION_NO_WITH_VETO)
            ? {
                backgroundColor: VoteColorMap.veto_secondary,
                color: VoteColorMap.veto,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected(VoteOption.VOTE_OPTION_NO_WITH_VETO)}
      >
        No with veto
      </div>
      <div
        className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
        style={
          selected.includes(VoteOption.VOTE_OPTION_ABSTAIN)
            ? {
                backgroundColor: VoteColorMap.abstain_secondary,
                color: VoteColorMap.abstain,
              }
            : { color: VoteColorMap.default }
        }
        onClick={() => updateSelected(VoteOption.VOTE_OPTION_ABSTAIN)}
      >
        Abstain
      </div>
    </div>
  );
}
