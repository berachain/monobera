import useSWR from "swr";
import { getAllProposals } from "~/actions/governance";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType, Proposal } from "~/types";

export const usePollAllProposalsQueryKey = "usePollAllProposals";
export const usePollAllProposals = (
  args?: {
    sortBy: string;
  },
  options?: DefaultHookOptions,
): DefaultHookReturnType<Proposal[] | undefined> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const QUERY_KEY = usePollAllProposalsQueryKey;
  const swrResponse = useSWR<Proposal[] | undefined, any, typeof QUERY_KEY>(
    QUERY_KEY,
    async () => await getAllProposals({ config }),
    {
      ...options?.opts,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );

  return { ...swrResponse, refresh: () => swrResponse?.mutate?.() };
};
