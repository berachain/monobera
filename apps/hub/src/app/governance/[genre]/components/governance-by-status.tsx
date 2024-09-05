import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { PROPOSAL_GENRE, ProposalGenreColorMap } from "../../types";
import { ProposalsList } from "./proposals-list";
import { UserVotingPower } from "./user-voting-power";

export default function GovernanceByStatus({
  genre,
}: {
  genre: PROPOSAL_GENRE;
}) {
  return (
    <div>
      <Link
        href={"/governance"}
        className="mb-8 flex gap-2 font-semibold cursor-pointer"
      >
        <Icons.arrowLeft />
        Back to governance menu
      </Link>
      <div
        className="font-bold uppercase tracking-widest"
        style={{ color: ProposalGenreColorMap[genre] }}
      >
        {genre}
      </div>
      <div className="text-forergound text-3xl font-bold leading-9 sm:text-5xl sm:leading-[48px]">
        Vote on proposals <br />
        or create your own
      </div>
      <div className="mx-auto my-8 flex w-[165px] flex-col gap-3 sm:w-full sm:flex-row">
        <Link href="/governance/create">
          <Button>Create proposal</Button>
        </Link>
        <Button variant="secondary">Visit forums</Button>
      </div>

      <div className="flex flex-col-reverse gap-4 lg:flex-row pt-10">
        <ProposalsList />
        <UserVotingPower />
      </div>
    </div>
  );
}
