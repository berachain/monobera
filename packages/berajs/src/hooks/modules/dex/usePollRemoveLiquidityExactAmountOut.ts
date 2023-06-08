import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollRemoveLiquidityExactAmountOut = (
  poolAddress: `0x${string}`,
  assetIn: Token,
  assetAmount: number,
  sharesIn: Token,
  sharesAmount: number,
) => {
  const publicClient = usePublicClient();

  const method = "getRemoveLiquidityExactAmountOut";
  const QUERY_KEY = [
    poolAddress,
    assetIn.address,
    assetAmount,
    sharesIn.address,
    sharesAmount,
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
          assetIn.address,
          parseUnits(`${assetAmount}`, assetIn.decimals),
          sharesIn.address,
          parseUnits(`${sharesAmount}`, sharesIn.decimals),
        ],
      });

      return result;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useRemoveLiquidityExactAmountOut = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useRemoveLiquidityExactAmountOut,
  };
};
3;
