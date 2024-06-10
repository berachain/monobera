import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetaTitle } from "@bera/shared-ui";
import ProposalDetails from "./proposal-details";
import { bgtName } from "@bera/config";

export function generateMetadata({ params }: any): Metadata {
  const { proposalId } = params;
  return {
    title: getMetaTitle("Proposal Details", bgtName),
    description: `View proposal details for proposal ${proposalId} on Berachain`,
  };
}

export default function Page({ params }: { params: { proposalId: number } }) {
  if (!params.proposalId) {
    return notFound();
  }

  return <ProposalDetails proposalId={params.proposalId} />;
}
