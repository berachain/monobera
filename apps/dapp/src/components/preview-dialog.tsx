import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";

export default function PreviewDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Preview</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview swap</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <p>Effective price: 1 WETH = 0.2609 YFI</p>
            <div>
              <p>123 WETH</p>
              <p>$221,220</p>
            </div>
          </div>
          <div>
            <div>
              <p>123 YFI</p>
              <p>$215,220</p>
            </div>
          </div>
        </div>
        <div>
          <p>Swap from WETH details</p>
          <div>
            <p>123 WETH</p>
            <p>$221,220</p>
          </div>
        </div>
        <div>
          <div>
            <p>123 YFI</p>
            <p>$215,220</p>
          </div>
        </div>
        <Button type="submit">Approve Bera relayer</Button>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Swap route</AccordionTrigger>
            <AccordionContent>
              You&apos;re getting rugged. You&apos;re getting rugged.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
