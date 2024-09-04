"use client";

import { useRef } from "react";
import {
  TransactionActionType,
  usePollAllowance,
  type Token,
} from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Address, erc20Abi, maxInt256 } from "viem";

import { useTxn } from "./hooks/useTxn";
import { useAnalytics } from "./utils";

type Props = {
  token: Token | undefined;
  spender: Address;
  amount?: bigint;
  className?: string;
  onApproval?: () => void;
  disabled?: boolean;
};

export const ApproveButton = ({
  token,
  spender,
  amount,
  className,
  onApproval,
  disabled,
}: Props) => {
  const { refresh } = usePollAllowance({
    spender,
    token,
  });
  const { captureException, track } = useAnalytics();
  const { write, isLoading, isSubmitting } = useTxn({
    message: `Approving ${token?.name}`,
    actionType: TransactionActionType.APPROVAL,
    onSuccess: () => {
      track(`approve_token_${token?.symbol.toLowerCase()}`);
      void refresh();
      onApproval?.();
    },
    onError: (e: Error | undefined) => {
      track(`approve_token_${token?.symbol.toLowerCase()}_failed`);
      captureException(e);
    },
  });
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 @[360px]/createPosition:flex-row",
        className,
      )}
      ref={ref}
    >
      {amount !== undefined && (
        <Button
          className="w-full"
          disabled={!token || isLoading || isSubmitting || disabled}
          onClick={() => {
            write({
              address: token?.address as `0x${string}`,
              abi: erc20Abi as unknown as (typeof erc20Abi)[],
              functionName: "approve",
              params: [spender, amount],
            });
          }}
        >
          {isLoading ? "Loading..." : `Approve ${token?.symbol}`}
        </Button>
      )}
      <Button
        className="w-full border-border"
        variant={"outline"}
        disabled={!token || isLoading || isSubmitting || disabled}
        onClick={() => {
          write({
            address: token?.address as `0x${string}`,
            abi: erc20Abi as unknown as (typeof erc20Abi)[],
            functionName: "approve",
            params: [spender, maxInt256],
          });
        }}
      >
        {isLoading ? "Loading..." : "Approve Infinite"}
      </Button>
    </div>
  );
};
