import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GOVERNANCE_ABI, TransactionActionType, useBeraJs } from "@bera/berajs";
import { governorAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";

import { ProposalTypeEnum } from "../types";
import { useCreateProposalForFriendsOfChef } from "./useCreateProposalForFriendsOfChef";

export const useCreateProposal = () => {
  const [proposalType, setProposalType] = useState<ProposalTypeEnum>(
    ProposalTypeEnum.TEXT_PROPOSAL,
  );
  const [title, setTitle] = useState("");
  const titleError = {
    error: title.length === 0,
    message: "Title is required",
  };
  const [description, setDescription] = useState("");

  const router = useRouter();
  const friendsOfChef = useCreateProposalForFriendsOfChef();

  const { write, ModalPortal } = useTxn({
    message: "Submit Proposal",
    actionType: TransactionActionType.SUBMIT_PROPOSAL,
    onSuccess: () => router.push("/governance"),
  });

  const getPayload = () => {
    if (proposalType === ProposalTypeEnum.TEXT_PROPOSAL) {
      return [[governorAddress], [0], ["0x"], `# ${title}\n${description}`];
    }
    return [];
  };

  const submitProposal = () =>
    write({
      address: governorAddress,
      abi: GOVERNANCE_ABI,
      functionName: "propose",
      params: getPayload(),
    });

  const error = titleError.error || friendsOfChef.gaugeAddressError.error;
  const errorMsgs = useMemo(() => {
    const msgs = [];
    if (titleError.error) msgs.push(titleError.message);
    if (
      proposalType === ProposalTypeEnum.FRIENDS_OF_CHEF &&
      friendsOfChef.gaugeAddressError.error
    )
      msgs.push(friendsOfChef.gaugeAddressError.message);
    return msgs;
  }, [titleError]);

  return {
    title,
    setTitle,
    description,
    setDescription,
    ModalPortal,
    proposalType,
    setProposalType,
    submitProposal,
    error,
    errorMsgs,
    friendsOfChef,
  };
};
