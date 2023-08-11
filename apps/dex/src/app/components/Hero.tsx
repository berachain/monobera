"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="my-24 grid grid-cols-6 md:grid-cols-12">
      <div className="col-span-6 my-12">
        <h1 className="mb-4 text-5xl font-extrabold">
          <span className="text-amber-400">Swap Tokens</span> on Your Favorite New
          Dex
        </h1>
        <div className="mb-6">
          <Button onClick={() => router.push("/swap")} className="mr-4 bg-muted" variant={'outline'}>
            Swap Tokens
          </Button>
          <Button variant="outline" onClick={() => router.push("/pool")}>
            View Pools
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="w-fit bg-muted gap-1" onClick={() => router.push("/pool")}>
            <Icons.info className="w-3 h-3"/> Add Liquidity to Earn BGT Rewards <Icons.arrowRight className="w-3 h-3"/>
          </Badge>
          <Badge variant="outline" className="w-fit bg-muted gap-1" onClick={() => router.push("/")}> 
          <Icons.info className="w-3 h-3" />Get BGT Emissions for my token <Icons.arrowRight className="w-3 h-3"/>
          </Badge>
          <Badge variant="outline" className="w-fit bg-muted gap-1" onClick={() => router.push("/pool/create")}>
          <Icons.info className="w-3 h-3" /> Create your own Liquidity Pools <Icons.arrowRight className="w-3 h-3"/>
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
