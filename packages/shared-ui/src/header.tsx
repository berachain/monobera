"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { publicAnalyticsUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";

const ConnectBtn = dynamic(
  () => import("./connect-button").then((mod) => mod.ConnectButton),
  {
    ssr: false,
    loading: () => (
      <Button>
        {" "}
        <Icons.spinner className="relative mr-1 h-6 w-6 animate-spin" />
        Loading
      </Button>
    ),
  },
);

export function Header({
  navItems,
  isHoney = false,
}: {
  navItems: any[];
  isHoney?: boolean;
}) {
  return (
    <nav
      className={cn(
        "h-18 fixed left-0 right-0 top-0 z-50 flex w-full items-end justify-between bg-background bg-opacity-20 px-6 py-3 shadow-lg backdrop-blur-2xl",
      )}
    >
      <div>
        <div className="flex items-center">
          <span className="text-lg font-bold tracking-tight lg:mr-5">
            <Link href={"/"}>
              <Icons.logo className="h-12 w-12 text-foreground" />
            </Link>
          </span>
          <MainNav navItems={navItems} />
        </div>
      </div>
      <div className="flex h-full items-center gap-2 xl:gap-4"> 
        {isHoney && (
          <Link
            href={publicAnalyticsUrl}
            target="_blank"
            className="hidden cursor-pointer items-center gap-1 whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground lg:flex"
          >
            Dune Analytics <Icons.externalLink className="h-3 w-3" />
          </Link>
        )}
        <ConnectBtn isNavItem={true} isHoney={isHoney} />
        <MobileDropdown navItems={navItems} />
      </div>
    </nav>
  );
}
