"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { MainNav } from "./main-nav";
import { MobileDropdown } from "./mobile-nav";

const ThemeToggle = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="ghost"
        className="gap-1 px-2 text-lg font-semibold md:text-base"
      >
        <Icons.sun className="block dark:hidden" />
        <Icons.moon className="hidden dark:block" />
      </Button>
    ),
  },
);

const Connect = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.ConnectButton),
  {
    ssr: false,
    loading: () => <Button className="w-full">Connect</Button>,
  },
);

export function Header() {
  return (
    <section className="fixed left-0 right-0 z-50 bg-background">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4">
        <div>
          <div className="mr-8 flex items-center">
            <span className="mr-5 text-lg font-bold tracking-tight">
              <Link href={"/"}>
                <Icons.logo className="h-12 w-12" />
              </Link>
            </span>
            <MainNav />
          </div>
        </div>
        <div className="flex gap-2">
          <ThemeToggle />
          <Connect />
          <MobileDropdown />
        </div>
      </div>
    </section>
  );
}
