"use client";

import React, { useState } from "react";
import { useOct } from "@bera/berajs";
import { cn } from "@bera/ui";
import { useLocalStorage } from "usehooks-ts";

import { FundModal } from "./fund-modal";
import { ManageOctDialog } from "./manage-oct-dialog";
import { OctGenerateDialog } from "./oct-generate-dialog";
import { OneClickModal } from "./one-click-modal";

enum BannerEnum {
  ON = "on",
  OFF = "off",
  LOW_BALANCE = "low-balance",
  NOT_FUNDED = "not-funded",
  NOT_GENERATED = "not-generated",
  NOT_DELEGATED = "not-delegated",
}

const BannerText = {
  [BannerEnum.ON]: "⚡️ Manage One-Click Trade Wallet",
  [BannerEnum.OFF]: "⚡️ One Click Trade is disabled",
  [BannerEnum.LOW_BALANCE]: "⚡️ Fund One-Click Trade Wallet",
  [BannerEnum.NOT_FUNDED]: "⚡️ Fund One-Click Trade Wallet",
  [BannerEnum.NOT_GENERATED]: "⚡️ Setup One-Click Trade Wallet",
  [BannerEnum.NOT_DELEGATED]: "⚡️ Approve One-Click Trade Wallet",
};

const getStatusColor = (status: BannerEnum) => {
  switch (status) {
    case BannerEnum.OFF:
      return "bg-secondary text-secondary-foreground";
    case BannerEnum.ON:
      return "bg-success text-success-foreground";
    case BannerEnum.LOW_BALANCE:
      return "bg-destructive text-destructive-foreground";
    case BannerEnum.NOT_FUNDED:
      return "bg-destructive text-destructive-foreground";
    case BannerEnum.NOT_GENERATED:
      return "bg-secondary text-secondary-foreground";
    case BannerEnum.NOT_DELEGATED:
      return "bg-info text-info-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export function OneClickBanner({ className }: { className?: string }) {
  // const [on, setOn] = useState<boolean>(false);
  const [oneClickModalOpen, setOneClickModalOpen] = useState<boolean>(false);
  const [fundModalOpen, setFundModalOpen] = useState<boolean>(false);
  const [isFirstTimeOct, setIsFirstTimeOct] = useLocalStorage(
    "isFirstTimeOct",
    true,
  );

  const [octGenerateModalOpen, setOctGenerateModalOpen] =
    useState<boolean>(false);
  const [octManageWalletModalOpen, setOctManageWalletModalOpen] =
    useState<boolean>(false);

  const {
    generateKey,
    isGenLoading,
    setOctEnabled,
    isOctEnabled: on,
    isOctReady,
    isOctGenerated,
    isOctUnfunded,
    isOctBalanceLow,
    isOctDelegated,
  } = useOct();

  const handleOctManageWalletModalOpen = (open: boolean) => {
    setOctManageWalletModalOpen(open);
    if (isOctReady) {
      setIsFirstTimeOct(false);
    }
  };

  const getStatus = () => {
    let status;
    if (!on()) {
      status = BannerEnum.OFF;
    } else if (!isOctGenerated) {
      status = BannerEnum.NOT_GENERATED;
    } else if (!isOctDelegated) {
      status = BannerEnum.NOT_DELEGATED;
    } else if (isOctUnfunded) {
      status = BannerEnum.NOT_FUNDED;
    } else if (isOctBalanceLow) {
      status = BannerEnum.LOW_BALANCE;
    } else {
      status = BannerEnum.ON;
    }
    return status;
  };

  const handleBannerClick = () => {
    const status = getStatus();
    if (status === BannerEnum.NOT_GENERATED) {
      setOctGenerateModalOpen(true);
    } else if (status === BannerEnum.OFF) {
      setOneClickModalOpen(true);
    } else if (
      status === BannerEnum.NOT_DELEGATED ||
      status === BannerEnum.LOW_BALANCE ||
      status === BannerEnum.NOT_FUNDED ||
      status === BannerEnum.ON
    ) {
      setOctManageWalletModalOpen(true);
    }
  };

  return (
    <div
      className={cn(
        "flex h-[63px] w-[calc(100%-16px)] lg:w-[160px] flex-shrink-0 rounded-md border border-border m-2 lg:ml-0",
        getStatusColor(getStatus()),
        className,
      )}
    >
      {/* {getStatus() !== BannerEnum.OFF && (
        <div className="flex items-center gap-1 text-sm font-bold">
          {getStatus() === BannerEnum.ON ? (
            <Icons.wallet className="h-4 w-4" />
          ) : (
            <Icons.warning className="h-4 w-4" />
          )}
          {walletBalance} BERA |
        </div>
      )} */}
      {/* {getStatus() !== BannerEnum.OFF && (
        <div
          className="text-sm font-semibold"
          onClick={() => setFundModalOpen(true)}
        >
          <span className="cursor-pointer underline">Fund 1 click Wallet</span>{" "}
          |
        </div>
      )} */}
      <div className="h-full" onClick={handleBannerClick}>
        <span className="flex h-full text-[14px] cursor-pointer items-center p-3 hover:underline text-center">
          {BannerText[getStatus()]}
        </span>
      </div>
      {/* @ts-ignore */}
      <OneClickModal
        open={oneClickModalOpen}
        onOpenChange={setOneClickModalOpen}
        oneClick={on()}
        modeSelect={(mode: boolean) => setOctEnabled(mode)}
      />
      <ManageOctDialog
        open={octManageWalletModalOpen}
        // @ts-ignore
        isFirstTimeOct={isFirstTimeOct}
        onOpenChange={(open) => handleOctManageWalletModalOpen(open)}
      />
      <OctGenerateDialog
        open={octGenerateModalOpen}
        isLoading={isGenLoading}
        onOpenChange={(open) => setOctGenerateModalOpen(open)}
        onGenerate={() => {
          void generateKey().then(() => {
            setOctGenerateModalOpen(false);
            setOctManageWalletModalOpen(true);
          });
        }}
      />
      <FundModal open={fundModalOpen} onOpenChange={setFundModalOpen} />
    </div>
  );
}
