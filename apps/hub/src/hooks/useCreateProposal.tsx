"use client";
import { useRouter } from "next/navigation";
import { GOVERNANCE_ABI, TransactionActionType } from "@bera/berajs";
import { governorAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import { Address } from "viem";
import { useCallback, useState } from "react";
import { CustomProposal } from "~/app/governance/types";

export const useCreateProposal = () => {
  const [proposal, setProposal] = useState<CustomProposal>({
    title: "",
    description: "",
    forumLink: "",
    actions: [],
  });

  const router = useRouter();

  const { write, ModalPortal } = useTxn({
    message: "Submit Proposal",
    actionType: TransactionActionType.SUBMIT_PROPOSAL,
    onSuccess: () => router.push("/governance"),
  });

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
  };
};
