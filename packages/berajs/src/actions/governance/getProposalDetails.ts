import { getProposal } from "@bera/graphql";

import { BeraConfig, Proposal } from "~/types";

export const getProposalDetails = async ({
  proposalId,
  config,
}: {
  proposalId: string;
  config: BeraConfig;
}): Promise<any> => {
  try {
    if (!config.subgraphs?.governanceSubgraph) {
      throw new Error("governance subgraph uri is not found in config");
    }

    const subgraphEndpoint = config.subgraphs.governanceSubgraph;
    const variables = {
      input: {
        id: proposalId,
      },
      votesInput: {
        filters: {
          proposalId: proposalId,
        },
        sort: {
          sortBy: "amount",
          isDescending: true,
        },
        page: {
          limit: 500,
        },
      },
    };
    const response = await fetch(subgraphEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Api-Key":
          "751c3bf1ebd98e89c5bc0fd3354add5adf7b7db18d2269c7968f6325453f01c1",
      },
      body: JSON.stringify({
        query: getProposal.loc?.source.body,
        variables: variables,
      }),
    });
    const data = await response.json();
    return data.data;
  } catch (e) {
    console.log("getProposalDetails:", e);
    return [];
  }
};
