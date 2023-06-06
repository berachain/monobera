"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@bera/ui";

import { navItems } from "~/app/config";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <nav
      className={cn("hidden lg:flex lg:w-full lg:flex-col lg:px-8", className)}
      {...props}
    >
      {navItems.map((item, idx) => (
        <Link
          href={{ pathname: item.href }}
          key={`${item.href}-${idx}`}
          className={cn(
            "rounded-lg border-2 border-transparent px-2 py-1 text-sm font-medium text-backgroundSecondary transition-colors",
            item.href === pathname && "text-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
