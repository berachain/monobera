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
            "border-2 border-transparent px-2 py-1 text-sm font-medium text-primary-foreground transition-colors hover:text-primary",
            item.href === pathname && "rounded-lg border-primary ",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
