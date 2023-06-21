"use client";

import React from "react";
import { useBeraJs } from "@bera/berajs";
import { ConnectorNames } from "@bera/berajs/src/config";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { useLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";

type ConnectorAssetsType = Partial<
  Record<ConnectorNames, { icon: React.ReactElement; name: string }>
>;

const ConnectorAssets: ConnectorAssetsType = {
  [ConnectorNames.Injected]: {
    icon: <Icons.metamask height="50px" width="50px" />,
    name: "Metamask",
  },
  // [ConnectorNames.Coinbase]: {
  //   icon: <Icons.coinbase height="50px" width="50px" />,
  //   name: "Coinbase",
  // },

  // [ConnectorNames.WalletConnect]: {
  //   icon: <Icons.walletConnect height="50px" width="50px" />,
  //   name: "WalletConnect",
  // },
  // [ConnectorNames.Keplr]: {
  //   icon: <Icons.keplr height="50px" width="50px" />,
  //   name: "Keplr",
  // },
};

type Props = {
  className?: string;
};
export default function ConnectWalletDialog({ className }: Props) {
  const [open, setOpen] = React.useState(false);
  const [, setConnectorId] = useLocalStorage(
    LOCAL_STORAGE_KEYS.CONNECTOR_ID,
    "",
  );
  const { login } = useBeraJs();

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn("w-48", className)}
        variant="secondary"
      >
        <Icons.wallet className="mr-2 h-6 w-6" />
        Connect
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to Web3</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {Object.values(ConnectorNames).map((connectorName) => (
              <Button
                key={connectorName}
                variant="ghost"
                className="flex justify-start"
                onClick={() => {
                  setConnectorId(connectorName);
                  login(connectorName)
                    .then(() => setOpen(false))
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              >
                <span>{ConnectorAssets[connectorName]?.icon}</span>
                <span>{ConnectorAssets[connectorName]?.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
