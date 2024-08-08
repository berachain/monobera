import { useState } from "react";
import {
  IVotes_ABI,
  TransactionActionType,
  truncateHash,
  useBeraJs,
  usePollUserDelegates,
} from "@bera/berajs";
import { governanceTokenAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Address, isAddress } from "viem";

export const DelegateModal = ({ delegated }: { delegated: Address }) => {
  const { account } = useBeraJs();
  const { refresh } = usePollUserDelegates();
  const [delegate, setDelegate] = useState<string>(delegated);
  const [input, setInput] = useState(false);

  const { write, ModalPortal } = useTxn({
    message: `Delegating votes to ${truncateHash(delegate)}`,
    actionType: TransactionActionType.DELEGATE,
    onSuccess: () => refresh(),
  });

  return (
    <>
      {ModalPortal}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">Update Delegation</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mb-4">Update Delegation</DialogTitle>
            <DialogDescription className="flex flex-col gap-4">
              <div
                className="flex cursor-pointer gap-2 rounded-sm p-2 hover:bg-muted"
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
                className="flex cursor-pointer gap-2 rounded-sm p-2 hover:bg-muted"
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

              <div className="px-2">
                <div className="font-bold text-foreground">Delegate to: </div>
                {input ? (
                  <input
                    className="mt-1 w-full rounded-sm border border-border px-4 py-2"
                    placeholder="Enter address"
                    value={delegate}
                    onChange={(e) => setDelegate(e.target.value)}
                  />
                ) : (
                  "My Self"
                )}
              </div>

              <Button
                className="mt-4"
                disabled={!isAddress(delegate) || delegated === delegate}
                onClick={() =>
                  write({
                    address: governanceTokenAddress,
                    abi: IVotes_ABI,
                    functionName: "delegate",
                    params: [delegate],
                  })
                }
              >
                Updated
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
