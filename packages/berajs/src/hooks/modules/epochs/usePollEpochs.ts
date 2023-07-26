import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { EPOCHS_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

// this is going to be slow for now until we have event indexing
export const usePollEpochs = () => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const identifierKey = "berachain_epoch_identifier";
  const method = "getCurrentEpoch";
  const QUERY_KEY = [identifierKey, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.epochsAddress as Address,
        abi: EPOCHS_PRECOMPILE_ABI,
        functionName: method,
        args: [identifierKey],
      });

      return Number(formatUnits((result as bigint) ?? 0n, 0));
    },
    {
      refreshInterval: POLLING.SLOW * 5, // make it rlly slow
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
