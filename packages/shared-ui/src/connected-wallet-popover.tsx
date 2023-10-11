"use client";

import React from "react";
import { truncateHash, useBeraJs } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { useReadLocalStorage } from "usehooks-ts";

import { History } from "./history";
import Identicon from "./identicon";
import { formatConnectorName } from "./utils";
import { WalletBalanceInUs } from "./wallet-balance-in-us";

export default function ConnectedWalletPopover() {
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const { account, logout } = useBeraJs();
  const connectorName = useReadLocalStorage<string>("wagmi.wallet");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className="flex w-fit flex-row items-center justify-center border-border bg-background text-sm font-medium leading-normal text-muted-foreground"
          onClick={() => setOpen(true)}
          variant="outline"
        >
          <Identicon account={account ?? ""} className="mr-2 flex" />
          {truncateHash(account ?? "0x", 6)}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[390px] flex-col gap-8 rounded-lg p-8"
        align="end"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <Identicon
              account={account ?? ""}
              className="mr-2 flex"
              size={48}
            />
            <div className="flex flex-col">
              <p className="flex items-center font-medium leading-6">
                {truncateHash(account ?? "0x", 6)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-1 rounded-full"
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
                    <Icons.check className="h-4 w-4 text-positive" />
                  ) : (
                    <Icons.copy className="h-4 w-4" />
                  )}
                </Button>
                {/* <Button
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
              </Button> */}
              </p>
              <p className="text-xs font-medium leading-5 text-muted-foreground">
                {formatConnectorName(connectorName as string)}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="xs"
              // onClick={() => {}}
            >
              <Icons.settings className="h-4 w-4 text-muted-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                logout(connectorName as string);
                setOpen(false);
              }}
            >
              <Icons.disconnect className="h-4 w-4 text-destructive-foreground" />
            </Button>
          </div>
        </div>
        <WalletBalanceInUs />
        <History />
      </PopoverContent>
    </Popover>
  );
}
