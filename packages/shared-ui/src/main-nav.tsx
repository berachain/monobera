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

export function MainNav({
  navItems,
  className,
  ...props
}: {
  navItems: any[];
  className?: string;
}) {
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
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          type={component.type}
                          icon={component.icon}
                        >
                          {component.blurb}
                        </ListItem>
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
            className={cn(
              "flex-shrink-0 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
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
}
const ListItem = forwardRef<React.ElementRef<"a">, IconProps>(
  ({ className, icon, title, type, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            target={type === "external" ? "_blank" : "_self"}
            ref={ref}
            className={cn(
              "flex select-none items-center gap-2 rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-primary focus:bg-muted focus:text-primary",
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
ListItem.displayName = "ListItem";
