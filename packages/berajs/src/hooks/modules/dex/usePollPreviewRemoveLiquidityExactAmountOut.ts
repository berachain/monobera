import { parseUnits } from "ethers";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

const EMPTY_INFO = [[""], [0n]];
export const usePollPreviewRemoveLiquidityExactAmountOut = (
  poolAddress: `0x${string}` | undefined,
  assetIn: Token | undefined,
  assetAmount: string,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getRemoveLiquidityExactAmountOut";
  const QUERY_KEY = [poolAddress, assetIn?.address, assetAmount, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (!poolAddress || !assetIn) return EMPTY_INFO;
      const result = await publicClient
        .readContract({
          address: networkConfig.precompileAddresses.erc20DexAddress as Address,
          abi: DEX_PRECOMPILE_ABI,
          functionName: method,
          args: [
            poolAddress,
            assetIn.address,
            parseUnits(assetAmount, assetIn?.decimals),
          ],
        })
        .catch((e) => {
          console.log(e);
          return EMPTY_INFO;
        });

      return result ?? EMPTY_INFO;
    },
    {
      refreshInterval: POLLING.FAST,
      fallbackData: EMPTY_INFO,
    },
  );

  const usePreviewRemoveLiquidityExactAmountOut = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewRemoveLiquidityExactAmountOut,
  };
};
