"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { cloudinaryUrl } from "@bera/config";

import { PoolSearch } from "./PoolsTable";
import { usePools, usePool } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import Link from "next/link";

export default function PoolPageHeader() {
  const sp = useSearchParams();
  const poolType = sp.get("pool") as "allPools" | "userPools";

  const { data: pools } = usePools();

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-8">
      {/* Large Screen */}
      <Image
        src={`${cloudinaryUrl}/DEX/raqbge7ojm9k2w8ouznn.png`}
        alt="Large Screen Image"
        width={1200}
        height={600}
        className="h-auto w-full  object-cover"
      />

      {/* Tablet Screen
      <div className="hidden md:block lg:hidden">
        <Image
          src={`${cloudinaryUrl}/DEX/zxxnwkdhfjcikwwgtqpc.png`}
          alt="Tablet Screen Image"
          width={800}
          height={400}
          className="w-full h-auto  object-cover"
        />
      </div> */}

      {/* Mobile Screen */}
      {/* <div className="block xs:hidden">
        <Image
          src={`${cloudinaryUrl}/DEX/zz9s7qxq8g3ykbqtzgxv.png`}
          alt="Mobile Screen Image"
          width={400}
          height={200}
          className="w-full h-auto object-cover"
        />
      </div> */}

      <div className="flex flex-col gap-4">
        {pools?.map((pool) => (
          <div key={pool.id}>
            {pool.name}{" "}
            <Button as={Link} href={`/pool/${pool.id}`}>
              View
            </Button>
          </div>
        ))}
      </div>
      <PoolSearch poolType={poolType || "allPools"} />
    </div>
  );
}
