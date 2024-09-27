"use client";

import { ApolloProvider } from "@apollo/client";
import { governanceSubgraphUrl } from "@bera/config";
import { getClient } from "@bera/graphql";

import { PROPOSAL_GENRE } from "../governance-genre-helper";
import { GovernanceProvider } from "./components/governance-provider";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { genre: PROPOSAL_GENRE };
}) {
  const client = getClient(governanceSubgraphUrl);
  return (
    <ApolloProvider client={client}>
      <GovernanceProvider genre={params.genre}>{children}</GovernanceProvider>
    </ApolloProvider>
  );
}
