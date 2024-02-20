"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function KnowMore() {
  return (
    <div className="px-16 pb-16 pt-[64px]">
      <div className="relative">
        <div className="relative mx-auto flex min-h-[300px] w-full flex-wrap overflow-hidden rounded-xl border border-solid bg-muted px-8 py-4 md:h-[220px] md:max-w-[1080px]">
          <div className="absolute flex flex-col flex-wrap items-center justify-center pl-4 sm:items-start">
            <div className="top-0 flex flex-col flex-wrap items-center leading-10 sm:items-start lg:left-0">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Want to know more?
              </h1>
              <div className="max-w-[300px] flex-wrap items-center md:max-w-[440px] lg:w-full">
                <h2 className="flex-wrap text-sm tracking-tight text-muted-foreground sm:text-lg sm:leading-8">
                  Fellow builder in the making? Submit project details via this
                  form and please be sure to provide us as much information as
                  possible.
                </h2>
              </div>
            </div>

            <div className="flex items-center lg:mt-8">
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
        </div>
        <div className="relative hidden justify-end sm:flex">
          <div className="absolute bottom-0 right-0 xl:right-[15%]">
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
    </div>
  );
}
