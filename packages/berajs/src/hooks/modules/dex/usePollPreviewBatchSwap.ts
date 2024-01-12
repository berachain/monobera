import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollPreviewBatchSwap = (
  batchSwapSteps: any[]
) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getPreviewBatchSwap";

  const QUERY_KEY = [
    batchSwapSteps
  ];
  useSWR(
    QUERY_KEY,
    async () => {
      if (batchSwapSteps.length) {
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses.erc20DexAddress as Address,
          abi: DEX_PRECOMPILE_ABI,
          functionName: method,
          args: [
            0,
            batchSwapSteps
          ],
        });

        console.log(result)
        return 0
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const usePreviewBatchSwap = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    usePreviewBatchSwap,
  };
};
