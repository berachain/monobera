import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

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
    <div className="relative h-fit flex-wrap ">
      <div className="mt-4 flex flex-col flex-wrap items-center justify-center gap-12 lg:flex-row">
        {topSections.map((section) => (
          <Link href={section.link} target="_blank">
            <div className="relative flex h-[120px] w-[280px] self-stretch rounded-lg border border-solid bg-muted pb-5 pt-0">
              <div className="flex items-end justify-center gap-20 self-stretch px-6">
                <div className="font-lg relative w-[80px] font-bold">
                  {section.title}
                </div>
                <div className="relative h-6 w-6 pb-4">
                  <Icons.arrowRight />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
