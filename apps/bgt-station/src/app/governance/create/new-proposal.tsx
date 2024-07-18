"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl, governorAddress } from "@bera/config";
import { Card } from "@bera/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@bera/ui/dropdown-menu";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";
import { ProposalTypeEnum } from "../types";
import { TextProposal } from "./proposal/text-proposal";
import { UpdateFriendsOfChef } from "./proposal/update-friends-of-chef";

export default function NewProposal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [proposalType, setProposalType] = useState<ProposalTypeEnum>(
    ProposalTypeEnum.TEXT_PROPOSAL,
  );

  return (
    <div className="mx-auto w-full max-w-[564px] pb-16">
      <Image
        className="max-[600px]:mx-auto"
        src={`${cloudinaryUrl}/bears/pgnhgjsm1si8gb2bdm1m`}
        alt="proposal-bear"
        width={350}
        height={174}
      />
      <Card className="flex flex-col justify-start gap-8 p-6">
        <div className="relative text-lg font-semibold leading-7 text-foreground">
          New proposal
          <Link href="/governance">
            <Icons.close className="absolute right-0 top-0 h-5 w-5 hover:cursor-pointer" />
          </Link>
        </div>
        <div className="inline-flex flex-col justify-start gap-2">
          <div className="text-sm font-semibold leading-tight">
            Select a Proposal Type
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

        {proposalType === ProposalTypeEnum.TEXT_PROPOSAL && (
          <TextProposal title={title} description={description} />
        )}

        {proposalType === ProposalTypeEnum.FRIENDS_OF_CHEF && (
          <UpdateFriendsOfChef title={title} description={description} />
        )}
      </Card>
    </div>
  );
}
