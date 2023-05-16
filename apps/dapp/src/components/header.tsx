import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";
import { Wallet } from "./wallet";
import { Icons } from "@bera/ui/icons";
import Link from "next/link";
import React from "react";

export function Header() {
  return (
    <nav className="fixed left-0 right-0 z-50 border-b bg-background">
      <div className="flex items-center h-16 w-full px-4 mx-auto justify-between">
        <div className="items-center hidden mr-8 md:flex">
          <span className="text-lg font-bold tracking-tight">
            <Link href={"/"}>
              <Icons.logo className="w-12 h-12" />
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
