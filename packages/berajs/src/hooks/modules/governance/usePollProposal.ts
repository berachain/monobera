import useSWR from "swr";
import { getProposalDetails } from "~/actions/governance/getProposalDetails";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType, Proposal } from "~/types";

export const usePollProposal = (
  proposalId: string,
  options?: DefaultHookOptions,
): DefaultHookReturnType<Proposal[] | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = ["usePollProposal", proposalId];
  const swrResponse = useSWR<Proposal[] | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getProposalDetails({ proposalId, config }),
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );

  return { ...swrResponse, refresh: () => swrResponse?.mutate?.() };
};
