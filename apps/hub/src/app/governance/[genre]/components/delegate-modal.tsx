import { useEffect, useState } from "react";
import {
  BGT_ABI,
  TransactionActionType,
  truncateHash,
  useBeraJs,
  usePollUserDelegates,
} from "@bera/berajs";
import { governanceTokenAddress } from "@bera/config";
import { FormattedNumber, TokenIcon, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Address, isAddress } from "viem";
import { Skeleton } from "@bera/ui/skeleton";
import { Identicon } from "@bera/shared-ui";
import { useGovernance } from "./governance-provider";
import { InputWithLabel } from "@bera/ui/input";
import { cn } from "@bera/ui";

export const DelegateModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) => {
  const { account } = useBeraJs();
  const { refresh, data, isLoading } = usePollUserDelegates();
  const [delegate, setDelegate] = useState<string>("");
  const [error, setError] = useState<string>();
  const [input, setInput] = useState(false);
  const { tokenBalance, isLoading: isGovernanceLoading } = useGovernance();

  useEffect(() => {
    setDelegate(data?.delegate ?? "");
  }, [isLoading]);

  const { write, ModalPortal } = useTxn({
    message: `Delegating votes to ${truncateHash(delegate)}`,
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => {
      refresh();
      onOpenChange(false);
    },
  });

  function checkAddress() {
    const error = !isAddress(delegate)
      ? "Enter a valid address"
      : data?.delegate === delegate
        ? "You already delegating to this address"
        : undefined;
    setError(error);
    return !error;
  }

  return (
    <>
      {ModalPortal}
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-4">Update Delegation</DialogTitle>
            <DialogDescription className="grid grid-cols-1 gap-4">
              <p className="text-muted-foreground">
                Delegating BGT to yourself or others grants voting power.
              </p>
              <div className="grid grid-cols-1 items-center sm:grid-cols-2 mt-6 mb-6 gap-4 leading-tight text-foreground">
                <div className=" ">
                  <div className="flex items-center gap-2 text-sm font-medium ">
                    <Identicon account={account!} size={24} />
                    {truncateHash(account ?? "0x", 6)}
                  </div>
                </div>

                <div className="">
                  <h3 className="text-muted-foreground font-medium text-sm">
                    Your BGT balance
                  </h3>
                  <p className="flex items-center mt-1 gap-1">
                    {tokenBalance || isGovernanceLoading ? (
                      <FormattedNumber
                        className="text-primary font-medium"
                        value={Number(tokenBalance)}
                        symbol="BGT"
                      />
                    ) : (
                      <Skeleton className="h-3 w-12" />
                    )}
                    <TokenIcon size="md" address={governanceTokenAddress} />
                  </p>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                Delegate to
              </h3>

              <div
                className={cn(
                  "flex cursor-pointer gap-2 rounded-sm p-2 hover:bg-muted ",
                  delegate === account
                    ? "border-2 border-info-foreground"
                    : "border border-border",
                )}
                onClick={() => {
                  setInput(false);
                  setDelegate(account as Address);
                }}
              >
                <Icons.user className="h-4 w-4" />
                <div>
                  <div className="text-sm font-semibold leading-4 text-foreground">
                    Myself
                  </div>
                  <div className="mt-2 text-sm font-medium leading-4">
                    Delegate votes to yourself
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  "flex cursor-pointer gap-2 rounded-sm p-2 hover:bg-muted ",
                  delegate === account
                    ? "border-border border "
                    : "border-info-foreground border-2",
                )}
                onClick={() => {
                  setInput(true);
                  setDelegate("");
                }}
              >
                <Icons.sendIcon className="h-4 w-4" />
                <div>
                  <div className="text-sm font-semibold leading-4 text-foreground">
                    Someone Else
                  </div>
                  <div className="mt-2 text-sm font-medium leading-4">
                    Delegate votes to someone else
                  </div>
                </div>
              </div>

              {input ? (
                <div className="">
                  <InputWithLabel
                    variant="black"
                    className="w-full"
                    placeholder="Enter delegation address"
                    error={error}
                    value={delegate}
                    onChange={(e) => setDelegate(e.target.value)}
                  />
                </div>
              ) : null}

              <Button
                className="mt-4"
                disabled={!isAddress(delegate) || data?.delegate === delegate}
                onClick={() =>
                  checkAddress() &&
                  write({
                    address: governanceTokenAddress,
                    abi: BGT_ABI,
                    functionName: "delegate",
                    params: [delegate as Address],
                  })
                }
              >
                Update
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
