import {
  OrderDirection,
  Proposal_Filter,
  Proposal_OrderBy,
} from "@bera/graphql/governance";
import useSwrInfinite, { SWRInfiniteResponse } from "swr/infinite";

import { getAllProposals } from "~/actions/governance";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions } from "~/types";

const DEFAULT_PER_PAGE = 20;
export const usePollAllProposals = (
  args: {
    topic: string;
    where?: Proposal_Filter;
    perPage?: number;
    orderBy?: Proposal_OrderBy;
    orderDirection?: OrderDirection;
  },
  options?: DefaultHookOptions,
): SWRInfiniteResponse<Awaited<ReturnType<typeof getAllProposals>>> & {
  hasMore: boolean;
} => {
  const { config: beraConfig } = useBeraJs();
  const config = options?.beraConfigOverride ?? beraConfig;
  const res = useSwrInfinite<
    Awaited<ReturnType<typeof getAllProposals>>,
    typeof usePollAllProposalsQueryKey
  >(
    usePollAllProposalsQueryKey(args.topic, args),
    async ([key, page]: [string, number]) => {
      return await getAllProposals({
        where: {
          topics_contains: [args.topic],
          ...args.where,
        },
        orderBy: args.orderBy,
        orderDirection: args.orderDirection,
        config,
        offset: page * (args.perPage ?? DEFAULT_PER_PAGE),
      });
    },
    {
      ...options?.opts,
      initialSize: 2,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.SLOW,
    },
  );

  return {
    ...res,
    hasMore: res.data?.at(-1)?.length === (args.perPage ?? DEFAULT_PER_PAGE),
  };
};

export const usePollAllProposalsQueryKey =
  (
    topic: string,
    {
      orderBy,
      orderDirection,
      where,
    }: {
      orderBy?: Proposal_OrderBy;
      orderDirection?: OrderDirection;
      where?: Proposal_Filter;
    } = {},
  ) =>
  (
    page: number,
    // previousPageData?: Awaited<ReturnType<typeof getAllProposals>>,
  ): [string, number, ...any[]] => {
    return ["usePollAllProposals", page, topic, where, orderBy, orderDirection];
  };
