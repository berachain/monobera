"use client";

import { TransactionActionType, type Token } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { maxInt256 } from "viem";
import { erc20ABI } from "wagmi";

import { useTxn } from "./hooks/useTxn";

type Props = {
  token: Token | undefined;
  spender: string;
  amount?: bigint;
};

export const ApproveButton = ({ token, spender, amount }: Props) => {
  const { write, isLoading, isSubmitting } = useTxn({
    message: `Approve ${token?.name}`,
    actionType: TransactionActionType.APPROVAL,
  });

  return (
    <div className="flex gap-4">
      {amount !== undefined && (
        <Button
          className="w-full"
          disabled={!token || isLoading || isSubmitting}
          onClick={() => {
            write({
              address: token?.address as `0x${string}`,
              abi: erc20ABI as unknown as (typeof erc20ABI)[],
              functionName: "approve",
              params: [spender, amount],
            });
          }}
        >
          {isLoading ? "Loading..." : `Approve ${token?.symbol}`}
        </Button>
      )}
      <Button
        className="w-full"
        disabled={!token || isLoading || isSubmitting}
        onClick={() => {
          write({
            address: token?.address as `0x${string}`,
            abi: erc20ABI as unknown as (typeof erc20ABI)[],
            functionName: "approve",
            params: [spender, maxInt256],
          });
        }}
      >
        {isLoading ? "Loading..." : `Approve Infinite`}
      </Button>
    </div>
  );
};
