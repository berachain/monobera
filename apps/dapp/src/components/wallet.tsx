"use client";

import ConnectWalletDialog from "./connect-wallet-dialog";
import ConnectedWalletPopover from "./conntected-wallet-popover";
import React from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import { LOCAL_STORAGE_KEYS } from "~/utils/constants";

export function Wallet() {
  const [walletAddress] = useLocalStorage<string | null>(
    LOCAL_STORAGE_KEYS.WALLET_ADDRESS,
    null
  );
  return (
    <div className="flex items-center">
      {!walletAddress ? <ConnectWalletDialog /> : <ConnectedWalletPopover />}
    </div>
  );
}
