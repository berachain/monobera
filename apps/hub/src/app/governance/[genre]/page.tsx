import React from "react";

import { NativeDapps, Others } from "../governance-genre-helper";
import GovernanceByStatus from "./components/governance-by-status";
import { defaultBeraConfig } from "@bera/berajs/config";

import { getAllProposals } from "@bera/berajs/actions";
import { isIPFS } from "@bera/config";

export const revalidate = 120;

export default async function Page() {
  const allProposals = isIPFS
    ? undefined
    : await getAllProposals({ config: defaultBeraConfig });

  return <GovernanceByStatus allProposals={allProposals} />;
}

export async function generateStaticParams() {
  return [...NativeDapps, ...Others].map((dapp) => ({
    genre: dapp.slug,
  }));
}
