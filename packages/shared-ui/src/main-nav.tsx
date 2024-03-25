import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@bera/ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@bera/ui/navigation-menu";

import { useAnalytics } from "./utils/analytics";

export function MainNav({
  navItems,
  className,
  ...props
}: {
  navItems: any[];
  className?: string;
}) {
  const { track } = useAnalytics();
  return (
    <nav
      className={cn("hidden items-center lg:flex xl:gap-2", className)}
      {...props}
    >
      {navItems.map((item, idx) => {
        if (item.href === "#" && item.children) {
          return (
            <NavigationMenu key={item.href}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex w-[404px] flex-col gap-1 p-4">
                      {item.children.map((component: any) => (
                        <NavListItem
                          onClick={() => {
                            track(
                              `Navbar - "${item.title}" > "${component.title}" Clicked`,
                            );
                          }}
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          type={component.type}
                          icon={component.icon}
                        >
                          {component.blurb}
                        </NavListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        }
        return (
          <Link
            href={item.href}
            key={`${item.href}-${idx}`}
            onClick={() => {
              track(`Navbar - "${item.title}" Clicked`);
            }}
            className={cn(
              "flex-shrink-0 whitespace-nowrap rounded-xs px-4 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

interface IconProps extends React.ComponentPropsWithoutRef<"a"> {
  icon?: any;
  onClick?: () => void;
}
export const NavListItem = forwardRef<React.ElementRef<"a">, IconProps>(
  ({ className, icon, title, type, children, onClick, ...props }, ref) => {
    return (
      <li onClick={onClick}>
        <NavigationMenuLink asChild>
          <a
            target={type === "external" ? "_blank" : "_self"}
            ref={ref}
            className={cn(
              "flex select-none items-center gap-2 rounded-xs p-1 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary",
              className,
            )}
            {...props}
          >
            {icon}
            <div>
              <div className="text-sm font-medium leading-5">{title}</div>
              <p className="line-clamp-2 text-sm leading-6 text-foreground">
                {children}
              </p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
NavListItem.displayName = "ListItem";
