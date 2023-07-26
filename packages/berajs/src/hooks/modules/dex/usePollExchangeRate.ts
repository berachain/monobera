import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { type Token } from "~/api";
import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollExchangeRate = (
  poolAddress: `0x${string}`,
  baseAsset: Token,
  quoteAsset: Token,
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getExchangeRate";
  const QUERY_KEY = [
    poolAddress,
    baseAsset.address,
    quoteAsset.address,
    method,
  ];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.erc20DexAddress as Address,
        abi: DEX_PRECOMPILE_ABI,
        functionName: method,
        args: [poolAddress],
      });

      return result;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useExchangeRate = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useExchangeRate,
  };
};
