import { governanceClient } from "@bera/graphql";
import { GetProposalDocument } from "@bera/graphql/governance";

import { BeraConfig, Proposal } from "~/types";

export const getProposalDetails = async ({
  proposalId,
  config,
}: {
  proposalId: string;
  config: BeraConfig;
}) => {
  if (!config.subgraphs?.governanceSubgraph) {
    throw new Error("governance subgraph uri is not found in config");
  }

  const variables = {
    id: proposalId,
  };

  const res = await governanceClient.query({
    query: GetProposalDocument,
    variables: variables,
  });

  return res.data.proposal;
};
