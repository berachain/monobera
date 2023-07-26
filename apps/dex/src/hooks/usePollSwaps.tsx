import error from "next/error";
import { RouteNotFound, type SwapInfo } from "@bera/bera-router";
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
}

export const usePollSwaps = ({
  tokenIn,
  tokenOut,
  swapKind,
  amount,
}: IUsePollSwaps) => {
  const { router } = useRouter();

  const QUERY_KEY = [tokenIn, tokenOut, swapKind, amount];

  return useSWR(
    QUERY_KEY,
    async () => {
      try {
        const result: SwapInfo = await router.getSwaps(
          tokenIn,
          tokenOut,
          swapKind,
          amount,
        );
        return result;
      } catch (e) {
        console.error(e);
        if (error instanceof RouteNotFound) {
          throw RouteNotFound;
        }
      }
    },
    {
      refreshInterval: POLLING.FAST,
      use: [laggy],
    },
  );
};
