"use client";

import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";

import PoolsTable from "~/components/pools-table";

export default function Pool() {
  const router = useRouter();
  return (
    <div className="m-auto flex w-full flex-col gap-5">
      <h1 className="text-left text-2xl font-semibold">Pool page</h1>
      <Button onClick={() => router.push("/pool/new")}>Create new pool</Button>
      <Card className="w-full">
        <PoolsTable />
      </Card>
    </div>
  );
}
