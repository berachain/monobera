import { Card } from "@bera/ui/card";

import PoolsTable from "~/components/pools-table";

export default function Pool() {
  return (
    <div className="m-auto flex w-full flex-col gap-5">
      <h1 className="text-left text-2xl font-semibold">Pool page</h1>
      <Card className="w-full">
        <PoolsTable />
      </Card>
    </div>
  );
}
