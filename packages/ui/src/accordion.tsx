"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "./utils/cn";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    variant?: "default" | "outlined";
  }
>(({ className, value, variant = "default", ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "group/accordionItem",
      "variant-" + variant,
      variant === "outlined" && ["rounded-sm border border-border p-4"],
      className,
    )}
    value={value}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    decorator?: React.ReactNode;
  } & {
    variant?: "default" | "outlined";
  }
>(
  (
    { className, children, disabled, decorator, variant = "default", ...props },
    ref,
  ) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between gap-1 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
          variant === "outlined" && "text-sm text-muted-foreground",
          variant === "default" && "py-4",
          className,
        )}
        {...props}
      >
        <span>{children}</span>

        <hr className="grow border-b-[0.5px] border-border group-[.variant-default]/accordionItem:hidden" />

        {!disabled && (
          <div className="flex flex-row items-center justify-center gap-1">
            {decorator}
            <ChevronDown className="h-4 w-4 transition-transform duration-200" />
          </div>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="group-[.variant-default]/accordionItem:pb-4 group-[.variant-default]/accordionItem:pt-0">
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
