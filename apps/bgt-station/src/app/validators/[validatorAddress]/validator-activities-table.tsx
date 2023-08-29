import React from "react";
import {
  formatter,
  truncateHash,
  useInfiniteValidatorDelegations,
  usePollActiveValidators,
  type Validator,
} from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import Identicon from "@bera/shared-ui/src/identicon";
import { Button } from "@bera/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import {
  delegators_columns,
  recent_votes_columns,
} from "~/columns/validator_activities_table_columns";
import { blockExplorerUrl } from "~/config";

export default function ValidatorActivitiesTable({
  validatorAddress,
}: {
  validatorAddress: Address;
}) {
  const [tab, setTab] = React.useState<"recent-votes" | "delegators">(
    "recent-votes",
  );
  const { useActiveValidators, useActiveValidator } = usePollActiveValidators();
  const validators: Validator[] | undefined = useActiveValidators();
  const validator = useActiveValidator(validatorAddress);

  const { data, size, isLoading, isReachingEnd, setSize } =
    useInfiniteValidatorDelegations(validatorAddress);

  function getRandomTimestamp(start = new Date(2000, 0, 1), end = new Date()) {
    return Math.floor(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    );
  }

  const proposalData = validators?.map(() => ({
    proposal: "What would a proposal title look like?",
    address: "0x0000...0000",
    stance: "stance",
    time: getRandomTimestamp(),
  }));

  const getDelegatorPercentage = (shares: bigint) => {
    const s = Number(formatUnits(shares, 18));
    const total = Number(formatUnits(validator?.delegatorShares ?? 0n, 18));
    return (s / total).toFixed(2);
  };

  const delegatorData = data?.map(
    (data: { delegator: Address; shares: bigint }) => ({
      delegator_address: (
        <div className="flex w-[145px] items-center gap-2">
          <Identicon account={data.delegator} />
          {truncateHash(data.delegator)}
        </div>
      ),
      bgt_amount: (
        <div className="flex w-[88px]">
          {formatter.format(Number(formatUnits(data.shares, 18)))} (
          {getDelegatorPercentage(data.shares)}%)
        </div>
      ),
      // delegated_since: <div className="flex w-[108px] gap-1">21 days ago</div>,
    }),
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
      {/* <SearchInput placeholder="Search" /> */}
      <div className="w-full">
        {tab === "recent-votes" ? (
          <DataTable
            columns={recent_votes_columns}
            data={proposalData ?? []}
            className="min-w-[926px]"
          />
        ) : (
          <div className="flex w-full flex-col items-center gap-4">
            <DataTable
              columns={delegators_columns}
              data={delegatorData ?? []}
              className="min-w-[926px]"
              onRowClick={(row) =>
                window.open(
                  `${blockExplorerUrl}/address/${
                    data[Number(row.id)]?.delegator ?? ""
                  }`,
                  "_blank",
                )
              }
            />

            <Button
              onClick={() => setSize(size + 1)}
              disabled={isLoading || isReachingEnd}
              variant="outline"
            >
              {isLoading
                ? "Loading..."
                : isReachingEnd
                ? "No More Delegators"
                : "View More"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
