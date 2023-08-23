import React from "react";
import Link from "next/link";
import { useBeraJs, usePollBgtBalance } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";

import { ConnectButton } from "./connect-button";
import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

export function Header({ navItems }: { navItems: any[] }) {
  const { isConnected } = useBeraJs();
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  return (
    <nav className="h-18 fixed left-0 right-0 z-50 flex w-full items-end justify-between gap-8 bg-background bg-opacity-20 px-6 py-3 shadow backdrop-blur-2xl">
      <div>
        <div className="mr-8 flex items-center">
          <span className="mr-5 text-lg font-bold tracking-tight">
            <Link href={"/"}>
              <Icons.logo className="h-12 w-12" />
            </Link>
          </span>
          <MainNav navItems={navItems} />
        </div>
      </div>
      <div className=" flex h-full items-center gap-2">
        {isConnected && (
          <div className="flex-no-wrap hidden h-10 w-fit items-center gap-1 rounded-full border border-warning-foreground bg-warning px-4 py-2 text-sm font-medium text-warning-foreground md:flex">
            <Icons.wallet className="block h-4 w-4" />
            {Number(userBalance).toFixed(2)} <span>BGT</span>
          </div>
        )}
        <ThemeToggle />
        <ConnectButton />
        <MobileDropdown navItems={navItems} />
      </div>
    </nav>
  );
}
