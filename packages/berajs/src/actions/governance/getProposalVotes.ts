import { governanceClient } from "@bera/graphql";
import {
  GetProposalVotes,
  GetProposalVotesQuery,
  GetProposalVotesQueryVariables,
} from "@bera/graphql/governance";

export const getProposalVotes = async (
  variables: GetProposalVotesQueryVariables,
) => {
  return governanceClient.query<GetProposalVotesQuery>({
    query: GetProposalVotes,
    variables,
  });
};
