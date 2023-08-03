"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="my-24 grid grid-cols-6 xl:grid-cols-12">
      <div className="col-span-6 my-12">
        <h1 className="mb-4 text-5xl font-extrabold">
          <span className="text-primary">Swap Tokens</span> on Your Favorite New
          Dex
        </h1>
        <div className="mb-6">
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
            Get BGT Emissions for my token
          </Badge>
          <Badge variant="outline" className="w-fit">
            Create your own Liquidity Pools
          </Badge>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex justify-center bg-glow bg-cover bg-center bg-no-repeat">
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
