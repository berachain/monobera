"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";

import { ProposalTypeEnum } from "../../types";
import { TextProposal } from "./proposal/text-proposal";
import { UpdateFriendsOfChef } from "./proposal/update-friends-of-chef";

export default function NewProposal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposalType, setProposalType] = useState<ProposalTypeEnum>(
    ProposalTypeEnum.CUSTOM_PROPOSAL,
  );

  return (
    <div className="flex flex-col gap-8 pb-16">
      <Link
        href="/governance"
        className="flex items-center gap-1 text-sm font-medium text-muted-foreground"
      >
        <Icons.arrowLeft className="h-4 w-4" /> All Proposals
      </Link>

      <div>
        <div className="font-bold tracking-widest text-muted-foreground leading-6">
          GOVERNANCE
        </div>
        <div className="relative text-3xl font-semibold leading-9 text-foreground">
          Create New Proposal
        </div>
      </div>

      <div className="flex flex-col justify-start gap-8">
        <div className="inline-flex flex-col justify-start gap-2">
          <div className="text-sm font-semibold leading-tight">
            Proposal Type
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="inline-flex h-[42px] w-full flex-col items-start justify-start hover:cursor-pointer">
                <div className=" inline-flex w-full items-center justify-start gap-2.5 rounded-md border border-border px-3 py-2">
                  <div className="relative shrink grow basis-0 caption-top text-sm font-normal capitalize leading-normal text-muted-foreground">
                    {proposalType.replaceAll("-", " ")}
                    <Icons.chevronDown className="absolute right-0 top-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[400px]">
              {Object.values(ProposalTypeEnum).map(
                (typeT: ProposalTypeEnum) => (
                  <DropdownMenuCheckboxItem
                    key={`proposal-option-${typeT}`}
                    onClick={() => setProposalType(typeT)}
                    checked={proposalType === typeT}
                    className="w-full capitalize hover:text-foreground"
                  >
                    {typeT.replaceAll("-", " ")}
                  </DropdownMenuCheckboxItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold leading-tight">Title</div>
          <Input
            type="text"
            id="proposal-title"
            placeholder="Ooga booga"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title.length === 0 && (
            <div className="text-sm text-destructive-foreground">
              * Title is required
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-sm font-semibold leading-tight">Description</div>
          <TextArea
            id="proposal-message"
            placeholder="Tell us about your proposal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {proposalType === ProposalTypeEnum.CUSTOM_PROPOSAL && (
          <TextProposal title={title} description={description} />
        )}

        {proposalType === ProposalTypeEnum.UPDATE_REWARDS_GAUGE && (
          <UpdateFriendsOfChef title={title} description={description} />
        )}
      </div>
    </div>
  );
}
