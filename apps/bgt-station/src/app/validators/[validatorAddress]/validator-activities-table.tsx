import React from "react";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
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
  const { useActiveValidators } = usePollActiveValidators();
  const validators: Validator[] = useActiveValidators();
  const proposalData = validators.map(() => ({
    proposal: (
      <div className="w-[350px]">What would a proposal title look like?</div>
    ),
    address: <div className="flex w-[88px]">0x0000...0000</div>,
    stance: <div className="flex w-[60px] gap-1">stance</div>,
    time: <div className="flex w-[126px] gap-1">2022-03-27 22:20:06</div>,
  }));
  const delegatorData = validators.map((validator) => ({
    delegator_address: (
      <div className="flex w-[145px] items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="font-bold">
            validator avatar
          </AvatarFallback>
        </Avatar>
        {validator.description.moniker}
      </div>
    ),
    bgt_amount: <div className="flex w-[88px]">69.42K (6.9%)</div>,
    delegated_since: <div className="flex w-[108px] gap-1">21 days ago</div>,
  }));

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
      {/* <SearchInput placeholder="Search" /> */}
      <div className="w-full">
        {tab === "recent-votes" ? (
          <RT
            columns={recent_votes_columns}
            data={proposalData}
            className="min-w-[926px]"
          />
        ) : (
          <RT
            columns={delegators_columns}
            data={delegatorData}
            className="min-w-[926px]"
          />
        )}
      </div>
    </div>
  );
}
