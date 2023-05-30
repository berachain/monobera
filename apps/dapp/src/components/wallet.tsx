"use client";

import React from "react";
import { useBeraJs } from "@bera/berajs";

import ConnectWalletDialog from "./connect-wallet-dialog";
import ConnectedWalletPopover from "./connected-wallet-popover";

export function Wallet() {
  const { isConnected } = useBeraJs();
  return (
    <div className="flex items-center">
      {!isConnected ? <ConnectWalletDialog /> : <ConnectedWalletPopover />}
    </div>
  );
}
