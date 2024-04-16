import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { type Address, erc20Abi, formatUnits } from "viem";
import { usePublicClient } from "wagmi";
import { honeyAddress } from "../../../config/env/index";
import { useBeraJs } from "../contexts";
import POLLING from "~/enum/polling";

export const usePollHoneyBalance = () => {
  const publicClient = usePublicClient();
  const { isConnected, account } = useBeraJs();
  const QUERY_KEY = [account, isConnected, "honeyBalance"];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (isConnected) {
        try {
          const result = await publicClient.readContract({
            address: honeyAddress,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [account as Address],
          });
          return result;
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
    return formatUnits(data ?? 0n, 18);
  };
  const useRawHoneyBalance = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    isLoading,
    useHoneyBalance,
    useRawHoneyBalance,
  };
};
