import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollPreviewSharesForSingleSidedLiquidityRequest = (
  poolAddress: `0x${string}`,
  asset: Token,
  amount: number,
) => {
  const publicClient = usePublicClient();

  const method = "getPreviewSharesForSingleSidedLiquidityRequest";
  const QUERY_KEY = [poolAddress, asset.address, amount, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: DEX_PRECOMPILE_ADDRESS,
        abi: DEX_PRECOMPILE_ABI,
        functionName: method,
        args: [
          poolAddress,
          asset.address,
          parseUnits(`${amount}`, asset.decimals),
        ],
      });

      return result;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const usePreviewSharesForSingleSidedLiquidityRequest = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewSharesForSingleSidedLiquidityRequest,
  };
};
