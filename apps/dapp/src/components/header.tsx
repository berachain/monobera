import React from "react";
import Link from "next/link";
import { Icons } from "@bera/ui/icons";

import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";
import { Wallet } from "./wallet";

export function Header() {
  return (
    <nav className="fixed left-0 right-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
        <div className="mr-8 hidden items-center md:flex">
          <span className="text-lg font-bold tracking-tight">
            <Link href={"/"}>
              <Icons.logo className="h-12 w-12" />
            </Link>
          </span>
        </div>
        <MobileDropdown />
        <MainNav />
        <Wallet />
      </div>
    </nav>
  );
}
