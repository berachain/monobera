import React from "react";
import { useRouter } from "next/navigation";
import {
  formatter,
  truncateHash,
  useInfiniteValidatorDelegations,
  usePollActiveValidators,
  type Validator,
} from "@bera/berajs";
import Identicon from "@bera/shared-ui/src/identicon";
import { Button } from "@bera/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import RT from "~/components/react-table";
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
  const router = useRouter();

  const validator = useActiveValidator(validatorAddress);

  const { data, size, isLoading, isReachingEnd, setSize } =
    useInfiniteValidatorDelegations(validatorAddress);

  const proposalData = validators?.map(() => ({
    proposal: (
      <div className="w-[350px]">What would a proposal title look like?</div>
    ),
    address: <div className="flex w-[88px]">0x0000...0000</div>,
    stance: <div className="flex w-[60px] gap-1">stance</div>,
    time: <div className="flex w-[126px] gap-1">2022-03-27 22:20:06</div>,
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
          <RT
            columns={recent_votes_columns}
            data={proposalData ?? []}
            className="min-w-[926px]"
          />
        ) : (
          <div className="flex w-full flex-col items-center gap-4">
            <RT
              columns={delegators_columns}
              data={delegatorData ?? []}
              rowOnClick={(row) => {
                router.push(
                  `${blockExplorerUrl}/address/${
                    data[Number(row.id)]?.delegator ?? ""
                  }`,
                );
              }}
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
