import { Card } from "@bera/ui/card";

import { rewards } from "~/utils/constants";
import { columns } from "~/components/column";
import RewardsTable from "~/components/rewards-table";

export default function Claim() {
  return (
    <div className="m-auto flex w-full max-w-4xl flex-col items-center justify-center gap-5">
      <Card className="w-full grow">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1 p-3">
            <h3 className="font-medium">Claimable rewards</h3>
            <p className="text-lg text-secondary-foreground">$6,969.69</p>
          </div>
          <div className="col-span-1 p-3 text-right">
            <h3 className="font-medium">Total deposits</h3>
            <p className="text-lg text-secondary-foreground">$6,969.69</p>
          </div>
        </div>
      </Card>
      <Card className="w-full grow">
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1 p-3 pb-2">
            <h3 className="text-lg font-medium">Claimable rewards</h3>
          </div>
          <div className="col-span-1 p-3 pb-2 text-right">
            <h3 className="text-lg font-medium">$6,969.69</h3>
          </div>
        </div>
        <RewardsTable columns={columns} data={rewards} />
      </Card>
    </div>
  );
}
