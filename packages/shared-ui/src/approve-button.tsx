"use client";

import { useEffect, useRef, useState } from "react";
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
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current?.clientWidth) {
        if (ref.current.clientWidth < 360 && !smallScreen) {
          setSmallScreen(true);
        } else if (ref.current.clientWidth >= 360 && smallScreen) {
          setSmallScreen(false);
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "flex gap-4",
        smallScreen ? "flex-col" : "flex-row",
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
        className="w-full"
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
        {isLoading ? "Loading..." : amount ? "Approve Infinite" : "Approve"}
      </Button>
    </div>
  );
};
