import React from "react";
import { getAllProposals } from "@bera/berajs/actions";
import { defaultBeraConfig } from "@bera/berajs/config";
import { isIPFS } from "@bera/config";

import { NativeDapps, Others } from "../governance-genre-helper";
import GovernanceByStatus from "./components/governance-by-status";

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
