"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";

export default function Tutorial() {
  const router = useRouter();
  return (
    <div className="gap-2xl flex w-full flex-col items-center justify-center md:flex-row">
      <div className="flex-1">image</div>
      <div className="flex flex-1 flex-col gap-4">
        <h1 className="md:leading-14 text-left text-3xl font-extrabold leading-9 md:text-5xl">
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Familiar Experience
          </span>{" "}
          <br className="hidden md:block" />
          and Tooling
        </h1>
        <div className="text-left font-medium leading-normal text-muted-foreground">
          Enabling a full suite of features for both <br /> veteran and novice
          traders to transact.
        </div>
        <div className="mb-6 text-left md:text-left">
          <Button onClick={() => router.push("/berpetuals")} className="mr-4">
            Tutorial
          </Button>
          <Button variant="outline" onClick={() => router.push("/markets")}>
            Trading Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
