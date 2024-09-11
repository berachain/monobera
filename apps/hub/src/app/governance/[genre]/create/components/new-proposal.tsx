"use client";

import Link from "next/link";
import { Icons } from "@bera/ui/icons";

import {
  PROPOSAL_GENRE,
  getDappByGenre,
} from "../../../governance-genre-helper";
import { CreateProposal } from "./create-proposal";
import { governorAddress } from "@bera/config";

export default function NewProposal({
  genre,
}: {
  genre: PROPOSAL_GENRE;
}) {
  const dapp = getDappByGenre(genre);

  return (
    <div className="pb-16 col-span-12 xl:col-span-8 xl:col-start-3">
      <Link
        href="/governance"
        className="flex mb-8 items-center gap-1 text-sm font-medium text-muted-foreground"
      >
        <Icons.arrowLeft className="h-4 w-4" /> All Proposals
      </Link>

      <div className="mb-9">
        <div className="font-bold leading-6 tracking-widest text-muted-foreground">
          GOVERNANCE
        </div>
        <div className="relative text-3xl font-semibold leading-9 text-foreground">
          Create New Proposal
        </div>
      </div>

      <CreateProposal governorAddress={governorAddress} />
    </div>
  );
}
