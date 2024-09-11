import useSWR from "swr";
import { Address, formatEther } from "viem";
import { usePublicClient } from "wagmi";
import { GOVERNANCE_ABI } from "~/abi";
import { DefaultHookReturnType } from "~/types";

export const usePollProposalThreshold = (
  governorAddress: Address,
): DefaultHookReturnType<{ votesThreshold: string }> => {
  const publicClient = usePublicClient();
  const QUERY_KEY = ["usePollProposalThreshold"];
  const swrResponse = useSWR<{ votesThreshold: string }, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => {
      if (!publicClient) {
        throw new Error("usePollProposalThreshold needs publicClient");
      }
      const votesThreshold = await publicClient.readContract({
        address: governorAddress,
        abi: GOVERNANCE_ABI,
        functionName: "proposalThreshold",
      });
      return { votesThreshold: formatEther(votesThreshold) };
    },
  );

  return {
    ...swrResponse,
    refresh: swrResponse.mutate,
  };
};
