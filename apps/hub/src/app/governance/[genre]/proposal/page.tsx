import { Suspense } from "react";
import { SearchParamsProposal } from "./[proposalId]/components/proposal-details";
import { NativeDapps, Others } from "../../governance-genre-helper";

export default function StaticProposalPage() {
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
