"use client";

import { useEffect, useRef, useState } from "react";
import {
  TransactionActionType,
  usePollAllowance,
  type Token,
} from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { maxInt256, erc20Abi } from "viem";

import { useTxn } from "./hooks/useTxn";

type Props = {
  token: Token | undefined;
  spender: string;
  amount?: bigint;
  className?: string;
  onApproval?: () => void;
};

export const ApproveButton = ({
  token,
  spender,
  amount,
  className,
  onApproval,
}: Props) => {
  const { refresh } = usePollAllowance({
    contract: spender,
    token: token,
  });

  const { write, isLoading, isSubmitting } = useTxn({
    message: `Approving ${token?.name}`,
    actionType: TransactionActionType.APPROVAL,
    onSuccess: () => {
      void refresh();
      onApproval?.();
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
          disabled={!token || isLoading || isSubmitting}
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
        disabled={!token || isLoading || isSubmitting}
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
