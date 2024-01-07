import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { parseUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollPreviewSharesForSingleSidedLiquidityRequest = (
  poolAddress: `0x${string}` | undefined,
  asset: Token | undefined,
  amount: string,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getPreviewSharesForSingleSidedLiquidityRequest";
  const QUERY_KEY = [poolAddress, asset?.address, amount, method];
  const { isLoading, isValidating } = useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient
        .readContract({
          address: networkConfig.precompileAddresses.erc20DexAddress as Address,
          abi: DEX_PRECOMPILE_ABI,
          functionName: method,
          args: [
            poolAddress,
            asset?.address,
            parseUnits(amount, asset?.decimals ?? 18),
          ],
        })
        .catch(() => {
          return undefined;
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
    isLoading,
    isValidating,
  };
};
