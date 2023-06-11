import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollPreviewBurnShares = (
  amount: number,
  poolAddress?: string,
  shareAddress?: string,
) => {
  const publicClient = usePublicClient();

  const method = "getPreviewBurnShares";
  const QUERY_KEY = [poolAddress, shareAddress, amount, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (poolAddress && shareAddress) {
        const result = await publicClient.readContract({
          address: DEX_PRECOMPILE_ADDRESS,
          abi: DEX_PRECOMPILE_ABI,
          functionName: method,
          args: [poolAddress, shareAddress, parseUnits(`${amount}`, 18)],
        });

        const preview = (result as any[][])[0]?.map((r, i) => {
          return {
            address: r,
            output: (result as any[][])[1]?.[i],
          };
        });
        return preview;
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const usePreviewBurnShares = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewBurnShares,
  };
};
