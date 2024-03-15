"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function KnowMore() {
  return (
    <div className="p-8 lg:mt-8">
      <div className="mx-auto flex w-full flex-col justify-between rounded-xl border border-solid bg-muted sm:min-h-[300px] sm:flex-row sm:px-4 md:h-[220px] md:max-w-[1080px]">
        <div className="flex flex-col items-center justify-center p-4 sm:items-start">
          <div className="top-0 flex flex-col items-center leading-7 sm:items-start lg:left-0">
            <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
              Want to know more?
            </h1>
            <div className="flex-wrap items-center sm:max-w-[300px] md:max-w-[440px] lg:w-full">
              <h2 className="text-md flex-wrap text-center tracking-tight text-muted-foreground sm:text-left sm:text-lg">
                Interested in becoming a Berachain Ambassador? Learn more about
                joining our innovative community and leading the blockchain
                revolution.
              </h2>
            </div>
          </div>

          <div className="m-2 flex items-start lg:mt-8">
            <Link href="/program-details">
              <Button
                className="rounded-18 mt-4 w-full text-lg font-semibold leading-7 sm:w-auto"
                size={"sm"}
                variant="outline"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden items-end sm:flex">
          <Image
            src="/knowmoarbear.png"
            alt="Project"
            width={400}
            height={400}
            layout="intrinsic"
            className="h-[200px] w-[200px] md:h-[300px] md:w-[300px] lg:h-auto lg:w-auto lg:max-w-full"
          />
        </div>
      </div>
    </div>
  );
}
