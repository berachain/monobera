import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";

export default function FAQ() {
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center gap-4">
      <h1 className="md:leading-14 leading-24 text-xl font-extrabold md:text-3xl">
        Frequently Asked Questions (FAQ)
      </h1>
      <Accordion type="single" collapsible className="w-[585px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Header</AccordionTrigger>
          <AccordionContent className="max-w-[585px] pl-10 text-xs font-medium leading-tight text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dignissim turpis ac risus convallis commodo. Aenean vitae varius
            ipsum. Fusce mauris nisl, pretium eu urna vulputate, rhoncus
            vulputate nisi. Suspendisse ornare viverra dui. Morbi risus neque,
            aliquam ut dui molestie, lacinia sagittis dolor.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Header</AccordionTrigger>
          <AccordionContent className="max-w-[585px] pl-10 text-xs font-medium leading-tight text-muted-foreground">
            Teste
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Header</AccordionTrigger>
          <AccordionContent className="max-w-[585px] pl-10 text-xs font-medium leading-tight text-muted-foreground">
            Teste
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Header</AccordionTrigger>
          <AccordionContent className="max-w-[585px] pl-10 text-xs font-medium leading-tight text-muted-foreground">
            Teste
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
