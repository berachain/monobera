"use client";

import React, { useState } from "react";
import { useOct } from "@bera/berajs";
import { cn } from "@bera/ui";

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
  [BannerEnum.ON]: "Manage One-Click Trade Wallet",
  [BannerEnum.OFF]: "One Click Trade is disabled",
  [BannerEnum.LOW_BALANCE]: "Fund One-Click Trade Wallet",
  [BannerEnum.NOT_FUNDED]: "Fund One-Click Trade Wallet",
  [BannerEnum.NOT_GENERATED]: "Setup One-Click Trade Wallet",
  [BannerEnum.NOT_DELEGATED]:
    "Approve your One-Click Trade Wallet to submit transactions",
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

const OneClickSwitch = ({
  isOctEnabled,
  onClick,
}: {
  isOctEnabled: boolean;
  onClick: (mode: boolean) => void;
}) => {
  return (
    <div
      className="flex cursor-pointer gap-2 text-sm  font-semibold"
      onClick={() => onClick(true)}
    >
      <div className="flex items-center text-center text-[11px]">
        <div
          className={cn(
            "h-4 w-5 rounded-l-full bg-stone-800 ",
            isOctEnabled === true && "opacity-20",
          )}
        >
          <span className="-mt-1 block select-none">🐢</span>
        </div>
        <div
          className={cn(
            "h-4 w-5 rounded-r-full bg-stone-800 ",
            isOctEnabled === false && "opacity-20",
          )}
        >
          <span className="-mt-[2px] block select-none">⚡️</span>
        </div>
      </div>
    </div>
  );
};

export function OneClickBanner() {
  // const [on, setOn] = useState<boolean>(false);
  const [oneClickModalOpen, setOneClickModalOpen] = useState<boolean>(false);
  const [fundModalOpen, setFundModalOpen] = useState<boolean>(false);
  const [octGenerateModalOpen, setOctGenerateModalOpen] =
    useState<boolean>(false);
  const [octManageWalletModalOpen, setOctManageWalletModalOpen] =
    useState<boolean>(false);
  const {
    generateKey,
    isGenLoading,
    setOctEnabled,
    isOctEnabled: on,
    isOctGenerated,
    isOctUnfunded,
    isOctBalanceLow,
    isOctDelegated,
  } = useOct();

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
    } else if (
      status === BannerEnum.NOT_DELEGATED ||
      status == BannerEnum.LOW_BALANCE ||
      status == BannerEnum.NOT_FUNDED ||
      status == BannerEnum.ON
    ) {
      setOctManageWalletModalOpen(true);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full justify-end gap-2 border-y border-border px-4 py-2",
        getStatusColor(getStatus()),
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
      <div className="text-sm font-semibold" onClick={handleBannerClick}>
        <span className="cursor-pointer text-[10px] hover:underline sm:text-lg">
          {BannerText[getStatus()]}
        </span>
      </div>
      {/* @ts-ignore */}
      <OneClickSwitch
        isOctEnabled={on()}
        onClick={(mode: boolean) => setOneClickModalOpen(mode)}
      />
      <OneClickModal
        open={oneClickModalOpen}
        onOpenChange={setOneClickModalOpen}
        oneClick={on()}
        modeSelect={(mode: boolean) => setOctEnabled(mode)}
      />
      <ManageOctDialog
        open={octManageWalletModalOpen}
        onOpenChange={(open) => setOctManageWalletModalOpen(open)}
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
