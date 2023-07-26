import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, parseUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollPreviewSwapExact = (
  poolAddress: string,
  baseAssetAmount: number,
  baseAsset?: Token,
  quoteAsset?: Token,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getPreviewSwapExact";

  const QUERY_KEY = [
    poolAddress,
    baseAsset?.address,
    baseAssetAmount,
    quoteAsset?.address,
    method,
  ];
  useSWR(
    QUERY_KEY,
    async () => {
      if (baseAsset && quoteAsset) {
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses.erc20DexAddress as Address,
          abi: DEX_PRECOMPILE_ABI,
          functionName: method,
          args: [
            poolAddress,
            baseAsset.address,
            parseUnits(`${baseAssetAmount}`, baseAsset.decimals ?? 18),
            quoteAsset.address,
          ],
        });

        return Number(
          formatUnits((result as any[])[1], quoteAsset.decimals ?? 18),
        );
      }
      return undefined;
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
