"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function MyProject() {
  return (
    <div>
      <div className="flex items-center justify-center gap-8 rounded-xl border border-solid bg-muted p-8 py-4">
        <div className="relative mx-auto flex h-[220px] w-[1088px]">
          <div className="absolute flex flex-col flex-wrap items-start py-8">
            <div className="left-0 top-0 flex flex-col leading-10">
              <h1 className="text-2xl font-extrabold leading-[72px] tracking-tight text-foreground sm:text-2xl">
                Get My Project Listed
              </h1>
              <h2 className="text-md mt-2 whitespace-nowrap leading-8 tracking-tight text-muted-foreground">
                Fellow builder in the making? Submit project details via this
                form <br />
                and please be sure to provide us as much information as
                possible.
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href={"/dashboard"}>
                <Button
                  className="rounded-18 mt-8 w-full text-lg font-semibold leading-7 sm:w-auto"
                  size={"lg"}
                  variant="info"
                >
                  Submit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Image
        src="/ecobear.png"
        alt="Project"
        width={480}
        height={480}
        className="rounded-2 absolute pr-2"
      />
    </div>
  );
}
