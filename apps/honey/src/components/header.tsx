import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@bera/shared-ui";

import { HoneyControls } from "./honey-controls";
import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";

export function Header() {
  return (
    <nav className="fixed left-0 right-0 z-50 bg-white">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
        <div className="mr-8 hidden items-center md:flex">
          <span className="mr-10 text-lg font-bold tracking-tight">
            <Link href={"/"}>
              <Image
                src={"/HONEY.png"}
                width={100}
                height={100}
                alt={"Honey Logo"}
                className="h-10 w-10"
              />
            </Link>
          </span>
          <MainNav />
        </div>
        <MobileDropdown />
        <div className="flex gap-2">
          <HoneyControls />
          <ConnectButton isNavItem={true} />
        </div>
      </div>
    </nav>
  );
}
