import React from "react";
import Image from "next/image";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import { LOCAL_STORAGE_KEYS, WALLET_ADDRESS } from "~/utils/constants";
import { wallets } from "~/assets/wallets";
import useLocalStorage from "~/hooks/useLocalStorage";

export default function ConnectWalletDialog() {
  const [open, setOpen] = React.useState(false);
  const [, setWalletAddress] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEYS.WALLET_ADDRESS,
    null,
  );
  const [, setWaletNetwork] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEYS.WALLET_NETWORK,
    null,
  );
  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-48">
        <Icons.wallet className="mr-2 h-6 w-6" />
        Connect wallet
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to a wallet</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {wallets.map((wallet) => (
              <Button
                key={wallet.name}
                variant="ghost"
                className="flex justify-start"
                onClick={() => {
                  setWalletAddress(WALLET_ADDRESS);
                  setWaletNetwork(wallet.name);
                  setOpen(false);
                }}
              >
                <Image
                  src={wallet.icon}
                  width={24}
                  height={24}
                  alt={wallet.name}
                  className="mr-2 h-6 w-6"
                />
                <span>{wallet.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
