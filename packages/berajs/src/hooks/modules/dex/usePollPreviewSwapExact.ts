import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollPreviewSwapExact = (
  poolAddress: `0x${string}`,
  baseAsset: Token,
  baseAssetAmount: number,
  quoteAsset: Token,
) => {
  const publicClient = usePublicClient();

  const method = "getPreviewSwapExact";

  const QUERY_KEY = [
    poolAddress,
    baseAsset.address,
    baseAssetAmount,
    quoteAsset,
    method,
  ];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: DEX_PRECOMPILE_ADDRESS,
        abi: DEX_PRECOMPILE_ABI,
        functionName: method,
        args: [
          poolAddress,
          baseAsset.address,
          parseUnits(`${baseAssetAmount}`, baseAsset.decimals ?? 18),
          quoteAsset.address,
        ],
      });

      return result;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const usePreviewSwapExact = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewSwapExact,
  };
};
