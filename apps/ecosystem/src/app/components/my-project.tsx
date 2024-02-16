"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function MyProject() {
  return (
    <div className="px-0 pb-16 pt-[64px]">
      <div className="relative">
        <div className="relative mx-auto flex min-h-[300px] min-w-[400px] gap-4 rounded-xl border border-solid bg-muted px-8 py-4 md:h-[220px] md:min-w-[800px] lg:w-[1080px]">
          <div className="absolute flex flex-col flex-wrap items-center justify-center pr-8 sm:items-start">
            <div className="top-0 flex flex-col flex-wrap leading-10 lg:left-0">
              <h1 className="text-lg font-extrabold tracking-tight text-foreground sm:text-2xl sm:leading-[72px]">
                Get My Project Listed
              </h1>
              <div className="max-w-[300px] flex-wrap md:max-w-[480px] lg:w-full">
                <h2 className="flex-wrap text-sm tracking-tight text-muted-foreground sm:text-lg sm:leading-8">
                  Fellow builder in the making? Submit project details via this
                  form and please be sure to provide us as much information as
                  possible.
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap lg:mt-8">
              <Link href={"/dashboard"}>
                <Button
                  className="rounded-18 mt-4 w-full text-lg font-semibold leading-7 sm:w-auto"
                  size={"sm"}
                  variant="info"
                >
                  Submit
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative justify-end sm:flex">
          <div className="absolute bottom-0 right-0 xl:bottom-[-5%] xl:right-[-10%]">
            <Image
              src="/ecobear.png"
              alt="Project"
              width={600}
              height={650}
              layout="intrinsic"
              className="h-[200px] w-[200px] md:h-[400px] md:w-[400px] lg:h-auto lg:w-auto lg:max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
