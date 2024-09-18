"use client";
import React from "react";
import Link from "next/link";
import { governorAddress } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { GoToIfHasVotingPower } from "./go-to-if-has-voting-power";
import { useGovernance } from "./governance-provider";
import { ProposalsList } from "./proposals-list";
import { UserVotingPower } from "./user-voting-power";

export default function GovernanceByStatus() {
  const { dappConfig } = useGovernance();
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
        style={{ color: dappConfig.color }}
      >
        {dappConfig.name}
      </div>
      <div className="text-3xl font-bold leading-9 text-foreground sm:text-5xl sm:leading-[48px]">
        Vote on proposals <br />
        or create your own
      </div>
      <div className="mx-auto my-8 flex   flex-col gap-3 sm:w-full sm:flex-row">
        <GoToIfHasVotingPower
          href={`/governance/${dappConfig.slug}/create`}
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
