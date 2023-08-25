import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address } from "wagmi";

import { GOVERNANCE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";
import { defaultPagination } from "~/utils";
import { type Proposal } from "./types";

export const usePollAllProposals = (proposalStatus: number) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getProposals";
  const QUERY_KEY = [proposalStatus, method];
  console.log("QUERY_KEY", QUERY_KEY);
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient
        .readContract({
          address: networkConfig.precompileAddresses
            .governanceAddress as Address,
          abi: GOVERNANCE_PRECOMPILE_ABI,
          functionName: method,
          args: [BigInt(proposalStatus), defaultPagination],
        })
        .catch((e) => {
          console.log(e);
          return undefined;
        });

      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useAllProposals = (): Proposal[] => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useAllProposals,
  };
};
