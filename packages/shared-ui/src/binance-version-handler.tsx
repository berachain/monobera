"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@bera/ui/dialog";

function compareVersions(
  currentVersion: string,
  requiredVersion: string,
): boolean {
  const currentVersionParts = currentVersion.split(".").map(Number);
  const requiredVersionParts = requiredVersion.split(".").map(Number);

  for (
    let i = 0;
    i < Math.max(currentVersionParts.length, requiredVersionParts.length);
    i++
  ) {
    const partcurrentVersion = currentVersionParts[i] || 0;
    const partrequiredVersion = requiredVersionParts[i] || 0;

    if (partcurrentVersion < partrequiredVersion) {
      return true;
    }
  }
  return false;
}

declare global {
  interface Window {
    bnVersion?: any;
  }
}

export const BinanceVersionHandler = () => {
  const [version, setVersion] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window?.bnVersion) {
      setVersion(String(window.bnVersion));
      if (
        compareVersions(
          String(window.bnVersion),
          process.env.NEXT_PUBLIC_BINANCE_VERSION || "0",
        )
      )
        setOpen(true);
    }
  }, []);

  return (
    <>
      {version && (
        <div className="fixed bottom-1 left-2 text-sm">
          Binance Version: {version}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="text-lg font-bold">Please update your Binance!!</div>
          <div>
            Joining this campaign requires your Binance app version to be{" "}
            <b>{process.env.NEXT_PUBLIC_BINANCE_VERSION}</b> or above. Lower
            versions will not be able to connect to Berachain bArtio testnet and
            complete tasks.
            <br /> <br />
            Your current version is <b>{version}</b>.
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
