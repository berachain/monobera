"use client";

import React from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";
import ConnectWalletDialog from "./connect-wallet-dialog";
import ConnectedWalletPopover from "./conntected-wallet-popover";

export function Wallet() {
  const walletAddress = useReadLocalStorage<string | null>(
    LOCAL_STORAGE_KEYS.WALLET_ADDRESS,
  );
  return (
    <div className="flex items-center">
      {!walletAddress ? <ConnectWalletDialog /> : <ConnectedWalletPopover />}
    </div>
  );
}
