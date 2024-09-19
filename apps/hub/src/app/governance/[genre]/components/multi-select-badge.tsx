import React from "react";
import { VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { cn } from "@bera/ui";

import { VoteColorMap } from "../../types";

type IMultiSelectBadge = {
  onSelect: (
    value: Omit<
      VoteOption,
      VoteOption.VOTE_OPTION_UNSPECIFIED | VoteOption.UNRECOGNIZED
    >[],
  ) => void;
  className?: string;
};

export type SelectedVotes = Array<VoteOption>;

export function MultiSelectBadge({ onSelect, className }: IMultiSelectBadge) {
  const [selected, setSelected] = React.useState<SelectedVotes>([]);

  const updateSelected = (value: VoteOption) => {
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

  const voteOptions: {
    value: VoteOption;
    label: string;
    activeStyle: {
      backgroundColor: string;
      color: string;
    };
  }[] = [
    {
      value: VoteOption.VOTE_OPTION_YES,
      label: "Yes",
      activeStyle: {
        backgroundColor: VoteColorMap.yes_secondary,
        color: VoteColorMap.yes,
      },
    },
    {
      value: VoteOption.VOTE_OPTION_NO,
      label: "No",
      activeStyle: {
        backgroundColor: VoteColorMap.no_secondary,
        color: VoteColorMap.no,
      },
    },
    {
      value: VoteOption.VOTE_OPTION_NO_WITH_VETO,
      label: "No with veto",
      activeStyle: {
        backgroundColor: VoteColorMap.veto_secondary,
        color: VoteColorMap.veto,
      },
    },
    {
      value: VoteOption.VOTE_OPTION_ABSTAIN,
      label: "Abstain",
      activeStyle: {
        backgroundColor: VoteColorMap.abstain_secondary,
        color: VoteColorMap.abstain,
      },
    },
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      {voteOptions.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="button"
          className="flex min-w-[60px] justify-center rounded-full bg-muted px-2 py-1 text-xs font-medium capitalize leading-tight hover:cursor-pointer hover:shadow"
          style={
            selected.includes(opt.value)
              ? opt.activeStyle
              : { color: VoteColorMap.default }
          }
          onClick={() => updateSelected(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
