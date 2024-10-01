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
  const swrResponse = useSwrInfinite<
    Awaited<ReturnType<typeof getAllProposals>>,
    typeof usePollAllProposalsQueryKey
  >(
    usePollAllProposalsQueryKey,
    async ([key, afterCursor]) => {
      return await getAllProposals({ config, afterCursor });
    },
    {
      ...options?.opts,
      initialSize: 5,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );

  return {
    ...swrResponse,
  };
};

export const usePollAllProposalsQueryKey = (
  page: number,
  previousPageData?: Awaited<ReturnType<typeof getAllProposals>>,
): [string, string | undefined] | null => {
  if (!page) {
    return ["usePollAllProposals", undefined];
  }

  const afterCursor = previousPageData?.pageInfo?.lastCursor;
  return afterCursor ? ["usePollAllProposals", afterCursor] : null;
};
