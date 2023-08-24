"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { cloudinaryUrl } from "~/config";

export default function Tutorial() {
  const router = useRouter();
  return (
    <div className="flex w-full flex-col items-center justify-between md:flex-row">
      <div className="w-3/5">
        <Image
          src={`${cloudinaryUrl}/BERPS/ui-demo_af08ak`}
          width={936}
          height={1020}
          className="w-full max-w-[936px]"
          alt="demo image"
        />
      </div>
      <div className="flex flex-shrink-0 flex-col gap-4">
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
        <div className="mb-6 flex items-center text-left md:text-left">
          <Button onClick={() => router.push("/berpetuals")} className="mr-4">
            <Icons.play className="mr-1 h-6 w-6" />
            Tutorial
          </Button>
          <Button variant="secondary" onClick={() => router.push("/markets")}>
            Trading Guide
          </Button>
        </div>
      </div>
    </div>
  );
}
