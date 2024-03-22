import Image from "next/image";
import {
  BTOKEN_ABI,
  TransactionActionType,
  useBeraJs,
  usePollBHoneyEpochs,
} from "@bera/berajs";
import { gTokenContractAddress } from "@bera/config";
import { type HoneyWithdrawalRequest } from "@bera/proto/src";
import { DataTableColumnHeader, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { formatUnits, type Address } from "viem";

import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";

export const CancelWithdraw = ({
  withdrawRequest,
}: {
  withdrawRequest: HoneyWithdrawalRequest;
}) => {
  const { refetch } = usePollWithdrawQueue();
  const { account } = useBeraJs();
  const { write: cancelWrite, isLoading: isCancelLoading } = useTxn({
    message: "Cancel HONEY Withdraw Request",
    actionType: TransactionActionType.CANCEL_WITHDRAW_REQUEST,
    onSuccess: () => {
      refetch();
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
      <Button
        disabled={isCancelLoading}
        onClick={() =>
          cancelWrite({
            address: gTokenContractAddress,
            abi: BTOKEN_ABI,
            functionName: "cancelWithdrawRequest",
            params: [
              BigInt(withdrawRequest.shares),
              BigInt(withdrawRequest.unlock_epoch),
            ],
          })
        }
        variant={"secondary"}
        size="sm"
      >
        cancel
      </Button>
      <Button
        size="sm"
        disabled={isRedeemLoading || isEpochLoading || !isReady}
        onClick={() =>
          redeemWrite({
            address: gTokenContractAddress,
            abi: BTOKEN_ABI,
            functionName: "redeem",
            params: [BigInt(withdrawRequest.shares), account, account],
          })
        }
      >
        withdraw
      </Button>
    </div>
  );
};
export const withdraw_queue_columns: ColumnDef<HoneyWithdrawalRequest>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2 text-sm font-semibold leading-7">
        {Number(formatUnits(BigInt(row.original.shares ?? 0n), 18))}{" "}
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unlock Epoch" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[120px] flex-col gap-1">
          {Number(row.original.unlock_epoch)}
        </div>
      );
    },
    accessorKey: "unlock_epoch",
    enableSorting: true,
  },

  {
    header: () => <></>,
    cell: ({ row }) => <CancelWithdraw withdrawRequest={row.original} />,
    accessorKey: "cancel",
    enableSorting: false,
  },
];
