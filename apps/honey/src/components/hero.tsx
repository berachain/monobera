"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="my-24 grid grid-cols-6 md:grid-cols-12">
      <div className="col-span-6 my-12 text-center">
        <h1 className="mb-4 text-5xl font-extrabold">Switch To Honey</h1>
        <p>Turn your favorite stables into Honey.</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-4">
          <Badge
            variant="outline"
            className="w-fit cursor-pointer gap-1 bg-muted"
            onClick={() => router.push("/pool")}
          >
            <Icons.info className="h-3 w-3" />
            Lend HONEY on Baave <Icons.arrowRight className="h-3 w-3" />
          </Badge>
          <Badge
            variant="outline"
            className="w-fit cursor-pointer gap-1 bg-muted"
            onClick={() => router.push("/")}
          >
            <Icons.info className="h-3 w-3" />
            Add Liquidity to HONEY Pools{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </Badge>
          <Badge
            variant="outline"
            className="w-fit cursor-pointer gap-1 bg-muted"
            onClick={() => router.push("/pool/create")}
          >
            <Icons.info className="h-3 w-3" /> Provide Collateral for Perpetuals{" "}
            <Icons.arrowRight className="h-3 w-3" />
          </Badge>
        </div>
      </div>
    </div>
  );
}
