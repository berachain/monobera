import { epochsAddress } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { EPOCHS_PRECOMPILE_ABI } from "~/abi";
import POLLING from "~/enum/polling";

export interface IEpoch {
  current: number;
  startTime: number;
  endTime: number;
}
// this is going to be slow for now until we have event indexing
export const usePollEpochs = () => {
  const publicClient = usePublicClient();
  const identifierKey = "berachain_epoch_identifier";
  const method = "getCurrentEpoch";
  const QUERY_KEY = [identifierKey, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      const result = (await publicClient.readContract({
        address: epochsAddress,
        abi: EPOCHS_PRECOMPILE_ABI,
        functionName: method,
        args: [identifierKey],
      })) as any[];

      return {
        current: Number(result[0]),
        startTime: Number(result[1]),
        endTime: Number(result[2]),
      };
    },
    {
      refreshInterval: POLLING.SLOW, // 3 minutes
    },
  );

  const useCurrentEpoch = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useCurrentEpoch,
    isLoading,
  };
};
