"use client";
import { useState } from "react";

import { CreateProposalBody } from "./create-proposal-body";
import { TextProposal } from "./text-proposal";
import { Button } from "@bera/ui/button";
import { CustomProposalErrors } from "~/app/governance/types";
import { useCreateProposal } from "~/hooks/useCreateProposal";

export const CreateProposal = () => {
  const { proposal, setProposal } = useCreateProposal();
  const [activeTab, setActiveTab] = useState(0);
  const [errors, setErrors] = useState<CustomProposalErrors>({
    title: false,
    description: false,
    forumLink: false,
  });

  return (
    <div className="grid grid-cols-4">
      <div>
        <Button onClick={() => setActiveTab(0)}>Proposal Content</Button>
        <Button onClick={() => setActiveTab(1)}>Code Action</Button>
      </div>
      <div className="col-span-3">
        {activeTab === 0 && (
          <CreateProposalBody
            errors={errors}
            setErrors={setErrors}
            onNext={() => setActiveTab(1)}
            proposal={proposal}
            setProposal={setProposal}
          />
        )}

        <TextProposal
          title={proposal.title}
          description={proposal.description}
        />

        {/* {proposal.proposalType === ProposalTypeEnum.UPDATE_REWARDS_GAUGE && (
          <UpdateFriendsOfChef
            title={proposal.title}
            description={proposal.description}
          />
        )} */}
      </div>
    </div>
  );
};
