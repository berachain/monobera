import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { bgtName, isIPFS } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";

import ProposalDetails from "./proposal-details";

export function generateMetadata({ params }: any): Metadata {
  const { proposalId } = params;
  return {
    title: getMetaTitle("Proposal Details", bgtName),
    description: `View proposal details for proposal ${proposalId} on Berachain`,
  };
}

export default function Page({ params }: { params: { proposalId: string } }) {
  if (isIPFS) {
    return null;
  }

  if (!params.proposalId) {
    return notFound();
  }

  return <ProposalDetails proposalId={params.proposalId} />;
}

export function generateStaticParams() {
  return [
    {
      proposalId: "0x",
    },
  ];
}
