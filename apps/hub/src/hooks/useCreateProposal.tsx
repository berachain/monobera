"use client";
import { useRouter } from "next/navigation";
import {
  BERA_CHEF_ABI,
  GOVERNANCE_ABI,
  TransactionActionType,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { Address, encodeFunctionData, parseAbiItem } from "viem";
import { useCallback, useState } from "react";
import { CustomProposal, ProposalTypeEnum } from "~/app/governance/types";

const defaultAction = {
  type: ProposalTypeEnum.CUSTOM_PROPOSAL,
  target: undefined,
  ABI: undefined,
  functionName: "",
  calldata: [],
  gauge: undefined,
  receiptToken: undefined,
  isFriend: true,
};
export const useCreateProposal = (governorAddress: Address) => {
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

  const submitProposal = useCallback(() => {
    const actions = proposal.actions.map<Address>((action) => {
      switch (action.type) {
        case ProposalTypeEnum.UPDATE_REWARDS_GAUGE:
          if (
            !action.target ||
            !action.receiptToken ||
            action.isFriend === undefined
          ) {
            throw new Error("Invalid action");
          }
          return encodeFunctionData({
            abi: BERA_CHEF_ABI,
            functionName: "updateFriendsOfTheChef",
            args: [action.receiptToken, action.isFriend],
          });

        case ProposalTypeEnum.CUSTOM_PROPOSAL:
          if (!action.target || !action.ABI) {
            throw new Error("Invalid action");
          }
          // biome-ignore lint/correctness/noSwitchDeclarations: will return before the next case
          const abi = parseAbiItem(action.ABI);

          return encodeFunctionData({
            abi: [abi],
            // functionName: action.functionName,
            args: action.calldata,
          });
      }
    });

    console.log("submitting proposal", proposal, governorAddress);

    write({
      address: governorAddress,
      abi: GOVERNANCE_ABI,
      functionName: "propose",
      params: [
        proposal.actions.map((action) => action.target),
        proposal.actions.map(() => 0n),
        actions,
        // TODO: add forum link
        `# ${proposal.title}\n${proposal.description}`,
      ],
    });
  }, [proposal]);

  return {
    proposal,
    setProposal,
    ModalPortal,
    submitProposal,
    addProposalAction,
    removeProposalAction,
  };
};
