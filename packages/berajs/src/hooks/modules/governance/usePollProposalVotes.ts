import { GetProposalVotesQueryVariables } from "@bera/graphql/governance";
import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";

import { getProposalVotes } from "~/actions/governance/getProposalVotes";

type UsePollProposalVotesArgs = Omit<
  GetProposalVotesQueryVariables,
  "offset" | "limit"
>;

// const ACTUAL_PER_PAGE = 500;

const DEFAULT_LIMIT = 1000;
export const usePollProposalVotes = (
  args: UsePollProposalVotesArgs,
  total: number,
) => {
  return useSWRInfinite(
    usePollProposalVotesQueryKey(args, total),
    async ([key, page]: [string, number]) => {
      return getProposalVotes({
        ...args,
        limit: DEFAULT_LIMIT,
        offset: DEFAULT_LIMIT * page,
      });
    },
    {
      parallel: true,
      // Fetches all the data at once, we limit the number of pages by providing a total
      initialSize: Infinity,
    },
  );
};

export const usePollProposalVotesQueryKey =
  (
    { ...args }: UsePollProposalVotesArgs,
    total: number,
  ): SWRInfiniteKeyLoader =>
  (
    pageIndex: number,
    // previousPageData: Awaited<ReturnType<typeof getProposalVotes>>,
  ) => {
    if (pageIndex > Math.floor(total / DEFAULT_LIMIT)) {
      return null;
    }

    return [
      "usePollProposalVotes",
      pageIndex,
      DEFAULT_LIMIT,
      args.proposalId,
      args.orderBy,
      args.orderDirection,
    ];
  };
