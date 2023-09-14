import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "hidden items-center space-x-4 lg:flex lg:space-x-2",
        className,
      )}
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
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {item.children.map((component: any) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                          type={component.type}
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
            href={{ pathname: item.href }}
            key={`${item.href}-${idx}`}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              item.href === pathname && "text-primary",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, type, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          target={type === "external" ? "_blank" : "_self"}
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
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
