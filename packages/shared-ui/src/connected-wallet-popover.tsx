"use client";

import React from "react";
import { truncateHash, useBeraJs } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import { BGTStatusDetails } from "./bgt-status";
import { History } from "./history";
import Identicon from "./identicon";
import { Setting } from "./settings";
import { TokenList } from "./token-list";
import { WalletBalanceInUs } from "./wallet-balance-in-us";

export default function ConnectedWalletPopover({
  isHoney = false,
  isPopover = true,
}: {
  isHoney?: boolean;
  isPopover?: boolean;
}) {
  const [openPopover, setOpenPopover] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [setting, setSetting] = React.useState(false);
  const [tab, setTab] = React.useState("tokens");

  const { account } = useBeraJs();
  const { handleLogOut, walletConnector } = useDynamicContext();

  const Content = (
    <>
      {!setting ? (
        <>
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
                </p>
                <p className="text-xs font-medium leading-5 text-muted-foreground">
                  {walletConnector?.name}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setSetting(true)}
              >
                <Icons.settings className="h-4 w-4 text-muted-foreground" />
              </Button>

              <Button variant="ghost" size="xs" onClick={() => handleLogOut()}>
                <Icons.disconnect className="h-4 w-4 text-destructive-foreground" />
              </Button>
            </div>
          </div>
          <WalletBalanceInUs />
          <Tabs
            defaultValue="tokens"
            className="flex flex-1 flex-col gap-4 overflow-y-hidden"
          >
            <TabsList className="w-full" variant="ghost">
              <TabsTrigger
                value="tokens"
                className="flex-1"
                variant="ghost"
                onClick={() => setTab("tokens")}
              >
                Tokens
              </TabsTrigger>
              <TabsTrigger
                value="bgt"
                className="flex-1 sm:hidden"
                variant="ghost"
                onClick={() => setTab("bgt")}
              >
                BGT
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex-1"
                variant="ghost"
                onClick={() => setTab("history")}
              >
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="tokens"
              className="sm:flex-0 flex-1 overflow-y-auto sm:h-[400px]"
            >
              <TokenList />
            </TabsContent>
            <TabsContent
              value="bgt"
              className="flex-1 overflow-y-auto sm:hidden"
            >
              <BGTStatusDetails />
            </TabsContent>
            <TabsContent
              value="history"
              className="sm:flex-0 flex-1 overflow-y-auto sm:h-[400px]"
            >
              <History />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Setting goback={() => setSetting(false)} isHoney={isHoney} />
      )}
    </>
  );

  return (
    <div>
      <div className="hidden sm:block">
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
          <PopoverTrigger asChild>
            <Button
              className="flex w-fit flex-row items-center justify-center border-border bg-background text-sm font-medium leading-normal text-muted-foreground disabled:opacity-1"
              onClick={() => isPopover && setOpenPopover(true)}
              variant="outline"
              disabled={!isPopover}
            >
              <Identicon account={account ?? ""} className="mr-2 flex" />
              {truncateHash(account ?? "0x", 6)}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex h-[670px] w-[390px] flex-col gap-8 rounded-lg p-8"
            align="end"
          >
            {Content}
          </PopoverContent>
        </Popover>
      </div>
      <div className="block sm:hidden">
        <Button
          className="flex w-fit flex-row items-center justify-center border-border bg-background text-sm font-medium leading-normal text-muted-foreground disabled:opacity-1"
          onClick={() => isPopover && setOpenModal(true)}
          variant="outline"
          disabled={!isPopover}
        >
          <Identicon account={account ?? ""} className="mr-2 flex" />
          {truncateHash(account ?? "0x", 6)}
        </Button>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="flex h-[80vh] max-h-[734px] min-h-[456px] flex-col gap-8 p-8 pt-16 ">
            {Content}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
