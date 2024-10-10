import { Proposal_Filter } from "@bera/graphql/governance";
import useSwrInfinite, { SWRInfiniteResponse } from "swr/infinite";

import { getAllProposals } from "~/actions/governance";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions } from "~/types";

export const usePollAllProposals = (
  args: {
    topic: string;
    where?: Proposal_Filter;
    perPage?: number;
  },
  options?: DefaultHookOptions,
): SWRInfiniteResponse<Awaited<ReturnType<typeof getAllProposals>>> => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  return useSwrInfinite<
    Awaited<ReturnType<typeof getAllProposals>>,
    typeof usePollAllProposalsQueryKey
  >(
    usePollAllProposalsQueryKey(args.topic, args.where),
    async ([key, page]: [string, number]) => {
      return await getAllProposals({
        where: {
          topics_contains: [args.topic],
          ...args.where,
        },
        config,
        offset: page * 20,
      });
    },
    {
      ...options?.opts,
      initialSize: 1,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );
};

export const usePollAllProposalsQueryKey =
  (topic: string, where?: Proposal_Filter) =>
  (
    page: number,
    // previousPageData?: Awaited<ReturnType<typeof getAllProposals>>,
  ): [string, number, ...any[]] => {
    return ["usePollAllProposals", page, topic, where];
  };
