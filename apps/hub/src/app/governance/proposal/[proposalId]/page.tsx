import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetaTitle } from "@bera/shared-ui";
import ProposalDetails, { ProposalDetailsWrapper } from "./proposal-details";
import { bgtName } from "@bera/config";
import { defaultBeraConfig } from "@bera/berajs/config";
import { getProposalDetails } from "@bera/berajs/actions";

export const revalidate = 120;

export function generateMetadata({ params }: any): Metadata {
  const { proposalId } = params;
  return {
    title: getMetaTitle("Proposal Details", bgtName),
    description: `View proposal details for proposal ${proposalId} on Berachain`,
  };
}

export default async function Page({
  params,
}: { params: { proposalId: string } }) {
  if (!params.proposalId) {
    return notFound();
  }

  const proposal = await getProposalDetails({
    proposalId: params.proposalId,
    config: defaultBeraConfig,
  });

  return (
    <ProposalDetailsWrapper id={params.proposalId} content={proposal}>
      <ProposalDetails proposalId={params.proposalId} />
    </ProposalDetailsWrapper>
  );
}
