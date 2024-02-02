import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Skeleton } from "@bera/ui/skeleton";

const topSections = [
  {
    title: "Top Validators",
    link: "",
  },
  {
    title: "Top Projects",
    link: "",
  },
  {
    title: "Top Builders",
    link: "",
  },
  {
    title: "New Projects",
    link: "",
  },
];

export default function TopProjects() {
  return (
    <div className="relative h-fit px-0 pb-0 pt-[64px]">
      <div className="mt-8 grid h-fit grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topSections.map((section) => (
          <div className="item-left flex w-full gap-1 p-3 pt-6">
            <Link href={section.link} target="_blank">
              <Button className="h-[120px] w-[276px]" variant="secondary">
                {section.title}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
