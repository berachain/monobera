import { useState } from "react";

import { CustomProposal, ProposalTypeEnum } from "../../../types";
import { CreateProposalBody } from "./create-proposal-body";
import { TextProposal } from "./text-proposal";
import { UpdateFriendsOfChef } from "./update-friends-of-chef";

export const CreateProposal = () => {
  const [proposal, setProposal] = useState<CustomProposal>({
    proposalType: ProposalTypeEnum.CUSTOM_PROPOSAL,
    title: "",
    description: "",
    forumLink: "",
    actions: [],
  });

  return (
    <div>
      <CreateProposalBody proposal={proposal} setProposal={setProposal} />

      {proposal.proposalType === ProposalTypeEnum.CUSTOM_PROPOSAL && (
        <TextProposal
          title={proposal.title}
          description={proposal.description}
        />
      )}

      {proposal.proposalType === ProposalTypeEnum.UPDATE_REWARDS_GAUGE && (
        <UpdateFriendsOfChef
          title={proposal.title}
          description={proposal.description}
        />
      )}
    </div>
  );
};
