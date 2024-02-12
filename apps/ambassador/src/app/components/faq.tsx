import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";

export default function FAQ() {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 border-t bg-muted p-x-32 pb-32 pt-32">
      <h1 className="md:leading-14 leading-24 text-xl font-extrabold md:text-3xl">
        Frequently Asked Questions (FAQ)
      </h1>
      <Accordion type="single" collapsible className=" lg:w-[520px] md:w-[420px] sm:w-[360px] gap-4">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is an Ambassador?</AccordionTrigger>
          <AccordionContent className="lg:w-[520px] md:w-[420px] sm:w-[360px] pl-1 text-sm font-medium leading-tight text-muted-foreground">
            Ambassadors are the core mechanic of the bera army.
            They work in hand with the foundation to foster
            the Berachain community and actively participate 
            & host online and offline events around the world.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I join the Legion of Beras?</AccordionTrigger>
          <AccordionContent className="lg:w-[520px] md:w-[420px] sm:w-[360px] pl-1 text-sm font-medium leading-tight text-muted-foreground">
            Completing the application is the first step, however, 
            we strongly recommend learning / becoming an active member 
            of the ecosystem prior to applying.
            Once the application is complete we will review internally
            and reach out if we feel you are a great fit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Before applying, what's the best way to get involved?</AccordionTrigger>
          <AccordionContent className="lg:w-[520px] md:w-[420px] sm:w-[360px] pl-1 text-sm font-medium leading-tight text-muted-foreground">
            Bera community is based predominantly on twitter and discord.
            Spence Bera recommends joining the official Berachain discord
            & ecosystem projects discords to get involved.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
