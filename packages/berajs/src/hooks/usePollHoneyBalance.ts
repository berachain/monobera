import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { erc20ABI, usePublicClient, type Address } from "wagmi";

import POLLING from "~/config/constants/polling";
import { honeyAddress } from "../../../config/env/index";
import { useBeraJs } from "../contexts";

export const usePollHoneyBalance = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const QUERY_KEY = [account, isConnected, "honeyBalance"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: honeyAddress,
            abi: erc20ABI,
            functionName: "balanceOf",
            args: [account as Address],
          });
          return formatUnits(result, 18);
        } catch (e) {
          console.error(e);
        }
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );
  const useHoneyBalance = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    useHoneyBalance,
  };
};
