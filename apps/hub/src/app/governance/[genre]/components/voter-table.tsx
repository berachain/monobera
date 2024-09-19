import React, { useMemo } from "react";
import type { Vote } from "@bera/berajs";
import {
  Dropdown,
  NotFoundBear,
  SimpleTable,
  useAsyncTable,
} from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { MultiSelectBadge, SelectedVotes } from "./multi-select-badge";
import { voterColumns } from "./voter-column";
import { VoteOption } from "@bera/proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

const voteOptionMap: Record<VoteOption, string> = {
  [VoteOption.VOTE_OPTION_YES]: "for",
  [VoteOption.VOTE_OPTION_NO]: "against",
  [VoteOption.VOTE_OPTION_ABSTAIN]: "abstain",
  [VoteOption.VOTE_OPTION_NO_WITH_VETO]: "no with veto",
  [VoteOption.UNRECOGNIZED]: "unrecognized",
  [VoteOption.VOTE_OPTION_UNSPECIFIED]: "unrecognized",
};

export function VoterTable({
  votes,
  isLoading,
}: {
  votes: Vote[];
  isLoading: boolean;
}) {
  const [filter, setFilter] = React.useState<{
    voteType?: string[];
    walletType?: "user" | "validator";
  }>({
    voteType: undefined,
    walletType: undefined,
  });

  // Let's compute the filtered votes since there might be a lot of them
  const filteredVotes = useMemo(() => {
    return votes.filter((vote) => {
      if (filter.voteType?.length && !filter.voteType.includes(vote.type)) {
        return false;
      }

      if (filter.walletType) {
        // TODO: Implement wallet type filter
        return false;
      }
      return true;
    });
  }, [votes, filter]);

  const table = useAsyncTable({
    fetchData: async () => {},
    columns: voterColumns,
    data: filteredVotes,
    additionalTableProps: {
      manualSorting: false,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-2 max-w-full">
      <div className="flex justify-between items-center ">
        <div className="text-lg  font-semibold leading-none text-foreground">
          Voters
        </div>
        <div className="sm:hidden flex items-center">
          <label
            htmlFor="vote-type-dropdown"
            className=" text-sm text-muted-foreground mr-1"
          >
            Filter for
          </label>
          <Dropdown
            placeholder="All"
            selected={filter.voteType?.at(0) ?? ""}
            selectionList={[
              {
                label: "Yes",
                value: "for",
              },
              {
                label: "Abstain",
                value: "abstain",
              },
              {
                label: "No",
                value: "against",
              },
            ]}
            onSelect={(value) =>
              setFilter((filter) => ({
                ...filter,
                voteType: [value],
              }))
            }
            sortby={false}
            triggerClassName="bg-muted border border-border"
            contentClassname="bg-muted border border-border"
          />
        </div>
        <div className="hidden sm:flex flex-col items-center justify-end sm:flex-row">
          <MultiSelectBadge
            onSelect={(value) =>
              setFilter((filter) => ({
                ...filter,
                voteType: value.map(
                  (vote) => voteOptionMap[vote as VoteOption],
                ),
              }))
            }
          />
        </div>
      </div>

      <div className="max-w-full overflow-scroll">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {[0, 0, 0, 0, 0, 0].map((_, index) => (
              <Skeleton key={index} className="h-10 w-full" />
            ))}{" "}
          </div>
        ) : votes.length === 0 ? (
          <NotFoundBear title="No recent votes found." />
        ) : (
          <SimpleTable
            table={table}
            wrapperClassName={""}
            flexTable
            dynamicFlex
            showToolbar={false}
          />
        )}
      </div>

      <div className="mt-4 w-full text-right text-xs font-medium leading-tight text-muted-foreground">
        {votes.length} addresses
      </div>
    </div>
  );
}
