"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { ScrollArea } from "@bera/ui/scroll-area";

export function MobileDropdown({ navItems }: { navItems: any[] }) {
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
          className="mr-2 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          {isOpen ? (
            <Icons.close className="h-6 w-6" />
          ) : (
            <Icons.menu className="h-6 w-6" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen animate-none rounded-none border-none transition-transform">
        <ScrollArea className="h-full py-8">
          {navItems.map(({ href, title, children }) => {
            if (href === "#" && children) {
              return (
                <ul
                  className="grid w-full gap-3 p-1 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  key={href}
                >
                  {children.map((component: any) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.blurb}
                    </ListItem>
                  ))}
                </ul>
              );
            }
            return (
              <Link
                key={href}
                onClick={() => setIsOpen(false)}
                href={{ pathname: href }}
                className="flex p-4 font-medium text-foreground transition-colors hover:text-primary"
              >
                {title}
              </Link>
            );
          })}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <a
        target="_blank"
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary",
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </li>
  );
});
ListItem.displayName = "ListItem";
