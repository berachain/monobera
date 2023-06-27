import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ConnectButton, HistoryPopover } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";

const ThemeToggle = dynamic(() => import("~/components/theme-toggle"), {
  ssr: true,
});

export function Header() {
  return (
    <>
      <div className="mr-8 hidden h-full flex-col items-center bg-card lg:fixed lg:flex lg:w-52 lg:flex-col">
        <span className="py-10">
          <Link href={"/"}>
            <Icons.logo className="h-16 w-16" />
          </Link>
        </span>
        <MainNav />
      </div>
      <nav className="fixed left-0 right-0 z-50 lg:left-full lg:bg-transparent">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 lg:justify-end">
          <HistoryPopover />
          <MobileDropdown />
          <div className="flex gap-2 lg:mr-8">
            <ThemeToggle />
            <ConnectButton />
          </div>
        </div>
      </nav>
    </>
  );
}
