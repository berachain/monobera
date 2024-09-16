import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { Address } from "viem";
import { Dapp } from "../../governance-genre-helper";
import { ProposalsList } from "./proposals-list";
import { UserVotingPower } from "./user-voting-power";
import { GoToIfHasVotingPower } from "./go-to-if-has-voting-power";

export default function GovernanceByStatus({
  dapp,
  governorAddress,
}: {
  dapp: Dapp;
  governorAddress: Address;
}) {
  return (
    <div className="pb-32">
      <Link
        href={"/governance"}
        className="mb-8 flex cursor-pointer gap-2 font-semibold"
      >
        <Icons.arrowLeft />
        Back to Governance Menu
      </Link>
      <div
        className="font-bold uppercase tracking-widest"
        style={{ color: dapp.color }}
      >
        {dapp.name}
      </div>
      <div className="text-foreground text-3xl font-bold leading-9 sm:text-5xl sm:leading-[48px]">
        Vote on proposals <br />
        or create your own
      </div>
      <div className="mx-auto my-8 flex   flex-col gap-3 sm:w-full sm:flex-row">
        <GoToIfHasVotingPower
          href={`/governance/${dapp.link}/create`}
          governorAddress={governorAddress}
        />
        <Button variant="secondary" className="w-fit">
          Visit forums
        </Button>
      </div>

      <div className="flex flex-col-reverse gap-4 pt-10 lg:flex-row">
        <ProposalsList />
        <UserVotingPower />
      </div>
    </div>
  );
}
