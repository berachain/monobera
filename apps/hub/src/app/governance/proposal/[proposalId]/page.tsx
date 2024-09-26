import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { hubName, isIPFS } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import ProposalDetails, {
  ProposalDetailsWrapper,
} from "./components/proposal-details";
import { defaultBeraConfig } from "@bera/berajs/config";
import { getProposalDetails } from "@bera/berajs/actions";

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
  console.log("fetching proposal id pageparams", params);

  if (isIPFS) {
    return null;
  }

  if (!params.proposalId) {
    console.error("proposal id not found", params);
    return notFound();
  }

  const proposal = await getProposalDetails({
    proposalId: params.proposalId,
    config: defaultBeraConfig,
  });

  console.log("proposal", proposal);

  return (
    <ProposalDetailsWrapper id={params.proposalId} content={proposal}>
      <ProposalDetails proposalId={params.proposalId} />
    </ProposalDetailsWrapper>
  );
}

export const generateStaticParams = isIPFS
  ? async () => {
      console.log("generating static params on proposal id page");

      return [
        {
          proposalId: "0x",
        },
      ];
    }
  : undefined;
