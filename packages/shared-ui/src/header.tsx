"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useBeraJs } from "@bera/berajs";
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
          className="flex h-10 w-12 flex-shrink-0 items-center justify-center rounded-md bg-blue-500"
          href={process.env.NEXT_PUBLIC_FAUCET_URL ?? ""}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 16.2998C9.2 16.2998 11 14.4698 11 12.2498C11 11.0898 10.43 9.9898 9.29 9.0598C8.15 8.1298 7.29 6.7498 7 5.2998C6.71 6.7498 5.86 8.1398 4.71 9.0598C3.56 9.9798 3 11.0998 3 12.2498C3 14.4698 4.8 16.2998 7 16.2998Z"
              stroke="#FAFAF9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.56 6.60002C13.2477 5.50114 13.7353 4.28906 14 3.02002C14.5 5.52002 16 7.92002 18 9.52002C20 11.12 21 13.02 21 15.02C21.0057 16.4023 20.6008 17.7552 19.8368 18.9071C19.0727 20.059 17.9838 20.9582 16.7081 21.4905C15.4324 22.0229 14.0274 22.1644 12.6711 21.8973C11.3149 21.6302 10.0685 20.9664 9.08997 19.99"
              stroke="#FAFAF9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
        {!hideConnectBtn && <ConnectBtn isNavItem={true} isHoney={isHoney} />}
        <MobileDropdown navItems={isHoney ? mobileNavItems : navItems} />
      </div>
    </nav>
  );
}
