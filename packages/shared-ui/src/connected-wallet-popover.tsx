"use client";

import React from "react";
import { truncateHash, useBeraJs } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { useReadLocalStorage } from "usehooks-ts";

import { History } from "./history";
import { formatConnectorName } from "./utils";

export default function ConnectedWalletPopover() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const { account, logout } = useBeraJs();
  const connectorName = useReadLocalStorage<string>("wagmi.wallet");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-48 text-sm font-medium leading-normal"
          onClick={() => setOpen(true)}
          variant="outline"
        >
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          {truncateHash(account ?? "0x", 6)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold leading-none">Account</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout(connectorName as string);
              setOpen(false);
            }}
          >
            <Icons.disconnect className="h-4 w-4 text-destructive-foreground" />
          </Button>
        </div>
        <div className="flex items-center pb-4">
          <Avatar className="mr-2 h-12 w-12">
            <AvatarImage src="https://github.com/wallet.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="flex items-center text-sm font-medium leading-normal">
              {truncateHash(account ?? "0x", 6)}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 rounded-full"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(account ?? "0x");
                    setCopied(true);
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setTimeout(() => setCopied(false), 1000);
                  }
                }}
              >
                {copied ? (
                  <Icons.check className="h-3 w-3 text-positive" />
                ) : (
                  <Icons.copy className="h-3 w-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${account}`,
                    "_blank",
                  );
                }}
              >
                <Icons.external className="h-3 w-3" />
              </Button>
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              {formatConnectorName(connectorName as string)}
            </p>
          </div>
        </div>
        <History />
      </PopoverContent>
    </Popover>
  );
}
