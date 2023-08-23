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
    <nav className="fixed left-0 right-0 z-50 flex h-20 w-full items-end justify-between gap-8 bg-background bg-opacity-20 px-6 py-4 shadow backdrop-blur-2xl">
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
          <div className="flex-no-wrap hidden h-10 w-fit gap-1 rounded-full border border-yellow-600 bg-yellow-50 px-4 py-2 text-sm font-medium md:flex">
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
