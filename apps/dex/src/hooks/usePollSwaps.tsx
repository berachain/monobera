import { type SwapInfo } from "@bera/bera-router";
import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import { type Address } from "wagmi";

import { useRouter } from "~/context/routerContext";
import { laggy } from "./laggy";

interface IUsePollSwaps {
  tokenIn: Address;
  tokenOut: Address;
  swapKind: number;
  amount: bigint;
  lock?: boolean;
}

export const usePollSwaps = ({
  tokenIn,
  tokenOut,
  swapKind,
  amount,
  lock = false,
}: IUsePollSwaps) => {
  const { router } = useRouter();

  const QUERY_KEY = [tokenIn, tokenOut, swapKind, amount, lock];
  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        if (lock) return undefined;
        const result: SwapInfo = await router.getSwaps(
          tokenIn,
          tokenOut,
          swapKind,
          amount,
        );
        return result;
      } catch (e) {
        // TODO: throws so many errors but this is good 4 debug
        // console.error(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};
