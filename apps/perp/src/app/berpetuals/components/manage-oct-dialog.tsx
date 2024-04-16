"use client";

import { useState } from "react";
import {
  TRADING_ABI,
  TransactionActionType,
  truncateHash,
  useBeraJs,
  useOct,
  usePollBeraBalance,
} from "@bera/berajs";
import {
  blockExplorerUrl,
  nativeTokenAddress,
  tradingContractAddress,
} from "@bera/config";
import { ActionButton, TokenIcon, useTxn } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import Identicon from "@bera/shared-ui/src/identicon";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { beraJsConfig } from "@bera/wagmi";
import { parseUnits } from "ethers";
import { parseEther, type Address } from "viem";

const TradeWalletSection = () => {
  const { octPrivKey, octAddress, octBalance, octTxCount } = useOct({
    config: beraJsConfig,
  });
  const [copied, setCopied] = useState(false);
  const { account } = useBeraJs();

  const { isValueSendLoading, writeValueSend } = useOctTxn({
    message: "Withdrawing All From One Click Trading Wallet",
  });

  const isBalanceLessThanThreshold = Number(octBalance ?? 0) < 0.1;
  return (
    <div className={"relative rounded-md border border-border p-3"}>
      <p className="text-md pb-4 font-bold leading-normal">
        Your 1-Click Trade Wallet
      </p>
      <div className="mt-2 flex flex-row gap-2">
        <Identicon account={octAddress} size={24} />
        <div
          className="text-sm font-semibold hover:underline"
          onClick={() =>
            window.open(`${blockExplorerUrl}/address/${octAddress}`, "_blank")
          }
        >
          {truncateHash(octAddress)}
        </div>
        <Icons.external className="h-4 w-4" />
      </div>
      <div className="mt-2 flex flex-row gap-2">
        <TokenIcon address={nativeTokenAddress} />
        <div className="text-sm font-semibold">
          {Number(octBalance ?? 0).toFixed(2)} BERA{" "}
          <span className="text-xs font-medium text-success-foreground">
            ~ {octTxCount} txns
          </span>
        </div>
      </div>
      <div className="mt-3 flex flex-row gap-2">
        <Button
          size={"sm"}
          className="w-full"
          variant={"secondary"}
          disabled={isValueSendLoading || isBalanceLessThanThreshold}
          onClick={() => {
            writeValueSend({
              address: account as Address,
              value:
                parseUnits(octBalance.toString(), 18) -
                parseEther(`${Number(0.1)}`),
            });
          }}
        >
          Withdraw All
        </Button>
        <Button
          size={"sm"}
          className="w-full"
          variant={"secondary"}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(octPrivKey);
              setCopied(true);
            } catch (error) {
              console.error(error);
            } finally {
              setTimeout(() => setCopied(false), 1000);
            }
          }}
        >
          {copied ? (
            <Icons.check className="h-4 w-4 text-positive" />
          ) : (
            <span>Copy Private Key</span>
          )}
        </Button>
      </div>
    </div>
  );
};

const FundAccountSection = ({
  fundAmount,
  setFundAmount,
  isReady,
  userBalance,
  isFundingLoading,
  fundWrite,
  octAddress,
  setShowFundSection,
}: {
  fundAmount: string | undefined;
  setFundAmount: (value: string | undefined) => void;
  isReady: boolean | undefined;
  userBalance: string;
  isFundingLoading: boolean;
  fundWrite: (args: { address: Address; value: bigint }) => void;
  octAddress: string;
  setShowFundSection: (value: boolean) => void;
}) => {
  return (
    <div className={"relative rounded-md border border-border p-3"}>
      <div className={"items-centre flex justify-between pb-4"}>
        <p className="text-md font-bold leading-normal">
          Fund Your One-Click Account
        </p>
        <Button
          variant={"secondary"}
          size="sm"
          className="border-secondary text-secondary-foreground hover:bg-secondary hover:text-foreground"
          onClick={() => setShowFundSection(false)}
        >
          Hide
        </Button>
      </div>
      <p className="text-sm font-normal">
        Fund your 1-click trading account with at least 1.0 BERA token to ensure
        you have enough reserves for gas fees.{" "}
      </p>
      <div>
        <Input
          type="number"
          value={fundAmount}
          onChange={(e) => setFundAmount(e.target.value)}
          id="initial-deposit"
          className="mt-4"
          placeholder="0.00"
          endAdornment="BERA"
        />
        {isReady && (
          <div className="mt-1 flex h-3 w-full items-center justify-end gap-1 text-xs text-muted-foreground">
            <Icons.wallet className="relative inline-block h-3 w-3 " />
            {userBalance}
            <span
              className="cursor-pointer underline"
              onClick={() => setFundAmount(userBalance)}
            >
              MAX
            </span>
          </div>
        )}
      </div>
      <ActionButton className="mt-4 w-full">
        <Button
          className="w-full"
          disabled={isFundingLoading}
          onClick={() =>
            fundWrite({
              address: octAddress as Address,
              value: parseEther(`${fundAmount || "0"}` as `${number}`),
            })
          }
        >
          Fund One-Click Wallet
        </Button>
      </ActionButton>
    </div>
  );
};

