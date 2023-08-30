import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { GOVERNANCE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";
import { defaultPagination } from "~/utils";

export const usePollProposalVotes = (proposalId: number) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getProposalVotes";
  const QUERY_KEY = [proposalId, method];

  console.log(QUERY_KEY);
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.governanceAddress as Address,
        abi: GOVERNANCE_PRECOMPILE_ABI,
        functionName: method,
        args: [proposalId, defaultPagination],
      });

      return result;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useProposalVotes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useProposalVotes,
  };
};
