import { useCallback, useEffect, useState } from "react";
import {
  TransactionActionType,
  tradingAbi,
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
import { useOctTxn } from "@bera/shared-ui";
import { Identicon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Skeleton } from "@bera/ui/skeleton";
import { parseEther, type Address } from "viem";

export interface TokenBalance {
  balance: bigint;
  formattedBalance: string;
}

export type ShowFundSectionType = "fund" | "withdraw" | "none";

const TradeWalletSection = ({
  isOctBalanceLow,
  octPrivKey,
  octAddress,
  octBalance,
  isOctUnfunded,
  octTxnsLeft,
}: {
  isOctBalanceLow: boolean;
  octPrivKey: string;
  octAddress: string;
  octBalance: TokenBalance | undefined;
  isOctUnfunded: boolean;
  octTxnsLeft: string;
}) => {
  const [copied, setCopied] = useState(false);

  const formattedBalance = Number(octBalance?.formattedBalance ?? 0);
  return (
    <div className={"relative rounded-md border border-border p-3"}>
      <p className="text-md pb-4 font-bold leading-normal">
        Your One-Click Trade Wallet
      </p>
      {octAddress ? (
        <div className="mt-2 flex flex-row gap-2">
          <Identicon account={octAddress} size={24} />
          <div
            className="cursor-pointer text-sm font-semibold hover:underline"
            onClick={() =>
              window.open(`${blockExplorerUrl}/address/${octAddress}`, "_blank")
            }
          >
            {truncateHash(octAddress)}
          </div>
          <Icons.external
            className="h-4 w-4 cursor-pointer"
            onClick={() =>
              window.open(`${blockExplorerUrl}/address/${octAddress}`, "_blank")
            }
          />
          <Button
            size={"sm"}
            className="ml-auto"
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
              <Icons.check className="h-[18px] w-4 text-positive" />
            ) : (
              <span className="h-[18px]">Copy Private Key</span>
            )}
          </Button>
        </div>
      ) : (
        <Skeleton className="mt-2 flex h-8" />
      )}

      {octAddress ? (
        <div className="mt-2 flex flex-row gap-2">
          <TokenIcon address={nativeTokenAddress} />
          <div className="text-sm font-semibold">
            {`${
              formattedBalance < 0.01 && !isOctUnfunded
                ? "< 0.01"
                : formattedBalance.toFixed(2)
            } BERA `}
            {octTxnsLeft ? (
              <span
                className={cn(
                  "truncate text-xs font-medium",
                  isOctUnfunded
                    ? "text-destructive-foreground"
                    : isOctBalanceLow
                      ? "text-warning-foreground"
                      : "text-success-foreground",
                )}
              >
                ~ {octTxnsLeft} txns left
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <Skeleton className="mt-2 flex h-8" />
      )}
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
        One-Click Wallet Enabled
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
  fundAmount,
  setFundAmount,
  isReady,
  userBalance,
  isFundingLoading,
  fundWrite,
  octAddress,
  perpsGasAmt,
  octTxnsLeft,
  isOctUnfunded,
  showFundSection,
  octBalance,
  account,
  writeValueSend,
  isValueSendLoading,
}: {
  isBalanceLessThanThreshold: boolean;
  setShowFundSection: React.Dispatch<React.SetStateAction<ShowFundSectionType>>;
  fundAmount: string | undefined;
  octTxnsLeft: string;
  setFundAmount: (value: string | undefined) => void;
  isReady: boolean | undefined;
  perpsGasAmt: number;
  octBalance: string;
  userBalance: string;
  isFundingLoading: boolean;
  fundWrite: (args: { address: Address; value: bigint }) => void;
  octAddress: string;
  isOctUnfunded: boolean;
  showFundSection: ShowFundSectionType;
  account: string | undefined;
  writeValueSend: (args: { address: Address; value: bigint }) => void;
  isValueSendLoading: boolean;
}) => {
  return (
    <div className="relative flex flex-row justify-between gap-2 rounded-md border border-border p-3">
      <div className="flex w-full flex-col">
        <div className="relative flex w-full flex-row justify-between gap-2">
          <div className="flex flex-row gap-2 text-sm font-medium">
            {isBalanceLessThanThreshold ? (
              <Icons.warning
                className={
                  isOctUnfunded
                    ? "text-destructive-foreground"
                    : "text-warning-foreground"
                }
              />
            ) : (
              <Icons.checkCircle2 className="text-success-foreground" />
            )}
            <span
              className={cn(
                isOctUnfunded
                  ? "text-destructive-foreground"
                  : isBalanceLessThanThreshold
                    ? "text-warning-foreground"
                    : "",
              )}
            >
              {isOctUnfunded
                ? "Wallet Unfunded"
                : isBalanceLessThanThreshold
                  ? "Low Balance"
                  : "Wallet Funded"}
            </span>
          </div>
          <div className=" flex flex-row gap-2">
            <Button
              size="sm"
              variant={"secondary"}
              disabled={isOctUnfunded}
              className={
                showFundSection === "withdraw"
                  ? "bg-primary text-primary-foreground hover:text-secondary"
                  : ""
              }
              onClick={() =>
                setShowFundSection((prev: ShowFundSectionType) =>
                  prev === "withdraw" ? "none" : "withdraw",
                )
              }
            >
              Withdraw
            </Button>
            <Button
              variant={"secondary"}
              size="sm"
              disabled={isOctUnfunded}
              className={
                showFundSection === "fund"
                  ? "bg-primary text-primary-foreground hover:text-secondary"
                  : ""
              }
              onClick={() =>
                setShowFundSection((prev: ShowFundSectionType) =>
                  prev === "fund" ? "none" : "fund",
                )
              }
            >
              Fund
            </Button>
          </div>
        </div>
        {showFundSection !== "none" && (
          <div className={"relative rounded-md pt-4"}>
            <div className={"items-centre flex justify-between pb-2"}>
              <p className="text-md font-bold leading-normal">
                {`${
                  showFundSection === "fund" ? "Fund" : "Withdraw From"
                } Your One-Click Account`}
              </p>
            </div>
            {showFundSection === "fund" && (
              <p className="mb-2 text-sm font-normal">
                Fund your one-click trading account to ensure you have enough
                reserves for gas fees.{" "}
              </p>
            )}
            <div>
              <Input
                type="number"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                id="initial-deposit"
                className="mt-2"
                placeholder="0.00"
                endAdornment="BERA"
              />
              {isReady && (
                <div className="mt-1 flex h-3 w-full items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Icons.wallet className="relative inline-block h-3 w-3 " />
                  {showFundSection === "fund" ? userBalance : octBalance}
                  <span
                    className="cursor-pointer underline"
                    onClick={() =>
                      setFundAmount(
                        showFundSection === "fund" ? userBalance : octBalance,
                      )
                    }
                  >
                    MAX
                  </span>
                </div>
              )}
            </div>
            <ActionButton className="mt-4 w-full">
              <Button
                className="w-full"
                disabled={
                  showFundSection === "fund"
                    ? isFundingLoading
                    : isValueSendLoading || Number(octTxnsLeft) < 100
                }
                onClick={() =>
                  showFundSection === "fund"
                    ? fundWrite({
                        address: octAddress as Address,
                        value: parseEther(
                          `${fundAmount || "0"}` as `${number}`,
                        ),
                      })
                    : writeValueSend({
                        address: account as Address,
                        value:
                          parseEther(`${fundAmount || "0"}` as `${number}`) -
                          BigInt(perpsGasAmt) * 100n,
                      })
                }
              >
                {`${showFundSection === "fund" ? "Fund" : "Withdraw"}`}
              </Button>
              {showFundSection === "withdraw" && Number(octTxnsLeft) < 100 && (
                <Alert variant="destructive" className="mt-2">
                  The maximum amount available for withdrawal does not cover the
                  gas fees required for this transaction.
                </Alert>
              )}
            </ActionButton>
          </div>
        )}
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
    octBalance,
    octTxnsLeft,
    isOctBalanceLow,
    octAddress,
    perpsGasAmt,
    octPrivKey,
  } = useOct();

  const [showFundSection, setShowFundSection] =
    useState<ShowFundSectionType>("none");

  const [fundAmount, setFundAmount] = useState<string | undefined>(undefined);
  const { account, isReady } = useBeraJs();

  const { refresh: refreshOctBalance } = usePollBeraBalance({
    address: octAddress as Address,
  });
  const { data: beraBalanceData, refresh: refreshBalance } = usePollBeraBalance(
    {
      address: account as Address,
    },
  );
  const userBalance = beraBalanceData?.formattedBalance ?? "0";
  const { isLoading, write } = useTxn({
    message: "Delegate One Click Trading Wallet",
    actionType: TransactionActionType.DELEGATE_OCT,
    onSuccess: () => {
      refetchDelegated();
    },
  });

  useEffect(() => {
    if (isOctUnfunded && open) {
      setShowFundSection("fund");
    }
  }, [isOctUnfunded, open]);

  const { isLoading: isRevokeLoading, write: revokeWrite } = useTxn({
    message: "Revoke One Click Trading Wallet",
    actionType: TransactionActionType.REVOKE_OCT,
    onSuccess: () => {
      refetchDelegated();
    },
  });

  const { isFundingLoading, fundWrite } = useTxn({
    message: "Funding One Click Trading Wallet",
    onSuccess: () => {
      refreshOctBalance();
      refreshBalance();
      setShowFundSection("none");
    },
  });

  const { isValueSendLoading, writeValueSend } = useOctTxn({
    message: "Withdrawing From One Click Trading Wallet",
    onSuccess: () => {
      refreshOctBalance();
      refreshBalance();
      setShowFundSection("none");
    },
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      onOpenChange(open);
      if (!open) {
        setShowFundSection("none");
      }
    },
    [onOpenChange, setShowFundSection],
  );

  const revokeDelegation = () => {
    revokeWrite({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "removeDelegate",
      params: [],
    });
  };

  const delegateWallet = () => {
    write({
      address: tradingContractAddress,
      abi: tradingAbi,
      functionName: "setDelegate",
      params: [octAddress as Address],
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex w-full flex-col gap-4 p-4 md:w-[382px]">
        <div className="text-xl font-semibold leading-7">
          ⚡ One-Click Trading{" "}
        </div>
        <TradeWalletSection
          isOctBalanceLow={isOctBalanceLow}
          octPrivKey={octPrivKey}
          octAddress={octAddress}
          octBalance={octBalance}
          isOctUnfunded={isOctUnfunded}
          octTxnsLeft={octTxnsLeft}
        />
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
        <WalletFundedSection
          octTxnsLeft={octTxnsLeft}
          isBalanceLessThanThreshold={isOctBalanceLow}
          setShowFundSection={setShowFundSection}
          fundAmount={fundAmount}
          isOctUnfunded={isOctUnfunded}
          setFundAmount={setFundAmount}
          isReady={isReady}
          perpsGasAmt={perpsGasAmt}
          userBalance={userBalance.toString()}
          isFundingLoading={isFundingLoading}
          fundWrite={fundWrite}
          octAddress={octAddress}
          showFundSection={showFundSection}
          octBalance={octBalance?.formattedBalance.toString() ?? "0"}
          writeValueSend={writeValueSend}
          isValueSendLoading={isValueSendLoading}
          account={account}
        />
      </DialogContent>
    </Dialog>
  );
}
