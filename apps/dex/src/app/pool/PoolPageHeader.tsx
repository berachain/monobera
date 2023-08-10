"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { DataCard } from "../homepage/components/Data";

export default function PoolPageHeader() {
  const router = useRouter();
  return (
    <>
      <h1 className="text-center text-5xl font-bold">
        Create a <span className="text-secondary">Pool</span>
        <br /> <span className="text-secondary">Or</span> Add Liquidity
      </h1>
      <div className="flex flex-row gap-2 self-center">
        <Button
          onClick={() => router.push("/pool/create")}
          className="text-md mb-10 w-[150px] self-center"
        >
          Create a Pool
        </Button>
        <Button
          variant={"outline"}
          onClick={() => router.push("/pool/create")}
          className="text-md mb-10 w-[150px] self-center"
        >
          View Pools
        </Button>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center md:flex-row">
        <DataCard
          icon={<Icons.lock />}
          title={"Total Value Locked"}
          value={"$842,886,669"}
        />
        <DataCard
          icon={<Icons.candleStick />}
          title={"24H Volume"}
          value={"$69,420,702"}
        />
        <DataCard
          icon={<Icons.medal />}
          title={"BGT Rewards Distributed"}
          value={"1,690,420 BGT"}
        />
      </div>
    </>
  );
}
