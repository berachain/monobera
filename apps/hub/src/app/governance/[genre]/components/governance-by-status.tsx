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
import { SWRFallback, usePollAllProposalsQueryKey } from "@bera/berajs";
import { unstable_serialize } from "swr/infinite";
import { OrderDirection, Proposal_OrderBy } from "@bera/graphql/governance";
import Image from "next/image";

export default function GovernanceByStatus({
  allProposals,
}: {
  allProposals?: any;
}) {
  const { currentTopic: govTopic } = useGovernance();
  return (
    <SWRFallback
      fallback={{
        [unstable_serialize(
          usePollAllProposalsQueryKey(govTopic.slug, {
            orderBy: Proposal_OrderBy.CreatedAt,
            status_in: [],
            orderDirection: OrderDirection.Desc,
            text: "",
          }),
        )]: allProposals,
      }}
    >
      <div className="pb-32">
        <Link
          href={"/governance"}
          className="mb-8 flex cursor-pointer gap-2 font-semibold"
        >
          <Icons.arrowLeft />
          Back to Governance Menu
        </Link>
        <div className="sm:flex sm:justify-between sm:w-full relative">
          <div className="relative z-10">
            <div
              className="font-bold uppercase tracking-widest"
              style={{ color: govTopic.color }}
            >
              {govTopic.name}
            </div>
            <div className="text-4xl font-bold leading-9 text-foreground sm:text-5xl sm:leading-[48px]">
              Vote on <br className="sm:hidden" /> proposals{" "}
              <br className="max-sm:hidden" />
              or create your own
            </div>
            <div className="mx-auto my-8 flex gap-3 sm:w-full flex-wrap ">
              <GoToIfHasVotingPower
                href={`/governance/${govTopic.slug}/create`}
                governorAddress={governorAddress}
              />
              <Button
                as={Link}
                href={govTopic.forumLink}
                variant="secondary"
                className="w-fit"
                // @ts-ignore
                target="_blank"
              >
                Visit forum
              </Button>
            </div>
          </div>
          <div className="max-sm:absolute max-sm:-top-4 max-sm:right-0 max-sm:w-1/3 max-w-[30%] sm:w-1/4 basis-1/4 z-0 object-contain object-right">
            <Image
              src="https://res.cloudinary.com/duv0g402y/image/upload/v1729532664/governance/y59qkz9bqnwkuqulpkme.png"
              width={586 / 2}
              height={388 / 2}
              layout=""
              alt="poll image"
              className=" "
            />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-4 pt-10 lg:flex-row">
          <ProposalsList />
          <UserVotingPower />
        </div>
      </div>
    </SWRFallback>
  );
}
