"use client";

import React from "react";
import { truncateHash, useBeraConfig, useBeraJs } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { useReadLocalStorage } from "usehooks-ts";

import { formatConnectorName } from "~/utils/formatConnectorName";
import { History } from "./history";

export default function ConnectedWalletPopover() {
  const [open, setOpen] = React.useState(false);
  const { account, logout } = useBeraJs();
  const connectorName = useReadLocalStorage<string>("wagmi.wallet");

  const { networkConfig } = useBeraConfig();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-48"
          onClick={() => setOpen(true)}
          variant="outline"
        >
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage src="https://github.com/wallet.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          {truncateHash(account ?? "0x", 6)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold leading-none">Account</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout(connectorName as string);
              setOpen(false);
            }}
          >
            <Icons.disconnect className="h-5 w-5 text-destructive" />
          </Button>
        </div>
        <div className="flex items-center py-4">
          <Avatar className="mr-2 h-10 w-10">
            <AvatarImage src="https://github.com/wallet.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="flex items-center text-lg font-semibold leading-none">
              {truncateHash(account ?? "0x", 6)}
              <Button variant="ghost" size="sm" className="ml-2 rounded-full">
                <Icons.copy className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  window.open(
                    `http://${networkConfig.chain.blockExplorers?.default.url}/address/${account}`,
                    "_blank",
                  );
                }}
              >
                <Icons.external className="h-3 w-3" />
              </Button>
            </p>
            <p className="text-sm leading-none ">
              {formatConnectorName(connectorName as string)}
            </p>
          </div>
        </div>
        <History />
        {/* <SwapSettings /> */}
      </PopoverContent>
    </Popover>
  );
}
