"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="mt-[210px] flex w-full flex-col items-center justify-center gap-4">
      <h1 className="md:leading-14 text-center text-3xl font-extrabold leading-9 md:text-5xl">
        The{" "}
        <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
          Tools
          <br className="hidden md:block" /> You Need
        </span>{" "}
        for
        <br className="hidden md:block" /> Your Next Trade{" "}
      </h1>
      <div className="text-center font-medium leading-normal text-muted-foreground">
        Trade All Your Favourite Pairs
        <br />
        With Deep Liquidity and Market Diversity
      </div>
      <div className="mb-6 text-center md:text-left">
        <Button onClick={() => router.push("/berpetuals")} className="mr-4">
          Start Trading
        </Button>
        <Button variant="outline" onClick={() => router.push("/markets")}>
          Explore Markets
        </Button>
      </div>
    </div>
  );
}
