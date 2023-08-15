import React from "react";
import { SearchInput } from "@bera/shared-ui";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import RT from "~/components/react-table";
import {
  delegators_columns,
  recent_votes_columns,
} from "~/columns/validator_activities_table_columns";

export default function ValidatorActivitiesTable() {
  const [tab, setTab] = React.useState<"recent-votes" | "delegators">(
    "recent-votes",
  );
  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue={tab} className="mx-auto w-fit">
        <TabsList className="w-full">
          {(["recent-votes", "delegators"] as const).map((value) => (
            <TabsTrigger
              value={value}
              key={value}
              className="flex-1 capitalize"
              onClick={() => setTab(value)}
            >
              {value.replaceAll("-", " ")}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <SearchInput />
      <div className="w-full">
        <RT
          columns={
            tab === "recent-votes" ? recent_votes_columns : delegators_columns
          }
          data={[]}
        />
      </div>
    </div>
  );
}