const DelegatedSection = ({
  isRevokeLoading,
  revokeDelegation,
}: {
  isRevokeLoading: boolean;
  revokeDelegation: () => void;
}) => {
  return (
    <div className="relative flex flex-row justify-between gap-2 rounded-md border border-border p-3">
      <div className="flex flex-row gap-2 text-sm font-medium">
        <Icons.checkCircle2 className="text-success-foreground" />
        Granted Permission
      </div>
      <Button
        variant={"destructive"}
        size="sm"
        className="bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive"
        disabled={isRevokeLoading}
        onClick={() => revokeDelegation()}
      >
        Revoke
      </Button>
    </div>
  );
};

// ApprovalSection Component
const ApprovalSection = ({
  isLoading,
  delegateWallet,
}: {
  isLoading: boolean;
  delegateWallet: () => void;
}) => {
  return (
    <div className={"relative rounded-md border border-border p-3"}>
      <p className="pb-4 text-sm font-normal">
        Grant your connected wallet permission to interact with trading
        contracts through the One-Click-Trading wallet.
      </p>
      <ActionButton className="w-full">
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={() => delegateWallet()}
        >
          Approve
        </Button>
      </ActionButton>
    </div>
  );
};

const WalletFundedSection = ({
  isBalanceLessThanThreshold,
  setShowFundSection,
  showFundSection,
}: {
  isBalanceLessThanThreshold: boolean;
  setShowFundSection: (value: boolean) => void;
  showFundSection: boolean;
}) => {
  return (
    <div className="relative flex flex-row justify-between gap-2 rounded-md border border-border p-3">
      <div className="flex flex-row gap-2 text-sm font-medium">
        {isBalanceLessThanThreshold ? (
          <Icons.warning className="text-warning-foreground" />
        ) : (
          <Icons.checkCircle2 className="text-success-foreground" />
        )}
        <span
          className={cn(
            isBalanceLessThanThreshold ? "text-warning-foreground" : "",
          )}
        >
          {isBalanceLessThanThreshold ? "Low Balance" : "Wallet Funded"}
        </span>
      </div>
      <Button
        variant={"secondary"}
        size="sm"
        className="border-success bg-success text-success-foreground hover:bg-success-foreground hover:text-success"
        onClick={() => setShowFundSection(!showFundSection)}
      >
        Fund
      </Button>
    </div>
  );
};

const OneClickWalletEnabledSection = () => {
  return (
    <div className="relative flex flex-row items-center justify-between gap-2 rounded-md border border-border p-3">
      <div className="flex flex-row items-center gap-2 text-sm font-medium">
        <Icons.checkCircle2 className="text-success-foreground" />
        One-Click Wallet Enabled
      </div>
    </div>
  );
};

export function ManageOctDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    isOctDelegated,
    refetchDelegated,
    isOctUnfunded,
    isOctBalanceLow,
    octAddress,
    octBalance,
  } = useOct({
    config: beraJsConfig,
  });

  const [fundAmount, setFundAmount] = useState<string | undefined>(undefined);
  const { account, isReady } = useBeraJs();
  const { useBalance } = usePollBeraBalance({
    config: beraJsConfig,
    args: { address: account as string },
  });
  const userBalance = useBalance();
  const { isLoading, write } = useTxn({
    message: "Delegate One Click Trading Wallet",
    actionType: TransactionActionType.DELEGATE_OCT,
    onSuccess: () => {
      refetchDelegated();
    },
  });

  const { isLoading: isRevokeLoading, write: revokeWrite } = useTxn({
    message: "Revoke One Click Trading Wallet",
    actionType: TransactionActionType.REVOKE_OCT,
    onSuccess: () => {
      refetchDelegated();
    },
  });

  const { isFundingLoading, fundWrite } = useTxn({
    message: "Funding One Click Trading Wallet",
  });

  const [showFundSection, setShowFundSection] = useState(false);
  const isBalanceLessThanThreshold = Number(octBalance ?? 0) < 0.1;

  function revokeDelegation() {
    revokeWrite({
      address: tradingContractAddress,
      abi: TRADING_ABI,
      functionName: "removeDelegate",
      params: [],
    });
  }

  function delegateWallet() {
    write({
      address: tradingContractAddress,
      abi: TRADING_ABI,
      functionName: "setDelegate",
      params: [octAddress],
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[382px]">
        <div className="text-xl font-semibold leading-7">
          ⚡ One-Click Trading{" "}
        </div>
        <TradeWalletSection />
        {isOctDelegated && !isOctBalanceLow && !isOctUnfunded && (
          <OneClickWalletEnabledSection />
        )}
        {isOctDelegated ? (
          <DelegatedSection
            isRevokeLoading={isRevokeLoading}
            revokeDelegation={revokeDelegation}
          />
        ) : (
          <ApprovalSection
            isLoading={isLoading}
            delegateWallet={delegateWallet}
          />
        )}
        {((!isOctBalanceLow && !isOctUnfunded) ||
          isBalanceLessThanThreshold) && (
          <WalletFundedSection
            isBalanceLessThanThreshold={isBalanceLessThanThreshold}
            setShowFundSection={setShowFundSection}
            showFundSection={showFundSection}
          />
        )}
        {showFundSection && (
          <FundAccountSection
            fundAmount={fundAmount}
            setFundAmount={setFundAmount}
            isReady={isReady}
            userBalance={userBalance.toString()}
            isFundingLoading={isFundingLoading}
            fundWrite={fundWrite}
            octAddress={octAddress}
            setShowFundSection={setShowFundSection}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
