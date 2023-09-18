"use client";

import React, { useState } from "react";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

import { FundModal } from "./fund-modal";
import { OneClickModal } from "./one-click-modal";

enum BannerEnuem {
  ON = "on",
  OFF = "off",
  LOW_BALANCE = "low-balance",
}

const getStatusColor = (status: BannerEnuem) => {
  switch (status) {
    case BannerEnuem.OFF:
      return "bg-secondary text-secondary-foreground";
    case BannerEnuem.ON:
      return "bg-warning text-warning-foreground";
    case BannerEnuem.LOW_BALANCE:
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const OneClickSiwtch = ({ on, ...props }: { on: boolean }) => {
  return (
    <div
      className="flex cursor-pointer gap-2 text-sm  font-semibold"
      {...props}
    >
      <div className="flex items-center text-center text-xs">
        <div
          className={cn(
            "h-4 w-5 rounded-l-full bg-primary",
            on && "opacity-20",
          )}
        >
          🐢
        </div>
        <div
          className={cn(
            "h-4 w-5 rounded-r-full bg-primary",
            !on && "opacity-20",
          )}
        >
          ⚡
        </div>
      </div>
      {on ? "Disable" : "Enable One Click Trade"}
    </div>
  );
};

export function OneClickBanner() {
  const [on, setOn] = useState<boolean>(false);
  const walletBalance = 0.5;
  const status = !on
    ? BannerEnuem.OFF
    : walletBalance < 1
    ? BannerEnuem.LOW_BALANCE
    : BannerEnuem.ON;
  const [oneClickModalOpen, setOneClickModalOpen] = useState<boolean>(false);
  const [fundModalOpen, setFundModalOpen] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "flex w-full justify-end gap-2 px-4 py-2",
        getStatusColor(status),
      )}
    >
      {status !== BannerEnuem.OFF && (
        <div className="flex items-center gap-1 text-sm font-bold">
          {status === BannerEnuem.ON ? (
            <Icons.wallet className="h-4 w-4" />
          ) : (
            <Icons.warning className="h-4 w-4" />
          )}
          {walletBalance} BERA |
        </div>
      )}
      {status !== BannerEnuem.OFF && (
        <div className="text-sm font-semibold" onClick={()=>setFundModalOpen(true)}>
          <span className="cursor-pointer underline">Fund 1 click Wallet</span>{" "}
          |
        </div>
      )}
      {/* @ts-ignore */}
      <OneClickSiwtch on={on} onClick={() => setOneClickModalOpen(true)} />
      <OneClickModal
        open={oneClickModalOpen}
        onOpenChange={setOneClickModalOpen}
        oneClick={on}
        modeSelect={(mode: boolean) => setOn(mode)}
      />
      <FundModal open={fundModalOpen} onOpenChange={setFundModalOpen} />
    </div>
  );
}
