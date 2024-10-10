import useSwrInfinite, {
  SWRInfiniteKeyLoader,
  SWRInfiniteResponse,
} from "swr/infinite";

import { getAllProposals } from "~/actions/governance";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions } from "~/types";

export const usePollAllProposals = (
  options?: DefaultHookOptions,
): SWRInfiniteResponse<Awaited<ReturnType<typeof getAllProposals>>> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  return useSwrInfinite<
    Awaited<ReturnType<typeof getAllProposals>>,
    typeof usePollAllProposalsQueryKey
  >(
    usePollAllProposalsQueryKey,
    async ([key, page]) => {
      return await getAllProposals({ config, offset: page * 20 });
    },
    {
      ...options?.opts,
      initialSize: 1,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );
};

export const usePollAllProposalsQueryKey = (
  page: number,
  previousPageData?: Awaited<ReturnType<typeof getAllProposals>>,
): [string, number] | null => {
  if (!page) {
    return ["usePollAllProposals", 0];
  }

  return previousPageData?.length ? ["usePollAllProposals", page] : null;
};
