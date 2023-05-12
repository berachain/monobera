"use client";

import ThemeToggle from "./theme-toggle";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { ScrollArea } from "@bera/ui/scroll-area";
import Link from "next/link";
import * as React from "react";
import { navItems } from "~/app/config";
import { Search } from "~/app/dashboard/components/search";

export function MobileDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 mr-2 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.logo className="w-6 h-6 mr-2" />
          <span className="text-lg font-bold tracking-tight">bera Corp</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen animate-none rounded-none border-none transition-transform">
        <Search />
        <ScrollArea className="py-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // className="flex items-center mt-2 text-lg font-semibold sm:text-sm"
              className="flex py-1 text-base font-medium transition-colors text-muted-foreground hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </ScrollArea>
        <div className="pt-4 border-t">
          <ThemeToggle side="top" align="start" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
