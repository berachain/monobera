"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6">
        <h2 className="text-muted-foreground">
          Mint honey &amp; stake in boosted pools
        </h2>
        <h1>
          <span className="text-primary">Swap Tokens</span> on Your Favorite New
          Dex
        </h1>
        <div>
          <Button onClick={() => router.push("/swap")} className="mr-4">
            Swap Tokens
          </Button>
          <Button variant="outline" onClick={() => router.push("/pool")}>
            View Pools
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="w-fit">
            Add Liquidity to Earn BGT Rewards
          </Badge>
          <Badge variant="outline" className="w-fit">
            Create your own Liquidity Pools with upto 1.00% Fees
          </Badge>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex justify-center bg-glow bg-cover bg-no-repeat">
          <Image
            src="/swapModule.png"
            alt="Swap module preview"
            width={473}
            height={491}
          />
        </div>
      </div>
    </div>
  );
}
