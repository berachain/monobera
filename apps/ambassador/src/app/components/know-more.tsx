"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function KnowMore() {
  return (
    <div className="p-8 lg:mt-8">
      <div className="relative">
        <div className="relative mx-auto flex w-full flex-wrap justify-center overflow-hidden rounded-xl border border-solid bg-muted py-4 sm:min-h-[300px] sm:justify-start sm:px-8 md:h-[220px] md:max-w-[1080px]">
          <div className="flex flex-col flex-wrap items-center justify-center sm:absolute sm:items-start">
            <div className="top-0 flex flex-col flex-wrap items-center leading-7 sm:items-start lg:left-0">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Want to know more?
              </h1>
              <div className="max-w-[300px] flex-wrap items-center md:max-w-[440px] lg:w-full">
                <h2 className="text-md flex-wrap tracking-tight text-muted-foreground sm:text-lg">
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
          <div className="absolute bottom-0 right-0 lg:right-[120px] xl:right-[160px]">
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
