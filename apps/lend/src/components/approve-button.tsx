"use client";

import { type Token } from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { erc20ABI } from "wagmi";

type Props = {
  token: Token | undefined;
  spender: string;
  amount?: bigint;
};

const ApproveButton = ({
  token,
  spender,
  amount = 1000000000000000000n,
}: Props) => {
  const { write, isLoading, isSubmitting } = useTxn({
    message: `Approve ${token?.name}`,
  });

  return (
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
  );
};

export default ApproveButton;
