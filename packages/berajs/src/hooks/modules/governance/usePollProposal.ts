import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import {
  GOVERNANCE_PRECOMPILE_ABI,
  GOVERNANCE_PRECOMPILE_ADDRESS,
} from "~/config";
import POLLING from "~/config/constants/polling";

export const usePollProposal = (proposalId: string) => {
  const publicClient = usePublicClient();

  const method = "getProposal";
  const QUERY_KEY = [proposalId, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: GOVERNANCE_PRECOMPILE_ADDRESS,
        abi: GOVERNANCE_PRECOMPILE_ABI,
        functionName: method,
        args: [proposalId],
      });

      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useProposal = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useProposal,
  };
};
