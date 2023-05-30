"use client";

import React, { useEffect } from "react";
import { useBeraJs } from "@bera/berajs";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { useReadLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";
import { formatConnectorName } from "~/utils/formatConnectorName";
import { truncateWalletAddress } from "~/utils/truncateWalletAddress";
import SwapSettings from "./swap-settings";

export default function ConnectedWalletPopover() {
  const [open, setOpen] = React.useState(false);
  const { account, logout } = useBeraJs();
  const connectorName = useReadLocalStorage<string>(
    LOCAL_STORAGE_KEYS.CONNECTOR_ID,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="w-48"
          onClick={() => setOpen(true)}
          variant="secondary"
        >
          <Avatar className="mr-2 h-6 w-6">
            <AvatarImage src="https://github.com/wallet.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          {truncateWalletAddress(account ?? "")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold leading-none">Account</h3>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              logout(connectorName as string);
              setOpen(false);
            }}
          >
            Disconnect
          </Button>
        </div>
        <div className="flex items-center py-4">
          <Avatar className="mr-2 h-10 w-10">
            <AvatarImage src="https://github.com/wallet.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="flex items-center text-lg font-semibold leading-none">
              {truncateWalletAddress(account ?? "")}
              <Button variant="ghost" size="sm" className="ml-2 rounded-full">
                <Icons.copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Icons.external className="h-3 w-3" />
              </Button>
            </p>
            <p className="text-sm leading-none ">
              {formatConnectorName(connectorName as string)}
            </p>
          </div>
        </div>
        <SwapSettings />
      </PopoverContent>
    </Popover>
  );
}
