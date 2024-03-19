import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";

export default function FAQ() {
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4 border-t bg-muted p-16 md:p-32">
      <div className="relative">
        <h1 className="leading-14 leading-24 text-3xl font-extrabold">
          Frequently Asked Questions (FAQ)
        </h1>
        <Accordion
          type="single"
          collapsible
          className="w-full gap-4 lg:w-[520px]"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              What is an Ambassador?
            </AccordionTrigger>
            <AccordionContent className="w-full text-sm font-medium leading-tight text-muted-foreground md:w-[420px] lg:w-[520px]">
              Ambassadors are the core mechanic of the bera army. They work in
              hand with the foundation to foster the Berachain community and
              actively participate & host online and offline events around the
              world.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              How do I join the Legion of Beras?
            </AccordionTrigger>
            <AccordionContent className="w-full text-sm font-medium leading-tight text-muted-foreground md:w-[420px] lg:w-[520px]">
              Completing the application is the first step, however, we strongly
              recommend learning / becoming an active member of the ecosystem
              prior to applying. Once the application is complete we will review
              internally and reach out if we feel you are a great fit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              Before applying, what's the best way to get involved?
            </AccordionTrigger>
            <AccordionContent className="w-full text-sm font-medium leading-tight text-muted-foreground md:w-[420px] lg:w-[520px]">
              Bera community is based predominantly on twitter and discord.
              Spence Bera recommends joining the official Berachain discord &
              ecosystem projects discords to get involved.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
