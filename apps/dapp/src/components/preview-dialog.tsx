import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useToast } from "@bera/ui/use-toast";
import { useReadLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";
import { type Token } from "~/assets/tokens";

type Props = {
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
};

export default function PreviewDialog({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
}: Props) {
  const slippage = useReadLocalStorage<number>(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE,
  );
  const [open, setOpen] = React.useState(false);
  const [approved, setApproved] = React.useState(false);
  const { toast } = useToast();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          disabled={fromAmount === 0 && toAmount === 0}
          onClick={() => setOpen(true)}
        >
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview swap</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card className="border border-border">
            <CardHeader className="rounded-t-lg border-b border-y-border p-3 text-sm text-primary-foreground">
              Effective price: 1 {fromToken.symbol} = 0.5 {toToken.symbol}
            </CardHeader>
            <CardContent className="border-border p-3">
              <div className="relative -mx-3 grid grid-cols-1 divide-y divide-border">
                <div className="flex items-center justify-start gap-2 px-3 pb-3">
                  <Image
                    width={36}
                    height={36}
                    src={fromToken.logoURI}
                    alt={fromToken.name}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {fromAmount} {fromToken.symbol}
                    </span>
                    <span className="text-xs font-medium text-backgroundSecondary">
                      $420,69.42
                    </span>
                  </div>
                </div>
                <div className="absolute right-4 top-[calc(50%-16px)] border-none bg-card">
                  <Icons.arrowDown className="h-8 w-8 rounded-full border border-border bg-card p-1" />
                </div>
                <div className="flex items-center justify-start gap-2 px-3 pt-3">
                  <Image
                    width={36}
                    height={36}
                    src={toToken.logoURI}
                    alt={toToken.name}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {toAmount} {toToken.symbol}
                    </span>
                    <span className="text-xs font-medium text-backgroundSecondary">
                      $69,420.69
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="border border-border">
            <Tabs defaultValue="tokens" className="">
              <CardHeader className="flex flex-row items-center justify-between rounded-t-lg border-b border-y-border p-3 text-base font-medium text-primary-foreground">
                Swap from ETH details
                <TabsList className="p-0">
                  <TabsTrigger value="tokens">Tokens</TabsTrigger>
                  <TabsTrigger value="usd">USD</TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="border-border px-3 pb-4 pt-1">
                <TabsContent value="tokens">
                  <p className="flex justify-between text-sm font-medium text-primary-foreground">
                    Total expected after fees
                    <span className="text-right">420.69 {toToken.symbol}</span>
                  </p>
                  <p className="flex justify-between text-sm text-primary-foreground">
                    The least you’ll get at {slippage}% slippage
                    <span className="text-right">420.69 {toToken.symbol}</span>
                  </p>
                </TabsContent>
                <TabsContent value="usd">
                  <p className="flex justify-between text-sm font-medium text-primary-foreground">
                    Total expected after fees
                    <span className="text-right">$420.69 USD</span>
                  </p>
                  <p className="flex justify-between text-sm text-primary-foreground">
                    The least you’ll get at {slippage}% slippage
                    <span className="text-right">$420.69 USD</span>
                  </p>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
        <Button
          onClick={() => {
            if (!approved) {
              setApproved(true);
            } else {
              toast({
                title: "Congratulations",
                description: "You played yourself",
                duration: 2000,
              });
              setOpen(false);
            }
          }}
        >
          {approved ? "Confirm" : "Approve"} swap
        </Button>
        <Accordion
          type="single"
          collapsible
          className="rounded-lg border border-primary"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="p-4 text-primary-foreground">
              Swap route
            </AccordionTrigger>
            <AccordionContent className="px-4">
              You&apos;re getting rugged. You&apos;re getting rugged.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
