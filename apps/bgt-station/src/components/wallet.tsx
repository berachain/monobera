"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useBeraJs } from "@bera/berajs";

const ConnectWalletDialog = dynamic(() => import("./connect-wallet-dialog"), {
  ssr: false,
});

const ConnectedWalletPopover = dynamic(
  () => import("./connected-wallet-popover"),
  { ssr: false },
);

export function Wallet() {
  const { isConnected } = useBeraJs();
  return (
    <div className="flex items-center">
      {!isConnected ? <ConnectWalletDialog /> : <ConnectedWalletPopover />}
    </div>
  );
}
