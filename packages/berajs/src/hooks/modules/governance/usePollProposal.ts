import { ProposalWithVotesFragment } from "@bera/graphql/governance";
import useSWR from "swr";

import { getProposalDetails } from "~/actions/governance/getProposalDetails";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType, Vote } from "~/types";

export interface UsePollProposalResponse
  extends DefaultHookReturnType<ProposalWithVotesFragment> {}

export const usePollProposal = (
  proposalId: string,
  options?: DefaultHookOptions,
): UsePollProposalResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollProposal", proposalId];

  const swrResponse = useSWR<ProposalWithVotesFragment>(
    QUERY_KEY,
    async () => await getProposalDetails({ proposalId, config }),
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );

  const proposal = swrResponse.data;

  // const votes = swrResponse.data?.votes.nodes ?? [];
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
