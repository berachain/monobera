import { QueryResult } from "@apollo/client";
import useSWR from "swr";

import { getProposalDetails } from "~/actions/governance/getProposalDetails";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import {
  DefaultHookOptions,
  DefaultHookReturnType,
  Proposal,
  Vote,
} from "~/types";

export interface UsePollProposalResponse extends DefaultHookReturnType<any> {
  proposal: Awaited<ReturnType<typeof getProposalDetails>>;
}

export const usePollProposal = (
  proposalId: string,
  options?: DefaultHookOptions,
): UsePollProposalResponse => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollProposal", proposalId];

  const swrResponse = useSWR<any, any, typeof QUERY_KEY>(
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
    proposal,

    refresh: () => swrResponse?.mutate?.(),
  };
};
