import React from "react";
import {
  HoverCard as BeraHoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@bera/ui/hover-card";

interface HoverStateProps {
  triggerElement: React.ReactNode; // The element that triggers the hover card
  content: React.ReactNode; // The content of the hover card
}

export const HoverCard = ({ triggerElement, content }: HoverStateProps) => {
  return (
    // Using a hover card portal so that we can render children into a DOM node that exists outside the DOM hierarchy of the parent component
    <BeraHoverCard>
      <HoverCardTrigger asChild>{triggerElement}</HoverCardTrigger>
      <HoverCardContent className="absolute bottom-full w-max rounded-sm text-sm text-white shadow-lg">
        <div className="flex flex-col items-start gap-2 rounded-sm bg-background p-2">
          {content}
        </div>
      </HoverCardContent>
    </BeraHoverCard>
  );
};
