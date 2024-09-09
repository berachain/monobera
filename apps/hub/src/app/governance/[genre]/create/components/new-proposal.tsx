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
    <div className="flex flex-col gap-8 pb-16">
      <Link
        href="/governance"
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
      >
        <Icons.arrowLeft className="h-4 w-4" /> All Proposals
      </Link>

      <div>
        <div className="font-bold leading-6 tracking-widest text-muted-foreground">
          <span style={{ color: dapp?.color }}>{dapp?.name}</span> GOVERNANCE
        </div>
        <div className="relative text-3xl font-semibold leading-9 text-foreground">
          Create New Proposal
        </div>
      </div>

      <CreateProposal />
    </div>
  );
}
