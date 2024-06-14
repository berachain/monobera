import { useState, useEffect } from "react";
import Image from "next/image";
import {
  TransactionActionType,
  bTokenAbi,
  useBeraJs,
  usePollBHoneyEpochs,
} from "@bera/berajs";
import { bhoneyVaultContractAddress } from "@bera/config";
import { type VaultWithdrawalRequest } from "@bera/proto/src";
import { ActionButton, TokenInput, TokenList, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { type ColumnDef } from "@tanstack/react-table";

import { formatFromBaseUnit, formatToBaseUnit } from "~/utils/formatBigNumber";
import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";

const CancelWithdraw = ({
  withdrawRequest,
}: {
  withdrawRequest: VaultWithdrawalRequest;
}) => {
  const [open, setOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  useEffect(() => {
    if (!open) {
      setWithdrawAmount("");
    }
  }, [open]);

  const [isWithdrawExceeding, setIsWithdrawExceeding] = useState(false);
  const { refetch } = usePollWithdrawQueue();
  const { account } = useBeraJs();
  const { write: cancelWrite, isLoading: isCancelLoading } = useTxn({
    message: "Cancel HONEY Withdraw Request",
    actionType: TransactionActionType.CANCEL_WITHDRAW_REQUEST,
    onSuccess: () => {
      refetch();
      setOpen(false);
    },
  });

  const { write: redeemWrite, isLoading: isRedeemLoading } = useTxn({
    message: "Redeeming BHONEY",
    actionType: TransactionActionType.WITHDRAW_HONEY,
    onSuccess: () => {
      refetch();
    },
  });

  const { useBHoneyEpoch, isLoading: isEpochLoading } = usePollBHoneyEpochs();
  const epoch = useBHoneyEpoch();

  const isReady = epoch?.currentEpoch === Number(withdrawRequest.unlock_epoch);
  return (
    <div className="flex w-full flex-row items-center gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-y-hidden pb-6 focus:outline-none">
          <DialogHeader>
            <DialogTitle className="mb-3">Cancel Withdrawl Amount</DialogTitle>
          </DialogHeader>
          <TokenList>
            <TokenInput
              selectable={false}
              balance={formatFromBaseUnit(withdrawRequest.shares, 18).toString(
                10,
              )}
              selected={{
                symbol: "bHONEY",
                address: bhoneyVaultContractAddress,
                decimals: 18,
                name: "bHONEY",
              }}
              amount={withdrawAmount}
              setAmount={setWithdrawAmount}
              showExceeding={true}
              onExceeding={(isExceeding) => setIsWithdrawExceeding(isExceeding)}
            />
          </TokenList>
          <ActionButton>
            <Button
              disabled={!withdrawAmount || isWithdrawExceeding}
              onClick={() =>
                cancelWrite({
                  address: bhoneyVaultContractAddress,
                  abi: bTokenAbi,
                  functionName: "cancelWithdrawRequest",
                  params: [
                    BigInt(formatToBaseUnit(withdrawAmount, 18).toString(10)),
                    BigInt(withdrawRequest.unlock_epoch),
                  ],
                })
              }
              className="w-full"
            >
              Confirm
            </Button>
          </ActionButton>
        </DialogContent>
      </Dialog>
      <Button
        size="sm"
        disabled={isRedeemLoading || isEpochLoading || !isReady}
        onClick={() =>
          redeemWrite({
            address: bhoneyVaultContractAddress,
            abi: bTokenAbi,
            functionName: "redeem",
            params: [BigInt(withdrawRequest.shares), account, account],
          })
        }
      >
        Withdraw
      </Button>
      <Button
        disabled={isCancelLoading}
        onClick={() => setOpen(true)}
        variant={"secondary"}
        size="sm"
      >
        Cancel
      </Button>
    </div>
  );
};
export const withdrawQueueColumns: ColumnDef<VaultWithdrawalRequest>[] = [
  {
    header: "Amount",
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 text-sm font-semibold leading-7">
        {formatFromBaseUnit(row.original.shares ?? "0", 18).toString(10)}{" "}
        <Image
          src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bhoney.png"
          alt="Honey"
          width={20}
          height={20}
        />
      </div>
    ),
    accessorKey: "shares",
    enableSorting: false,
  },
  {
    header: "Unlock Epoch",
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] flex-col gap-1">
          {row.original.unlock_epoch}
        </div>
      );
    },
    accessorKey: "unlock_epoch",
    enableSorting: true,
    minSize: 160,
    size: 160,
  },

  {
    header: () => <></>,
    cell: ({ row }) => <CancelWithdraw withdrawRequest={row.original} />,
    accessorKey: "cancel",
    enableSorting: false,
    minSize: 180,
    size: 180,
  },
];
