"use client";

import React, { type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

const announcements = [
  {
    image: "/announcement_1.png",
  },
  {
    image: "/announcement_2.png",
  },
  {
    image: "/announcement_3.png",
  },
  {
    image: "/announcement_4.png",
  },
];

export default function Announcements() {
  const [allDataSize, setAllDataSize] = React.useState(4);
  const isAllDataLoadingMore = false;
  const isAllDataReachingEnd = false;
  return (
    <div className="relative flex h-fit flex-col items-center justify-center px-0 pb-0 pt-[64px]">
      <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
        Announcements
      </div>
      <div className="mt-4 text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
        Upcoming Events, Hackathons, Team GetToGethers, etc..
      </div>
      <div className="mt-8 grid h-fit grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {announcements.map((announcement) => (
          <div className="relative col-span-1 flex h-[340px] w-[420px] flex-col rounded-xl border border-solid bg-background">
            <div className="flex flex-col items-center gap-1 px-6 pb-4 pt-6">
              <Image
                src={announcement.image}
                alt="bera banner"
                width={452}
                height={175}
                priority
                loading="eager"
              />
              <div className="text-xl font-semibold text-foreground">
                Project name
              </div>
            </div>
            <div className="item-center flex w-full justify-center gap-1 p-3 pt-6">
              <Link href="" target="_blank">
                <Button className="w-fit" variant="secondary">
                  View Project
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Button
          onClick={() => setAllDataSize(allDataSize + 1)}
          disabled={isAllDataLoadingMore || isAllDataReachingEnd}
          variant="outline"
        >
          Load more
        </Button>
      </div>
    </div>
  );
}
