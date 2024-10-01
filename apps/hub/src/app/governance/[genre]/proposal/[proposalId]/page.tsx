import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { hubName, isIPFS } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import ProposalDetails, {
  ProposalDetailsWrapper,
} from "./components/proposal-details";
import { defaultBeraConfig } from "@bera/berajs/config";
import { getProposalDetails } from "@bera/berajs/actions";
import { NativeDapps, Others } from "~/app/governance/governance-genre-helper";

export const revalidate = 120;

export function generateMetadata({ params }: any): Metadata {
  const { proposalId } = params;
  return {
    title: getMetaTitle("Proposal Details", hubName),
    description: `View proposal details for proposal ${proposalId} on Berachain`,
  };
}

export default async function Page({
  params,
}: { params: { proposalId: string } }) {
  if (isIPFS) {
    return null;
  }

  if (!params.proposalId) {
    return notFound();
  }

  const proposal = await getProposalDetails({
    proposalId: params.proposalId,
    config: defaultBeraConfig,
  });

  if (!proposal) {
    return notFound();
  }

  return (
    <ProposalDetailsWrapper id={params.proposalId} content={proposal}>
      <ProposalDetails proposalId={params.proposalId} />
    </ProposalDetailsWrapper>
  );
}

export const generateStaticParams = async () => {
  if (isIPFS) {
    return [...NativeDapps, ...Others].map((dapp) => ({
      genre: dapp.slug,
      proposalId: "0x",
    }));
  }

  return [];
};
