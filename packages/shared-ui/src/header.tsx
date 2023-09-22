import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { formatter, useBeraJs, usePollBgtBalance } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

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
    loading: () => <></>,
  },
);

export function Header({
  navItems,
  isHoney = false,
}: {
  navItems: any[];
  isHoney?: boolean;
}) {
  const { isConnected } = useBeraJs();
  const { useBgtBalance, isLoading } = usePollBgtBalance();
  const userBalance = useBgtBalance();

  return (
    <nav
      className={cn(
        "h-18 fixed left-0 right-0 top-0 z-50 flex w-full items-end justify-between bg-background bg-opacity-20 px-6 py-3 shadow backdrop-blur-2xl",
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
        {isConnected && userBalance && !isHoney && (
          <div className="flex-no-wrap hidden h-10 w-fit items-center gap-1 rounded-full border border-warning-foreground bg-warning px-4 py-2 text-sm font-medium text-warning-foreground lg:flex">
            <Icons.wallet className="block h-4 w-4" />
            {isLoading ? (
              <Skeleton className="h-10 w-20" />
            ) : (
              formatter.format(Number(userBalance))
            )}{" "}
            <span>BGT</span>
          </div>
        )}
        {!isHoney && <ThemeToggleMobile />}
        {/* {!isHoney && <ThemeToggle />} */}
        <ConnectBtn isNavItem={true} />
        <MobileDropdown navItems={navItems} />
      </div>
    </nav>
  );
}
