import SwapSettings from "./swap-settings";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@bera/ui/popover";
import React from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS, WALLET_ADDRESS } from "~/utils/constants";
import { truncateWalletAddress } from "~/utils/truncateWalletAddress";

export default function ConnectedWalletPopover() {
  const [open, setOpen] = React.useState(false);
  const [, setWalletAddress] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEYS.WALLET_ADDRESS,
    null
  );
  const [walletNetwork] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEYS.WALLET_NETWORK,
    null
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"secondary"}
          className="w-48"
          onClick={() => setOpen(true)}
        >
          <Avatar className="w-6 h-6 mr-2">
            <AvatarImage src="https://github.com/wallet.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          {truncateWalletAddress(WALLET_ADDRESS)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold leading-none">Account</h3>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setWalletAddress(null);
              setOpen(false);
            }}
          >
            Disconnect
          </Button>
        </div>
        <div className="flex py-4 items-center">
          <Avatar className="w-10 h-10 mr-2">
            <AvatarImage src="https://github.com/wallet.png" />
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-lg font-semibold leading-none flex items-center">
              {truncateWalletAddress(WALLET_ADDRESS)}
              <Button variant="ghost" size="sm" className="ml-2 rounded-full">
                <Icons.copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Icons.external className="w-3 h-3" />
              </Button>
            </p>
            <p className="text-sm text-gray-500 leading-none">
              {walletNetwork}
            </p>
          </div>
        </div>
        <SwapSettings />
      </PopoverContent>
    </Popover>
  );
}
