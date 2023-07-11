"use client";

import {
  useBeraJs,
  usePollUserPoolRewards,
  type RewardPool,
} from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { columns } from "~/components/column";
import RewardsTable from "~/components/rewards-table";

export default function ClaimPageContent() {
  const { usePoolUserPoolRewards } = usePollUserPoolRewards();
  const r: RewardPool[] = usePoolUserPoolRewards();
  const { isConnected } = useBeraJs();
  return (
    <div className="container">
      <Card className="w-full grow">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1 p-3 pb-2">
            <h3 className="text-lg font-medium">Claimable rewards</h3>
          </div>
          <div className="col-span-1 p-3 pb-2 text-right">
            <h3 className="text-lg font-medium">{isConnected ? 0 : "$0"}</h3>
          </div>
        </div>
        <RewardsTable columns={columns} data={r} />
      </Card>
    </div>
  );
}
