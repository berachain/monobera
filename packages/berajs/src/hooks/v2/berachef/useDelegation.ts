import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import POLLING from "~/config/constants/polling";
import { BERACHEF_ABI } from "~/config/v2/abi";
import { useBeraConfig } from "~/contexts";

export const usePollDelegation = (validatorAddress: `0x${string}`) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getOperator";
  // validatorCoinbaseAddr
  const QUERY_KEY = [validatorAddress, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      try {
        const bgtRewardForDuration = await publicClient.readContract({
          address: "0x0", // TODO: BERACHEF contract address
          abi: BERACHEF_ABI,
          functionName: method,
          args: [],
        });

        if (!bgtRewardForDuration) {
          return undefined;
        }
        return {
          bgtRewardForDuration,
        };
      } catch (e) {
        console.log(e);
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useBGTRewardForDuration = () => {
    const { data = undefined } = useSWRImmutable<number | undefined>(QUERY_KEY);
    return data;
  };

  return {
    isLoading,
    useBGTRewardForDuration,
    refresh: () => void mutate(QUERY_KEY),
  };
};
