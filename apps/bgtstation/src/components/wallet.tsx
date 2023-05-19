"use client";

import React from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS, type Wallet } from "~/utils/constants";
import ConnectWalletDialog from "./connect-wallet-dialog";
import ConnectedWalletPopover from "./conntected-wallet-popover";

export function Wallet() {
  const wallet = useReadLocalStorage<Wallet | null>(LOCAL_STORAGE_KEYS.WALLET);
  return (
    <div className="flex items-center">
      {!wallet?.address ? <ConnectWalletDialog /> : <ConnectedWalletPopover />}
    </div>
  );
}
