import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isIPFS } from "@bera/config";
import { SearchParamsProposal } from "./[proposalId]/components/proposal-details";
import { NativeDapps, Others } from "../../governance-genre-helper";

export default function StaticProposalPage() {
  if (!isIPFS) {
    return notFound();
  }

  return (
    <Suspense>
      <SearchParamsProposal />
    </Suspense>
  );
}

export const generateStaticParams = async () => {
  return [...NativeDapps, ...Others].map((dapp) => ({
    genre: dapp.slug,
  }));
};
