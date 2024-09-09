"use client";
import { useRouter } from "next/navigation";
import { GOVERNANCE_ABI, TransactionActionType } from "@bera/berajs";
import { governorAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import { Address } from "viem";
import { useCallback, useState } from "react";
import {
  CustomProposal,
  ProposalAction,
  ProposalTypeEnum,
} from "~/app/governance/types";

const defaultAction: ProposalAction = {
  type: ProposalTypeEnum.CUSTOM_PROPOSAL,
  target: undefined,
  ABI: undefined,
  functionName: "",
  calldata: [],
};
export const useCreateProposal = () => {
  const [proposal, setProposal] = useState<CustomProposal>({
    title: "",
    description: "",
    forumLink: "",
    actions: [defaultAction],
  });

  const router = useRouter();

  const { write, ModalPortal } = useTxn({
    message: "Submit Proposal",
    actionType: TransactionActionType.SUBMIT_PROPOSAL,
    onSuccess: () => router.push("/governance"),
  });

  const addProposalAction = useCallback(() => {
    setProposal((p) => ({ ...p, actions: [...p.actions, defaultAction] }));
  }, []);

  const removeProposalAction = useCallback(
    (idx: number) => {
      setProposal((p) => {
        const actions = [...p.actions];
        actions.splice(idx, 1);
        return { ...p, actions };
      });
    },
    [setProposal],
  );

  const submitProposal = useCallback(
    () =>
      write({
        address: governorAddress,
        abi: GOVERNANCE_ABI,
        functionName: "propose",
        params: [
          [governorAddress],
          [0],
          ["0x"],
          `# ${proposal.title}\n${proposal.description}`,
        ],
      }),
    [proposal],
  );

  return {
    proposal,
    setProposal,
    ModalPortal,
    submitProposal,
    addProposalAction,
    removeProposalAction,
  };
};
