import { type Metadata } from "next";
import { Card } from "@bera/ui/card";

import PoolsTable from "~/components/pools-table";
import PoolPageHeader from "./PoolPageHeader";

export const metadata: Metadata = {
  title: "Pools | DEX | Berachain",
  description: "Decentralized exchange on Berachain",
};

export default function Pool() {
  return (
    <div className="container m-auto flex w-full flex-col gap-5">
      <PoolPageHeader />
      <Card className="w-full">
        <PoolsTable />
      </Card>
    </div>
  );
}
