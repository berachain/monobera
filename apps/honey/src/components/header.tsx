import React from "react";
import Link from "next/link";
import { Icons } from "@bera/ui/icons";

import { HoneyControls } from "./honey-controls";
import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";
import { Wallet } from "./wallet";

export function Header() {
  return (
    <nav className="fixed left-0 right-0 z-50 bg-transparent">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
        <div className="mr-8 hidden items-center md:flex">
          <span className="mr-10 text-lg font-bold tracking-tight">
            <Link href={"/"}>
              <Icons.honeyLogo className="h-10 w-10" />
            </Link>
          </span>
          <MainNav />
        </div>
        <MobileDropdown />
        <div className="flex gap-2">
          <HoneyControls />
          <Wallet />
        </div>
      </div>
    </nav>
  );
}
