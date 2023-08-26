import { notFound } from "next/navigation";

import ProposalDetails from "./proposal-details";

export default function Page({ params }: { params: { proposalId: number } }) {
  if (!params.proposalId) {
    return notFound();
  }

  return <ProposalDetails proposalId={params.proposalId} />;
}
