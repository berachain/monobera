"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cloudinaryUrl, docsUrl } from "@bera/config";
import { Button } from "@bera/ui/button";

import { PoolSearch } from "./PoolsTable";

export default function PoolPageHeader({
  poolType,
}: {
  poolType: "allPools" | "userPools";
}) {
  const router = useRouter();

  return (
    <div className="mx-auto mt-4 flex w-full flex-col items-center justify-center gap-8">
      <div className="flex w-full flex-col-reverse items-center justify-center text-center md:flex-row md:justify-between">
        <div>
          <h1 className="leading-12 mb-2 text-center text-5xl font-bold md:text-left">
            Add{" "}
            <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
              Liquidity
            </span>{" "}
            <br />
            or Create a{" "}
            <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
              Pool
            </span>
          </h1>
          <div className="mb-4 font-medium leading-6 text-muted-foreground">
            Become an LP to earn trading fees and BGT Incentives
          </div>
          <div className="mb-2 flex flex-row justify-center gap-2 self-center md:justify-start ">
            <Button
              onClick={() => router.push("/pool/create")}
              className="text-md self-center"
            >
              Create a Pool
            </Button>
            <Link href={`${docsUrl}/learn/dex/pools`} target="_blank">
              <Button variant={"outline"} className="text-md self-center">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <Image
          src={`${cloudinaryUrl}/shared/qmtxbqw1lgjsnlszftow`}
          alt="honey jar"
          width={393}
          height={300}
          className="pointer-events-none w-[256px] select-none	lg:w-[393px]"
        />
      </div>
      <PoolSearch poolType={poolType} />
    </div>
  );
}
