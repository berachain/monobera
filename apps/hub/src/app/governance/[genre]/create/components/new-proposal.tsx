"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "@bera/ui/icons";

import {
  PROPOSAL_GENRE,
  getDappByGenre,
} from "../../../governance-genre-helper";
import { CreateProposal } from "./create-proposal";

export default function NewProposal() {
  const pathname = usePathname().split("/")[2];
  const dapp = getDappByGenre(pathname as PROPOSAL_GENRE);

  return (
    <div className="pb-16 col-span-8 col-start-3">
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

      <CreateProposal />
    </div>
  );
}
