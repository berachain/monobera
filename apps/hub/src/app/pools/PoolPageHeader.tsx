"use client";

import React from "react";
import { PoolSearch } from "./PoolsTable";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
export default function PoolPageHeader({
  poolType,
}: {
  poolType: "allPools" | "userPools";
}) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center gap-8">
      {/* Large Screen */}
      <div className="">
        <Image
          src={`${cloudinaryUrl}/DEX/raqbge7ojm9k2w8ouznn.png`}
          alt="Large Screen Image"
          width={1200}
          height={600}
          className="w-full h-auto  object-cover"
        />
      </div>

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
      <PoolSearch poolType={poolType} />
    </div>
  );
}
