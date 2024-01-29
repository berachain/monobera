import { type Proposal } from "@bera/berajs";

import {
  updateFriendsOfTheChefTypeUrl,
  updateHoneyCollateralTypeUrl,
  updateLendMarkeyTypeUrl,
} from "./create/useCreateProposal";

export function getProposalType(proposal: Proposal | undefined) {
  if (proposal) {
    if (proposal.messages.length === 0) {
      return "text-proposal";
    }
    if (proposal.messages[0]?.typeURL === updateFriendsOfTheChefTypeUrl) {
      return "new-gauge-proposal";
    }
    if (proposal.messages[0]?.typeURL === updateHoneyCollateralTypeUrl) {
      return "enable-collateral-for-honey";
    }
    if (proposal.messages[0]?.typeURL === updateLendMarkeyTypeUrl) {
      return "new-lend-market";
    }
    return "text-proposal";
  }
  return "text-proposal";
}
