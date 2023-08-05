import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollPreviewBurnShares = (
  amount: number,
  poolAddress?: string,
  shareAddress?: string,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getPreviewBurnShares";
  const QUERY_KEY = [poolAddress, shareAddress, amount, method];
  useSWR(
    QUERY_KEY,
    async () => {
      return {
        address: "0x",
        output: [],
      };
      if (poolAddress && shareAddress) {
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses.erc20DexAddress as Address,
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
      refreshInterval: POLLING.SLOW,
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
