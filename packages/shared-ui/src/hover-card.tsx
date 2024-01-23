import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

interface HoverStateProps {
  triggerElement: React.ReactNode; // The element that triggers the hover card
  content: React.ReactNode; // The content of the hover card
}

const HoverCardRoot = HoverCardPrimitive.Root;
const HoverCardPortal = HoverCardPrimitive.Portal;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = HoverCardPrimitive.Content;

export const HoverCard = ({ triggerElement, content }: HoverStateProps) => {
  return (
    // Using a hover card portal so that we can render children into a DOM node that exists outside the DOM hierarchy of the parent component
    <HoverCardRoot>
      <HoverCardTrigger asChild>{triggerElement}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent className="absolute bottom-full w-max rounded-sm text-sm text-white shadow-lg">
          <div className="flex flex-col items-start gap-2 rounded-sm border bg-background p-4">
            {content}
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCardRoot>
  );
};
