import React, { useMemo } from "react";
import { DataTable, DataTableColumnHeader } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { MultiSelectBadge } from "../components/multi-select-badge";
import { generateRandomData } from "../home/mockData";

const userTypes = ["all", "validators", "users"];

export function VoterTable() {
  const [voterTypes, setVoterTypes] = React.useState<typeof userTypes>("all");
  const [voteType, setVoteType] = React.useState<string[]>([]);

  const voterData = useMemo(
    () =>
      generateRandomData()
        .filter((data) =>
          voterTypes === "all" ? true : data.voterTypes === voterTypes,
        )
        .filter(
          (data) => voteType.includes(data.voteType) || voteType.length === 0,
        ),

    [voteType, voterTypes],
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <Tabs defaultValue={voterTypes} className="my-4">
          <TabsList>
            {userTypes.map((type) => (
              <TabsTrigger
                value={type}
                key={type}
                className="capitalize"
                onClick={() => setVoterTypes(type)}
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <MultiSelectBadge onSelect={(value) => setVoteType(value)} />
      </div>
      <Card className="relative mt-1 max-h-[830px] overflow-y-scroll p-4">
        {voterData.map((voter) => (
          <div key={voter.voter}>
            {voter.amount} {voter.voteType} {voter.voter} {voter.voterTypes}
          </div>
        ))}
      </Card>
      <div className="w-full text-right text-xs font-medium leading-tight text-muted-foreground">
        {voterData.length} addresses
      </div>
    </div>
  );
}
