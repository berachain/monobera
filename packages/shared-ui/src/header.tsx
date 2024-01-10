"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useBeraJs } from "@bera/berajs";
import { faucetUrl } from "@bera/config";
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

const ThemeToggleMobile = dynamic(
  () => import("./theme-toggle-mobile").then((mod) => mod.ThemeToggleMobile),
  {
    ssr: false,
    loading: () => <> </>,
  },
);

const BGTStatusBtn = dynamic(
  () => import("./bgt-status").then((mod) => mod.BGTStatusBtn),
  {
    ssr: false,
    loading: () => <> </>,
  },
);

export function Header({
  navItems,
  mobileNavItems = [],
  hideConnectBtn = false,
  isHoney = false,
  hideTheme = false,
}: {
  navItems: any[];
  mobileNavItems?: any[];
  hideConnectBtn?: boolean;
  isHoney?: boolean;
  hideTheme?: boolean;
}) {
  const { isReady } = useBeraJs();
  return (
    <nav
      className={cn(
        "h-18 fixed left-0 right-0 top-0 z-50 flex w-full items-end justify-between border-b border-border bg-background bg-opacity-20 px-6 py-3 backdrop-blur-2xl",
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
      <div className="flex h-full items-center gap-2 xl:gap-2">
        {!hideTheme && <ThemeToggleMobile />}
        {isReady && <BGTStatusBtn />}
        <Link
          className="hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-md sm:flex"
          href={faucetUrl ?? ""}
        >
          <Icons.faucetFav className="h-10 w-10 hover:opacity-80" />
        </Link>
        {!hideConnectBtn && <ConnectBtn isNavItem={true} isHoney={isHoney} />}
        <MobileDropdown navItems={isHoney ? mobileNavItems : navItems} />
      </div>
    </nav>
  );
}
