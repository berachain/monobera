import ProposalDetails from "./proposal-details";

export default function Proposal({
  params,
}: {
  params: { proposalId: `0x${string}` };
}) {
  return <ProposalDetails proposalId={params.proposalId} />;
}
