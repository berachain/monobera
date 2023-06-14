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
      className={cn(
        "hidden items-center space-x-4 md:flex lg:space-x-2",
        className,
      )}
      {...props}
    >
      {navItems.map((item, idx) => (
        <Link
          href={{ pathname: item.href }}
          key={`${item.href}-${idx}`}
          className={cn(
            "px-2 py-1 text-sm font-medium text-primary-foreground/50 transition-colors hover:text-primary-foreground",
            item.href === pathname && "text-primary-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
