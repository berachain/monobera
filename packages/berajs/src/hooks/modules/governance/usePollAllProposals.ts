import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import {
  GOVERNANCE_PRECOMPILE_ABI,
  GOVERNANCE_PRECOMPILE_ADDRESS,
} from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollAllProposals = (proposalStatus: string) => {
  const publicClient = usePublicClient();

  const method = "getProposals";
  const QUERY_KEY = [proposalStatus, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: GOVERNANCE_PRECOMPILE_ADDRESS,
        abi: GOVERNANCE_PRECOMPILE_ABI,
        functionName: method,
        args: [proposalStatus],
      });

      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useAllProposals = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useAllProposals,
  };
};
