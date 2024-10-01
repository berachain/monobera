import { governanceOrganizationId } from "@bera/config";
import { getProposals } from "@bera/graphql";

import { BeraConfig, Proposal } from "~/types";

export const getAllProposals = async ({
  config,
  afterCursor,
  beforeCursor,
  perPage = 20,
}: {
  afterCursor?: string;
  beforeCursor?: string;
  perPage?: number;
  config: BeraConfig;
}): Promise<
  | {
      nodes: Proposal[];
      pageInfo: { firstCursor: string; lastCursor: string; count: number };
    }
  | undefined
> => {
  try {
    if (perPage > 20) {
      throw new Error("perPage must be less than 20");
    }
    if (!config.subgraphs?.governanceSubgraph) {
      throw new Error("governance subgraph uri is not found in config");
    }
    const subgraphEndpoint = config.subgraphs.governanceSubgraph;
    const variables = {
      input: {
        filters: {
          organizationId: governanceOrganizationId,
        },
        sort: {
          sortBy: "id",
          isDescending: true,
        },
        page: {
          limit: perPage,
          afterCursor,
          beforeCursor,
        },
      },
    };
    const response = await fetch(subgraphEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Api-Key": process.env.NEXT_PUBLIC_TALLY_API_KEY as string,
      },
      body: JSON.stringify({
        query: getProposals.loc?.source.body,
        variables: variables,
      }),
    });
    const data = await response.json();
    return data.data.proposals;
  } catch (e) {
    console.error("getAllProposals:", e);
    return undefined;
  }
};
