import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { GOVERNANCE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollProposal = (proposalId: string) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getProposal";
  const QUERY_KEY = [proposalId, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.governanceAddress as Address,
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
