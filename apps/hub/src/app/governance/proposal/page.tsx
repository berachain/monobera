"use client";

import { FC, Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { isIPFS } from "@bera/config";

import ProposalDetails from "./[proposalId]/proposal-details";

const SearchParamsProposal: FC = () => {
  const sp = useSearchParams();
  if (!sp.get("id")) {
    throw Error("No proposal id found in search params");
  }
  return <ProposalDetails proposalId={sp.get("id")!} />;
};

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
