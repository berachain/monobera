"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils/cn";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: "compact" | "ghost" | "outline";
  }
>(({ className, variant, ...props }, ref) => {
  const baseStyles =
    "inline-flex h-10 items-center justify-center rounded-md text-muted-foreground";

  const variantStyles = {
    ghost: "gap-1 bg-transparent p-1",
    compact: "gap-1 bg-muted p-1",
    outline: "h-full  border border-border",
  };

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(baseStyles, variant ? variantStyles[variant] : variantStyles["compact"], className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: "compact" | "ghost" | "outline";
  }
>(({ className, variant, ...props }, ref) => {
  const baseStyles =
    "inline-flex h-[30px] items-center justify-center whitespace-nowrap rounded-sm px-2 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    ghost:
      "data-[state=active]:bg-secondary data-[state=active]:text-foreground",
    compact:
      "data-[state=active]:bg-primary data-[state=active]:text-background",
    outline: "data-[state=active]:bg-white data-[state=active]:text-background",
  };

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(baseStyles, variant ? variantStyles[variant] : variantStyles["compact"], className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
