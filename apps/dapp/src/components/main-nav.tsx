import { cn } from "@bera/ui";
import Link from "next/link";
import { navItems } from "~/app/config";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        "hidden items-center space-x-4 md:flex lg:space-x-6",
        className
      )}
      {...props}
    >
      {navItems.map((item, idx) => (
        <Link
          href={{ pathname: item.href }}
          key={`${item.href}-${idx}`}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            idx !== 0 && "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
