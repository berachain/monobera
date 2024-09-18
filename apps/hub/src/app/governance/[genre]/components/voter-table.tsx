import React from "react";
import { Vote } from "@bera/berajs";
import { NotFoundBear, SimpleTable, useAsyncTable } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { MultiSelectBadge } from "./multi-select-badge";
import { VoterColumns } from "./voter-column";

export function VoterTable({
  votes,
  isLoading,
}: {
  votes: Vote[];
  isLoading: boolean;
}) {
  const [voteType, setVoteType] = React.useState<number[]>([]);

  const table = useAsyncTable({
    fetchData: async () => {},
    columns: VoterColumns,
    data: votes,
    additionalTableProps: {
      manualSorting: false,
    },
  });

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <div className="flex flex-col items-center justify-end sm:flex-row">
        {/* <MultiSelectBadge onSelect={(value) => setVoteType(value)} /> */}
      </div>

      <div className="">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            {" "}
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
