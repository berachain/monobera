"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MainNav, MobileDropdown } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

export function Header({ navItems }: { navItems: any[] }) {
  const ThemeToggleMobile = dynamic(
    () =>
      import("@bera/shared-ui/src/theme-toggle-mobile").then(
        (mod) => mod.ThemeToggleMobile,
      ),
    {
      ssr: false,
      loading: () => <> </>, // Your loading component or JSX here
    },
  );
  return (
    <nav
      className={cn(
        "h-18 fixed left-0 right-0 top-0 z-50 w-full border-b border-border bg-background bg-opacity-20  backdrop-blur-2xl",
      )}
    >
      <div className="flex items-end justify-between px-6 py-3">
        <div className="flex items-center">
          <span className="text-lg font-bold tracking-tight lg:mr-5">
            <Link href={"/"}>
              <Icons.logo className="h-12 w-12 text-foreground" />
            </Link>
          </span>
          <MainNav navItems={navItems} />
        </div>

        <div className="flex h-full items-center gap-2 xl:gap-2">
          <ThemeToggleMobile />
          <Link
            className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-md sm:flex"
            href={""}
            target="_blank"
          >
            <Icons.faucetFav className="h-10 w-10 hover:opacity-80" />
          </Link>
          <MobileDropdown navItems={navItems} />
        </div>
      </div>
    </nav>
  );
}
