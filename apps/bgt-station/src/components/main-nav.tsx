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
            "rounded-lg px-4 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            item.href === pathname && "text-primary",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
