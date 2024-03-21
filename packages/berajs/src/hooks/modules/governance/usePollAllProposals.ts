import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient } from "wagmi";

import { GOVERNANCE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { defaultPagination } from "~/utils";
import { type Proposal } from "./types";
import { governanceAddress } from "@bera/config";

export interface ProposalListResponse {
  proposals: Proposal[];
  nextKey: string;
  total: bigint;
}

export const usePollAllProposals = (proposalStatus: number) => {
  const publicClient = usePublicClient();
  const method = "getProposals";
  const QUERY_KEY = [proposalStatus, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      const result = (await publicClient
        .readContract({
          address: governanceAddress,
          abi: GOVERNANCE_PRECOMPILE_ABI,
          functionName: method,
          args: [BigInt(proposalStatus), defaultPagination],
        })
        .catch((e) => {
          console.log(e);
          return undefined;
        })) as any[];

      return {
        proposals: result ? result[0] : undefined,
        nextKey: result ? result[1].nextKey : undefined,
        total: result ? result[1].total : undefined,
      };
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useAllProposals = (): Proposal[] => {
    const { data } = useSWRImmutable<ProposalListResponse>(QUERY_KEY);
    return data?.proposals ?? [];
  };
  return {
    useAllProposals,
    isLoading,
  };
};
