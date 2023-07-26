import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { GOVERNANCE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";

export const usePollAllProposals = (proposalStatus: string) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getProposals";
  const QUERY_KEY = [proposalStatus, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses
          .erc20GovernanceAddress as Address,
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
