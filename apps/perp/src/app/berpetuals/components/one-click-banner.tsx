"use client";

import React, { useState } from "react";
import { useOct } from "@bera/berajs";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { FundModal } from "./fund-modal";
import { OneClickModal } from "./one-click-modal";
import { TEST_ABI } from "./temp-abi";

enum BannerEnum {
  ON = "on",
  OFF = "off",
  LOW_BALANCE = "low-balance",
  NOT_GENERATED = 'not-generated',
  NOT_DELEGATED = 'not-delegated'
}

const getStatusColor = (status: BannerEnum) => {
  switch (status) {
    case BannerEnum.OFF:
      return "bg-secondary text-secondary-foreground";
    case BannerEnum.ON:
      return "bg-warning text-warning-foreground";
    case BannerEnum.LOW_BALANCE:
      return "bg-destructive text-destructive-foreground";
    case BannerEnum.NOT_GENERATED:
      return "bg-destructive text-destructive-foreground";
    case BannerEnum.NOT_DELEGATED:
        return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const OneClickSwitch = ({ on, ...props }: { on: boolean }) => {
  return (
    <div
      className="flex cursor-pointer gap-2 text-sm  font-semibold"
      {...props}
    >
      {on ? "Disable" : "Enable One Click Trade"}
      <div className="flex items-center text-center text-[10px]">
        <div
          className={cn(
            "h-4 w-5 rounded-l-full bg-primary",
            on && "opacity-20",
          )}
        >
          <span className="-mt-1 block">🐢</span>
        </div>
        <div
          className={cn(
            "h-4 w-5 rounded-r-full bg-primary",
            !on && "opacity-20",
          )}
        >
          <span className="-mt-[2px] block">⚡</span>
        </div>
      </div>
    </div>
  );
};

export function OneClickBanner() {
  // const [on, setOn] = useState<boolean>(false);
  const walletBalance = 0.5;
  const [oneClickModalOpen, setOneClickModalOpen] = useState<boolean>(false);
  const [fundModalOpen, setFundModalOpen] = useState<boolean>(false);
  const { generateKey, setOctEnabled, isOctEnabled: on, isOctGenerated, isOctDelegated } = useOct();
  const { write, ModalPortal } = useOctTxn();

    const getStatus= () => {
      let status;

      if (!on()) {
        status = BannerEnum.OFF;
      } else if(on() && !isOctGenerated) {
        status = BannerEnum.NOT_GENERATED
      }else if(on() && !isOctDelegated) {
        status = BannerEnum.NOT_DELEGATED
      } else if (walletBalance < 1) {
        status = BannerEnum.LOW_BALANCE;
      } else {
        status = BannerEnum.ON;
      }
      return status
    }
  return (
    <div
      className={cn(
        "flex w-full justify-end gap-2 border-y border-border px-4 py-2",
        getStatusColor(getStatus()),
      )}
    >
      {ModalPortal}
      {getStatus() !== BannerEnum.OFF && (
        <div className="flex items-center gap-1 text-sm font-bold">
          {getStatus() === BannerEnum.ON ? (
            <Icons.wallet className="h-4 w-4" />
          ) : (
            <Icons.warning className="h-4 w-4" />
          )}
          {walletBalance} BERA |
        </div>
      )}
      <Button onClick={() => generateKey()}>gen</Button>
      <Button
        onClick={() =>
          write({
            address: "0x7Facd722004970C8e709C486AB5eB711b279d8bB",
            abi: TEST_ABI,
            functionName: "doSomething",
            params: [],
          })
        }
      >
        DEEEEZ
      </Button>

      {getStatus() !== BannerEnum.OFF && (
        <div
          className="text-sm font-semibold"
          onClick={() => setFundModalOpen(true)}
        >
          <span className="cursor-pointer underline">Fund 1 click Wallet</span>{" "}
          |
        </div>
      )}
      {/* @ts-ignore */}
      <OneClickSwitch on={on()} onClick={() => setOneClickModalOpen(true)} />
      <OneClickModal
        open={oneClickModalOpen}
        onOpenChange={setOneClickModalOpen}
        oneClick={on()}
        modeSelect={(mode: boolean) => setOctEnabled(mode)}
      />
      <FundModal open={fundModalOpen} onOpenChange={setFundModalOpen} />
    </div>
  );
}
