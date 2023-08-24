"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="my-16 grid grid-cols-6">
      <div className="col-span-6 my-12 text-center">
        <div className="m-auto mb-4 flex max-w-[250px] justify-center">
          <Image src={"/coinIcons.png"} alt="Coins" width={811} height={151} />
        </div>
        <h1 className="mb-3 bg-gradient-to-r from-[#292524] via-[#875100] via-30% to-[#292524] bg-clip-text text-3xl font-extrabold text-transparent">
          Switch To Honey
        </h1>
        <p className="bg-gradient-to-r from-[#292524] via-[#875100] via-30% to-[#292524] bg-clip-text text-lg font-extrabold text-transparent">
          Turn your favorite stables into Honey.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3">
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() => router.push("/pool")}
          >
            <Icons.info className="h-3 w-3" />
            Lend HONEY on Baave <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() => router.push("/")}
          >
            <Icons.info className="h-3 w-3" />
            Add Liquidity to HONEY Pools{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
          <div
            className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
            onClick={() => router.push("/pool/create")}
          >
            <Icons.info className="h-3 w-3" /> Provide Collateral for Perpetuals{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
